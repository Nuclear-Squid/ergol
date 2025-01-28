/**
 * Keyboard Layout Data
 * {
 *   keymap: {
 *     'KeyQ': [ 'q', 'Q' ],    // normal, shift, [altGr], [shift+altGr]
 *     'KeyP': [ 'p', 'P' ],
 *     'Quote': [ '*´', '*¨' ], // dead keys: acute, diaeresis
 *     ...
 *   },
 *   deadkeys: {
 *     '*´': { 'a': 'á', 'A': 'Á', ...  },
 *     '*¨': { 'a': 'ä', 'A': 'Ä', ...  },
 *     ...
 *   },
 *   geometry: 'ansi' // 'ansi', 'iso', 'alt', 'abnt', 'jis', 'ks' (standard)
 *                    // or 'ol60', 'ol50', 'ol40' (ortholinear)
 * }
 */

// dead keys are identified with a `*` prefix + the diacritic sign
function isDeadKey(value) {
  return value && value.length === 2 && value[0] === '*';
}

/**
 * Keyboard hints:
 * suggest the most efficient way to type a character or a string.
 */

// return the list of all keys that can output the requested char
function getKeyList(keyMap, char) {
  const rv = [];
  Object.entries(keyMap).forEach(([keyID, value]) => {
    const level = value.indexOf(char);
    if (level >= 0) {
      rv.push({ id: keyID, level });
    }
  });
  return rv.sort((a, b) => a.level > b.level);
}

// return a dictionary of all characters that can be done with a dead key
function getDeadKeyDict(deadKeys) {
  const dict = {};
  Object.entries(deadKeys).forEach(([id, dkObj]) => {
    Object.entries(dkObj).forEach(([base, alt]) => {
      if (!(alt in dict)) {
        dict[alt] = [];
      }
      dict[alt].push({ id, base });
    });
  });
  return dict;
}

// return a sequence of keys that can output the requested string
function getKeySequence(keyMap, dkDict, str = '') {
  const rv = [];
  Array.from(str).forEach(char => {
    const keys = getKeyList(keyMap, char);
    if (keys.length) {
      // direct access (possibly with Shift / AltGr)
      rv.push(keys[0]);
    } else if (char in dkDict) {
      // available with a dead key
      const dk = dkDict[char][0];
      const dkId = getKeyList(keyMap, dk.id)[0];
      if (dkId) {
        rv.push(dkId);
      } else {
        // Fetch dead key in main dead key
        rv.push(getKeyList(keyMap, '**')[0]);
        rv.push(getKeyList(keyMap, dkDict[dk.id][0].base)[0]);
      }
      rv.push(getKeyList(keyMap, dk.base)[0]);
    } else {
      // not available
      rv.push({});
      // console.error('char not found:', char); // eslint-disable-line
      // Logging this error is disabled for performance reasons. According to
      // Firefox’s profiler, more than half of the time (~550ms) calculating and
      // displaying stats is spent logging this error on english layouts with
      // the french corpus. Unsupported characters are already handled by
      // 'heatmap.js', so we are not loosing any features.
    }
  });
  return rv;
}

/**
 * Modifiers
 */

const MODIFIERS = {
  ShiftLeft: false,
  ShiftRight: false,
  ControlLeft: false,
  ControlRight: false,
  AltLeft: false,
  AltRight: false,
  OSLeft: false,
  OSRight: false,
};

function getShiftState(modifiers) {
  return modifiers.ShiftRight || modifiers.ShiftLeft;
}

function getAltGrState(modifiers, platform) {
  if (platform === 'win') {
    return modifiers.AltRight || (modifiers.ControlLeft && modifiers.AltLeft);
  }
  if (platform === 'mac') {
    return modifiers.AltRight || modifiers.AltLeft;
  }
  return modifiers.AltRight;
}

function getModifierLevel(modifiers, platform) {
  return (
    (getShiftState(modifiers) ? 1 : 0) +
    (getAltGrState(modifiers, platform) ? 2 : 0)
  );
}

/**
 * Keyboard Layout API (public)
 */

function newKeyboardLayout(keyMap = {}, deadKeys = {}, geometry = '') {
  const modifiers = { ...MODIFIERS };
  const deadKeyDict = getDeadKeyDict(deadKeys);
  let pendingDK;
  let platform = '';

  return {
    get keyMap() {
      return keyMap;
    },
    get deadKeys() {
      return deadKeys;
    },
    get pendingDK() {
      return pendingDK;
    },
    get geometry() {
      return geometry;
    },
    get platform() {
      return platform;
    },
    set platform(value) {
      platform = value;
    },

    // modifier state
    get modifiers() {
      return {
        get shift() {
          return getShiftState(modifiers);
        },
        get altgr() {
          return getAltGrState(modifiers, platform);
        },
        get level() {
          return getModifierLevel(modifiers, platform);
        },
      };
    },

    // keyboard hints
    getKey: char => getKeyList(keyMap, char)[0],
    getKeySequence: str => getKeySequence(keyMap, deadKeyDict, str),

    // keyboard emulation
    keyUp: keyCode => {
      if (keyCode in modifiers) {
        modifiers[keyCode] = false;
      }
    },
    keyDown: keyCode => {
      if (keyCode in modifiers) {
        modifiers[keyCode] = true;
      }
      const key = keyMap[keyCode];
      if (!key) {
        return '';
      }
      let value = key[getModifierLevel(modifiers, platform)];
      if (pendingDK) {
        value = pendingDK[value] || '';
        pendingDK = undefined;
      }
      if (isDeadKey(value)) {
        pendingDK = deadKeys[value];
        return '';
      }
      return value || '';
    },
  };
}

/**
 * Styling: colors & dimensions
 */

const KEY_BG = '#f8f8f8';
const SPECIAL_KEY_BG = '#e4e4e4';
const KEY_COLOR = '#333';
const KEY_COLOR_L3 = 'blue';
const KEY_COLOR_L5 = 'green';
const DEAD_KEY_COLOR = 'red';

const KEY_WIDTH = 60; // 1U = 0.75" = 19.05mm = 60px
const KEY_PADDING = 4; // 8px between two key edges
const KEY_RADIUS = 5; // 5px border radius

/**
 * Deak Keys
 * defined in the Kalamine project: https://github.com/fabi1cazenave/kalamine
 * identifiers -> symbols dictionary, for presentation purposes
 */

const symbols = {
  // diacritics, represented by a space + a combining character
  '*`': ' \u0300', // grave
  '*´': ' \u0301', // acute
  '*^': ' \u0302', // circumflex
  '*~': ' \u0303', // tilde
  '*¯': ' \u0304', // macron
  '*˘': ' \u0306', // breve
  '*˙': ' \u0307', // dot above
  '*¨': ' \u0308', // diaeresis
  '*˚': ' \u030a', // ring above
  '*”': ' \u030b', // double acute
  '*ˇ': ' \u030c', // caron
  '*‟': ' \u030f', // double grave
  '*⁻': ' \u0311', // inverted breve
  '*.': ' \u0323', // dot below
  '*,': ' \u0326', // comma below
  '*¸': ' \u0327', // cedilla
  '*˛': ' \u0328', // ogonek
  // special keys, represented by a smaller single character
  // '*/': stroke   (no special glyph needed)
  // '*µ': greek    (no special glyph needed)
  // '*¤': currency (no special glyph needed)
  '**': '\u2605', // 1dk = Kalamine "one dead key" = multi-purpose dead key
  // other dead key identifiers (= two-char strings starting with a `*` sign)
  // are not supported by Kalamine, but can still be used with <x-keyboard>
};

/**
 * Enter Key: ISO & ALT
 */

const arc = (xAxisRotation, x, y) =>
  [
    `a${KEY_RADIUS},${KEY_RADIUS}`,
    xAxisRotation ? '1 0 0' : '0 0 1',
    `${KEY_RADIUS * x},${KEY_RADIUS * y}`,
  ].join(' ');

const lineLength = (length, gap) => {
  const offset = 2 * (KEY_PADDING + KEY_RADIUS) - 2 * gap * KEY_PADDING;
  return KEY_WIDTH * length - Math.sign(length) * offset;
};

const h = (length, gap = 0, ccw = 0) => {
  const l = lineLength(length, gap);
  const sign = Math.sign(length);
  return `h${l} ${ccw ? arc(1, sign, -sign) : arc(0, sign, sign)}`;
};

const v = (length, gap = 0, ccw = 0) => {
  const l = lineLength(length, gap);
  const sign = Math.sign(length);
  return `v${l} ${ccw ? arc(1, sign, sign) : arc(0, -sign, sign)}`;
};

const M = `M${0.75 * KEY_WIDTH + KEY_RADIUS},-${KEY_WIDTH}`;

const altEnterPath = [
  M,
  h(1.5),
  v(2.0),
  h(-2.25),
  v(-1.0),
  h(0.75, 1, 1),
  v(-1.0, 1),
  'z',
].join(' ');

const isoEnterPath = [
  M,
  h(1.5),
  v(2.0),
  h(-1.25),
  v(-1.0, 1, 1),
  h(-0.25, 1),
  v(-1.0),
  'z',
].join(' ');

/**
 * DOM-to-Text Utils
 */

const sgml = (nodeName, attributes = {}, children = []) =>
  `<${nodeName} ${Object.entries(attributes)
    .map(([id, value]) => {
      if (id === 'x' || id === 'y') {
        return `${id}="${
          KEY_WIDTH * Number(value) - (nodeName === 'text' ? KEY_PADDING : 0)
        }"`;
      }
      if (id === 'width' || id === 'height') {
        return `${id}="${KEY_WIDTH * Number(value) - 2 * KEY_PADDING}"`;
      }
      if (id === 'translateX') {
        return `transform="translate(${KEY_WIDTH * Number(value)}, 0)"`;
      }
      return `${id}="${value}"`;
    })
    .join(' ')}>${children.join('\n')}</${nodeName}>`;

const path = (cname = '', d) => sgml('path', { class: cname, d });

const rect = (cname = '', attributes) =>
  sgml('rect', {
    class: cname,
    width: 1,
    height: 1,
    rx: KEY_RADIUS,
    ry: KEY_RADIUS,
    ...attributes,
  });

const text = (content, cname = '', attributes) =>
  sgml(
    'text',
    {
      class: cname,
      width: 0.5,
      height: 0.5,
      x: 0.34,
      y: 0.78,
      ...attributes,
    },
    [content],
  );

const g = (className, children) => sgml('g', { class: className }, children);

const emptyKey = [rect(), g('key')];

const gKey = (className, finger, x, id, children = emptyKey) =>
  sgml(
    'g',
    {
      class: className,
      finger,
      id,
      transform: `translate(${x * KEY_WIDTH}, 0)`,
    },
    children,
  );

/**
 * Keyboard Layout Utils
 */

const keyLevel = (level, label, position) => {
  const attrs = { ...position };
  const symbol = symbols[label] || '';
  const content = symbol || (label || '').slice(-1);
  let className = '';
  if (level > 4) {
    className = 'dk';
  } else if (isDeadKey(label)) {
    className = `deadKey ${symbol.startsWith(' ') ? 'diacritic' : ''}`;
  }
  return text(content, `level${level} ${className}`, attrs);
};

// In order not to overload the `alt` layers visually (AltGr & dead keys),
// the `shift` key is displayed only if its lowercase is not `base`.
const altUpperChar = (base, shift) =>
  shift && base !== shift.toLowerCase() ? shift : '';

function drawKey(element, keyMap) {
  const keyChars = keyMap[element.parentNode.id];
  if (!keyChars) {
    element.innerHTML = '';
    return;
  }
  /**
   * What key label should we display when the `base` and `shift` layers have
   * the lowercase and uppercase versions of the same letter?
   * Most of the time we want the uppercase letter, but there are tricky cases:
   *   - German:
   *      'ß'.toUpperCase() == 'SS'
   *      'ẞ'.toLowerCase() == 'ß'
   *   - Greek:
   *      'ς'.toUpperCase() == 'Σ'
   *      'σ'.toUpperCase() == 'Σ'
   *      'Σ'.toLowerCase() == 'σ'
   *      'µ'.toUpperCase() == 'Μ' //        micro sign => capital letter MU
   *      'μ'.toUpperCase() == 'Μ' //   small letter MU => capital letter MU
   *      'Μ'.toLowerCase() == 'μ' // capital letter MU =>   small letter MU
   * So if the lowercase version of the `shift` layer does not match the `base`
   * layer, we'll show the lowercase letter (e.g. Greek 'ς').
   */
  const [l1, l2, l3, l4] = keyChars;
  const base = l1.toUpperCase() !== l2 ? l1 : '';
  const shift = base || l2.toLowerCase() === l1 ? l2 : l1;
  const salt = altUpperChar(l3, l4);
  element.innerHTML = `
    ${keyLevel(1, base, { x: 0.28, y: 0.79 })}
    ${keyLevel(2, shift, { x: 0.28, y: 0.41 })}
    ${keyLevel(3, l3, { x: 0.7, y: 0.79 })}
    ${keyLevel(4, salt, { x: 0.7, y: 0.41 })}
    ${keyLevel(5, '', { x: 0.7, y: 0.79 })}
    ${keyLevel(6, '', { x: 0.7, y: 0.41 })}
  `;
}

function drawDK(element, keyMap, deadKey) {
  const drawChar = (element, content) => {
    if (isDeadKey(content)) {
      element.classList.add('deadKey', 'diacritic');
      element.textContent = content[1];
    } else {
      element.classList.remove('deadKey', 'diacritic');
      element.textContent = content || '';
    }
  };

  const keyChars = keyMap[element.parentNode.id];
  if (!keyChars) return;

  const alt0 = deadKey[keyChars[0]];
  const alt1 = deadKey[keyChars[1]];

  drawChar(element.querySelector('.level5'), alt0);
  drawChar(element.querySelector('.level6'), altUpperChar(alt0, alt1));
}

/**
 * SVG Content
 * https://www.w3.org/TR/uievents-code/
 * https://commons.wikimedia.org/wiki/File:Physical_keyboard_layouts_comparison_ANSI_ISO_KS_ABNT_JIS.png
 */

const numberRow =
  g('left', [
    gKey('specialKey', 'l5', 0, 'Escape', [
      rect('ergo', { width: 1.25 }),
      text('⎋', 'ergo'),
    ]),
    gKey('pinkyKey', 'l5', 0, 'Backquote', [
      rect('specialKey jis', { width: 1 }),
      rect('ansi alt iso', { width: 1 }),
      rect('ol60', { width: 1.25 }),
      text('半角', 'jis', { x: 0.5, y: 0.4 }), // half-width (hankaku)
      text('全角', 'jis', { x: 0.5, y: 0.6 }), // full-width (zenkaku)
      text('漢字', 'jis', { x: 0.5, y: 0.8 }), // kanji
      g('ansi key'),
    ]),
    gKey('numberKey', 'l5', 1, 'Digit1'),
    gKey('numberKey', 'l4', 2, 'Digit2'),
    gKey('numberKey', 'l3', 3, 'Digit3'),
    gKey('numberKey', 'l2', 4, 'Digit4'),
    gKey('numberKey', 'l2', 5, 'Digit5'),
  ]) +
  g('right', [
    gKey('numberKey', 'r2', 6, 'Digit6'),
    gKey('numberKey', 'r2', 7, 'Digit7'),
    gKey('numberKey', 'r3', 8, 'Digit8'),
    gKey('numberKey', 'r4', 9, 'Digit9'),
    gKey('numberKey', 'r5', 10, 'Digit0'),
    gKey('pinkyKey', 'r5', 11, 'Minus'),
    gKey('pinkyKey', 'r5', 12, 'Equal', [
      rect('ansi', { width: 1.0 }),
      rect('ol60', { width: 1.25 }),
      g('key'),
    ]),
    gKey('pinkyKey', 'r5', 13, 'IntlYen'),
    gKey('specialKey', 'r5', 13, 'Backspace', [
      rect('ansi', { width: 2 }),
      rect('ol60', { width: 1.25, height: 2, y: -1 }),
      rect('ol40 ol50', { width: 1.25 }),
      rect('alt', { x: 1 }),
      text('⌫', 'ansi'),
      text('⌫', 'ergo'),
      text('⌫', 'alt', { translateX: 1 }),
    ]),
  ]);

const letterRow1 =
  g('left', [
    gKey('specialKey', 'l5', 0, 'Tab', [
      rect('', { width: 1.5 }),
      rect('ergo', { width: 1.25 }),
      text('↹'),
      text('↹', 'ergo'),
    ]),
    gKey('letterKey', 'l5', 1.5, 'KeyQ'),
    gKey('letterKey', 'l4', 2.5, 'KeyW'),
    gKey('letterKey', 'l3', 3.5, 'KeyE'),
    gKey('letterKey', 'l2', 4.5, 'KeyR'),
    gKey('letterKey', 'l2', 5.5, 'KeyT'),
  ]) +
  g('right', [
    gKey('letterKey', 'r2', 6.5, 'KeyY'),
    gKey('letterKey', 'r2', 7.5, 'KeyU'),
    gKey('letterKey', 'r3', 8.5, 'KeyI'),
    gKey('letterKey', 'r4', 9.5, 'KeyO'),
    gKey('letterKey', 'r5', 10.5, 'KeyP'),
    gKey('pinkyKey', 'r5', 11.5, 'BracketLeft'),
    gKey('pinkyKey', 'r5', 12.5, 'BracketRight', [
      rect('ansi', { width: 1.0 }),
      rect('ol60', { width: 1.25 }),
      g('key'),
    ]),
    gKey('pinkyKey', 'r5', 13.5, 'Backslash', [
      rect('ansi', { width: 1.5 }),
      rect('iso ol60'),
      g('key'),
    ]),
  ]);

const letterRow2 =
  g('left', [
    gKey('specialKey', 'l5', 0, 'CapsLock', [
      rect('', { width: 1.75 }),
      text('⇪', 'ansi'),
      text('英数', 'jis', { x: 0.45 }), // alphanumeric (eisū)
    ]),
    gKey('letterKey homeKey', 'l5', 1.75, 'KeyA'),
    gKey('letterKey homeKey', 'l4', 2.75, 'KeyS'),
    gKey('letterKey homeKey', 'l3', 3.75, 'KeyD'),
    gKey('letterKey homeKey', 'l2', 4.75, 'KeyF'),
    gKey('letterKey', 'l2', 5.75, 'KeyG'),
  ]) +
  g('right', [
    gKey('letterKey', 'r2', 6.75, 'KeyH'),
    gKey('letterKey homeKey', 'r2', 7.75, 'KeyJ'),
    gKey('letterKey homeKey', 'r3', 8.75, 'KeyK'),
    gKey('letterKey homeKey', 'r4', 9.75, 'KeyL'),
    gKey('letterKey homeKey', 'r5', 10.75, 'Semicolon'),
    gKey('pinkyKey', 'r5', 11.75, 'Quote'),
    gKey('specialKey', 'r5', 12.75, 'Enter', [
      path('alt', altEnterPath),
      path('iso', isoEnterPath),
      rect('ansi', { width: 2.25 }),
      rect('ol60', { width: 1.25, height: 2, y: -1 }),
      rect('ol40 ol50', { width: 1.25 }),
      text('⏎', 'ansi alt ergo'),
      text('⏎', 'iso', { translateX: 1 }),
    ]),
  ]);

const letterRow3 =
  g('left', [
    gKey('specialKey', 'l5', 0, 'ShiftLeft', [
      rect('ansi alt', { width: 2.25 }),
      rect('iso', { width: 1.25 }),
      rect('ol50 ol60', { width: 1.25, height: 2, y: -1 }),
      rect('ol40', { width: 1.25 }),
      text('⇧'),
      text('⇧', 'ergo'),
    ]),
    gKey('letterKey', 'l5', 1.25, 'IntlBackslash'),
    gKey('letterKey', 'l5', 2.25, 'KeyZ'),
    gKey('letterKey', 'l4', 3.25, 'KeyX'),
    gKey('letterKey', 'l3', 4.25, 'KeyC'),
    gKey('letterKey', 'l2', 5.25, 'KeyV'),
    gKey('letterKey', 'l2', 6.25, 'KeyB'),
  ]) +
  g('right', [
    gKey('letterKey', 'r2', 7.25, 'KeyN'),
    gKey('letterKey', 'r2', 8.25, 'KeyM'),
    gKey('letterKey', 'r3', 9.25, 'Comma'),
    gKey('letterKey', 'r4', 10.25, 'Period'),
    gKey('letterKey', 'r5', 11.25, 'Slash'),
    gKey('pinkyKey', 'r5', 12.25, 'IntlRo'),
    gKey('specialKey', 'r5', 12.25, 'ShiftRight', [
      rect('ansi', { width: 2.75 }),
      rect('abnt', { width: 1.75, x: 1 }),
      rect('ol50 ol60', { width: 1.25, height: 2, y: -1 }),
      rect('ol40', { width: 1.25 }),
      text('⇧', 'ansi'),
      text('⇧', 'ergo'),
      text('⇧', 'abnt', { translateX: 1 }),
    ]),
  ]);

const nonIcon = { x: 0.25, 'text-anchor': 'start' };
const baseRow =
  g('left', [
    gKey('specialKey', 'l5', 0, 'ControlLeft', [
      rect('', { width: 1.25 }),
      rect('ergo', { width: 1.25 }),
      text('Ctrl', 'win gnu', nonIcon),
      text('⌃', 'mac'),
    ]),
    gKey('specialKey', 'l1', 1.25, 'MetaLeft', [
      rect('', { width: 1.25 }),
      rect('ergo', { width: 1.5 }),
      text('Win', 'win', nonIcon),
      text('Super', 'gnu', nonIcon),
      text('⌘', 'mac'),
    ]),
    gKey('specialKey', 'l1', 2.5, 'AltLeft', [
      rect('', { width: 1.25 }),
      rect('ergo', { width: 1.5 }),
      text('Alt', 'win gnu', nonIcon),
      text('⌥', 'mac'),
    ]),
    gKey('specialKey', 'l1', 3.75, 'Lang2', [
      rect(),
      text('한자', '', { x: 0.4 }), // hanja
    ]),
    gKey('specialKey', 'l1', 3.75, 'NonConvert', [
      rect(),
      text('無変換', '', { x: 0.5 }), // muhenkan
    ]),
  ]) +
  gKey('homeKey', 'm1', 3.75, 'Space', [
    rect('ansi', { width: 6.25 }),
    rect('ol60', { width: 5.5, x: -1 }),
    rect('ol50 ol40', { width: 4.5 }),
    rect('ks', { width: 4.25, x: 1 }),
    rect('jis', { width: 3.25, x: 1 }),
  ]) +
  g('right', [
    gKey('specialKey', 'r1', 8.0, 'Convert', [
      rect(),
      text('変換', '', { x: 0.5 }), // henkan
    ]),
    gKey('specialKey', 'r1', 9.0, 'KanaMode', [
      rect(),
      text('カタカナ', '', { x: 0.5, y: 0.4 }), // katakana
      text('ひらがな', '', { x: 0.5, y: 0.6 }), // hiragana
      text('ローマ字', '', { x: 0.5, y: 0.8 }), // romaji
    ]),
    gKey('specialKey', 'r1', 9.0, 'Lang1', [
      rect(),
      text('한/영', '', { x: 0.4 }), // han/yeong
    ]),
    gKey('specialKey', 'r1', 10.0, 'AltRight', [
      rect('', { width: 1.25 }),
      rect('ergo', { width: 1.5 }),
      text('Alt', 'win gnu', nonIcon),
      text('⌥', 'mac'),
    ]),
    gKey('specialKey', 'r1', 11.5, 'MetaRight', [
      rect('', { width: 1.25 }),
      rect('ergo', { width: 1.5 }),
      text('Win', 'win', nonIcon),
      text('Super', 'gnu', nonIcon),
      text('⌘', 'mac'),
    ]),
    gKey('specialKey', 'r5', 12.5, 'ContextMenu', [
      rect('', { width: 1.25 }),
      rect('ergo'),
      text('☰'),
      text('☰', 'ol60'),
    ]),
    gKey('specialKey', 'r5', 13.75, 'ControlRight', [
      rect('', { width: 1.25 }),
      rect('ergo', { width: 1.25 }),
      text('Ctrl', 'win gnu', nonIcon),
      text('⌃', 'mac'),
    ]),
  ]);

const svgContent = `
  <svg viewBox="0 0 ${KEY_WIDTH * 15} ${KEY_WIDTH * 5}"
      xmlns="http://www.w3.org/2000/svg">
    <g id="row_AE" text-anchor="middle"> ${numberRow}  </g>
    <g id="row_AD" text-anchor="middle"> ${letterRow1} </g>
    <g id="row_AC" text-anchor="middle"> ${letterRow2} </g>
    <g id="row_AB" text-anchor="middle"> ${letterRow3} </g>
    <g id="row_AA" text-anchor="middle"> ${baseRow}    </g>
  </svg>
`;

const translate = (x = 0, y = 0, offset) => {
  const dx = KEY_WIDTH * x + (offset ? KEY_PADDING : 0);
  const dy = KEY_WIDTH * y + (offset ? KEY_PADDING : 0);
  return `{ transform: translate(${dx}px, ${dy}px); }`;
};

const main = `
  rect, path {
    stroke: #666;
    stroke-width: .5px;
    fill: ${KEY_BG};
  }
  .specialKey,
  .specialKey rect,
  .specialKey path {
    fill: ${SPECIAL_KEY_BG};
  }
  text {
    fill: ${KEY_COLOR};
    font: normal 20px sans-serif;
    text-align: center;
  }
  #Backspace text {
    font-size: 12px;
  }
`;

// keyboard geometry: ANSI, ISO, ABNT, ALT
const classicGeometry = `
  #Escape { display: none; }

  #row_AE ${translate(0, 0, true)}
  #row_AD ${translate(0, 1, true)}
  #row_AC ${translate(0, 2, true)}
  #row_AB ${translate(0, 3, true)}
  #row_AA ${translate(0, 4, true)}

  /* Backslash + Enter */
  #Enter path.alt,
  #Enter     .iso,
  #Backslash .iso,
  .alt #Enter rect.ansi,
  .iso #Enter rect.ansi,
  .iso #Enter text.ansi,
  .alt #Backslash .ansi,
  .iso #Backslash .ansi { display: none; }
  #Enter text.ansi,
  .alt #Enter     .alt,
  .iso #Enter     .iso,
  .iso #Backslash .iso { display: block; }
  .iso #Backslash ${translate(12.75, 1)}
  .alt #Backslash ${translate(13.0, -1)}

  /* Backspace + IntlYen */
  #IntlYen, #Backspace .alt,
  .intlYen  #Backspace .ansi { display: none; }
  .intlYen  #Backspace .alt,
  .intlYen  #IntlYen { display: block; }

  /* ShiftLeft + IntlBackslash */
  #IntlBackslash, #ShiftLeft .iso,
  .intlBackslash  #ShiftLeft .ansi { display: none; }
  .intlBackslash  #ShiftLeft .iso,
  .intlBackslash  #IntlBackslash { display: block; }

  /* ShiftRight + IntlRo */
  #IntlRo, #ShiftRight .abnt,
  .intlRo  #ShiftRight .ansi { display: none; }
  .intlRo  #ShiftRight .abnt,
  .intlRo  #IntlRo { display: block; }
`;

// ortholinear geometry: TypeMatrix (60%), OLKB (50%, 40%)
const orthoGeometry = `
  .specialKey   .ergo,
  .specialKey   .ol60,
  .specialKey   .ol50,
  .specialKey   .ol40,
  #Space        .ol60,
  #Space        .ol50,
  #Space        .ol40,
  #Backquote    .ol60,
  #BracketRight .ol60,
  #Equal        .ol60,
  .ergo #CapsLock,
  .ergo #Space      rect,
  .ergo #Backslash  rect,
  .ergo .specialKey rect,
  .ergo .specialKey text { display: none; }
  .ol50 #Escape,
  .ol40 #Escape,
  .ol60 #Space        .ol60,
  .ol50 #Space        .ol50,
  .ol40 #Space        .ol40,
  .ol60 #Backquote    .ol60,
  .ol60 #BracketRight .ol60,
  .ol60 #Backslash    .ol60,
  .ol60 #Equal        .ol60,
  .ol60 .specialKey   .ol60,
  .ol50 .specialKey   .ol50,
  .ol40 .specialKey   .ol40,
  .ergo .specialKey   .ergo { display: block; }

  .ol50 .pinkyKey, .ol50 #ContextMenu,
  .ol40 .pinkyKey, .ol40 #ContextMenu,
  .ol40 #row_AE .numberKey { display: none; }

  .ergo #row_AE       ${translate(1.5, 0, true)}
  .ergo #row_AD       ${translate(1.0, 1, true)}
  .ergo #row_AC       ${translate(0.75, 2, true)}
  .ergo #row_AB       ${translate(0.25, 3, true)}

  .ergo #Tab          ${translate(0.25)}
  .ergo #ShiftLeft    ${translate(1.0)}
  .ergo #ControlLeft  ${translate(1.25)}
  .ergo #MetaLeft     ${translate(2.5)}
  .ergo #AltLeft      ${translate(4.0)}
  .ergo #Space        ${translate(5.25)}
  .ergo #AltRight     ${translate(9.0)}
  .ergo #MetaRight    ${translate(10.5)}
  .ergo #ControlRight ${translate(12.5)}

  .ergo .left         ${translate(-0.25)}
  .ergo .right        ${translate(0.25)}

  .ol60 .left         ${translate(-1.25)}
  .ol60 #ControlRight ${translate(13.5)}
  .ol60 #Backquote    ${translate(-0.25)}
  .ol60 #ShiftRight   ${translate(13.25)}
  .ol60 #ContextMenu  ${translate(12.5)}
  .ol60 #Backslash    ${translate(11.5, 2)}
  .ol60 #Backspace    ${translate(4.625, 1)}
  .ol60 #Enter        ${translate(5.375, 1)}

  .ol50 #Escape       ${translate(-0.25)}
  .ol50 #Backspace    ${translate(11.0)}
  .ol50 #Enter        ${translate(11.75, -1)}

  .ol40 #Escape       ${translate(-0.25, 2)}
  .ol40 #Backspace    ${translate(11.0, 1)}
  .ol40 #Enter        ${translate(11.75, 0)}

  [platform="gnu"].ergo .specialKey .win,
  [platform="gnu"].ergo .specialKey .mac,
  [platform="win"].ergo .specialKey .gnu,
  [platform="win"].ergo .specialKey .mac { display: none; }
  .ergo .specialKey .mac,
  [platform="gnu"].ergo .specialKey .gnu,
  [platform="win"].ergo .specialKey .win { display: block; }

  /* swap Alt/Meta for MacOSX */
  [platform="gnu"].ergo #MetaLeft,
  [platform="win"].ergo #MetaLeft,
                  .ergo #AltLeft   ${translate(2.5)}
  [platform="gnu"].ergo #AltLeft,
  [platform="win"].ergo #AltLeft,
                  .ergo #MetaLeft  ${translate(4.0)}
  [platform="gnu"].ergo #AltRight,
  [platform="win"].ergo #AltRight,
                  .ergo #MetaRight ${translate(9.5)}
  [platform="gnu"].ergo #MetaRight,
  [platform="win"].ergo #MetaRight,
                  .ergo #AltRight  ${translate(11.0)}
`;

// Korean + Japanese input systems
const cjkKeys = `
  #NonConvert, #Convert, #KanaMode,
  #Lang1, #Lang2,
  #Space .jis,
  #Space .ks,
  .ks  #Space .ansi,
  .ks  #Space .jis,
  .jis #Space .ansi,
  .jis #Space .ks { display: none; }
  .ks  #Space .ks,
  .jis #NonConvert, .jis #Convert, .jis #KanaMode,
  .ks #Lang1, .ks #Lang2,
  .jis #Space .jis { display: block; }

  #Backquote .jis,
  #CapsLock  .jis,
  .jis #Backquote .ansi,
  .jis #CapsLock  .ansi { display: none; }
  .jis #Backquote .jis,
  .jis #CapsLock .jis { display: block; }

  #Lang1 text,
  #Lang2 text,
  #Convert text,
  #NonConvert text,
  .jis #CapsLock text { font-size: 14px; }
  #KanaMode text,
  .jis #Backquote text { font-size: 10px; }
`;

// Windows / MacOSX / Linux modifiers
const modifiers = `
  .specialKey .win,
  .specialKey .gnu {
    display: none;
    font-size: 14px;
  }

  /* display MacOSX by default */
  [platform="gnu"] .specialKey .win,
  [platform="gnu"] .specialKey .mac,
  [platform="win"] .specialKey .gnu,
  [platform="win"] .specialKey .mac { display: none; }
  [platform="mac"] .specialKey .mac,
  [platform="gnu"] .specialKey .gnu,
  [platform="win"] .specialKey .win { display: block; }

  /* swap Alt/Meta for MacOSX */
  [platform="gnu"] #MetaLeft,
  [platform="win"] #MetaLeft,  #AltLeft   ${translate(1.25)}
  [platform="gnu"] #AltLeft,
  [platform="win"] #AltLeft,   #MetaLeft  ${translate(2.5)}
  [platform="gnu"] #AltRight,
  [platform="win"] #AltRight,  #MetaRight ${translate(10.0)}
  [platform="gnu"] #MetaRight,
  [platform="win"] #MetaRight, #AltRight  ${translate(11.25)}
`;

// color themes
const themes = `
  g:target rect, .press rect,
  g:target path, .press path {
    fill: #aad;
  }

  [theme="reach"] .pinkyKey  rect { fill: hsl(  0, 100%, 90%); }
  [theme="reach"] .numberKey rect { fill: hsl( 42, 100%, 90%); }
  [theme="reach"] .letterKey rect { fill: hsl(122, 100%, 90%); }
  [theme="reach"] .homeKey   rect { fill: hsl(122, 100%, 75%); }
  [theme="reach"] .press     rect { fill: #aaf; }

  [theme="hints"] [finger="m1"] rect { fill: hsl(  0, 100%, 95%); }
  [theme="hints"] [finger="l2"] rect { fill: hsl( 42, 100%, 85%); }
  [theme="hints"] [finger="r2"] rect { fill: hsl( 61, 100%, 85%); }
  [theme="hints"] [finger="l3"] rect,
  [theme="hints"] [finger="r3"] rect { fill: hsl(136, 100%, 85%); }
  [theme="hints"] [finger="l4"] rect,
  [theme="hints"] [finger="r4"] rect { fill: hsl(200, 100%, 85%); }
  [theme="hints"] [finger="l5"] rect,
  [theme="hints"] [finger="r5"] rect { fill: hsl(230, 100%, 85%); }
  [theme="hints"] .specialKey   rect,
  [theme="hints"] .specialKey   path { fill: ${SPECIAL_KEY_BG}; }
  [theme="hints"] .hint         rect { fill: #a33; }
  [theme="hints"] .press        rect { fill: #335; }
  [theme="hints"] .press        text { fill: #fff; }
  [theme="hints"] .hint text {
    font-weight: bold;
    fill: white;
  }

  /* dimmed AltGr + bold dead keys */
  .level3, .level4 { fill: ${KEY_COLOR_L3}; opacity: .5; }
  .level5, .level6 { fill: ${KEY_COLOR_L5}; }
  .deadKey {
    fill: ${DEAD_KEY_COLOR};
    font-size: 14px;
  }
  .diacritic  {
    font-size: 20px;
    font-weight: bolder;
  }

  /* hide Level4 (Shift+AltGr) unless AltGr is pressed */
  .level4        { display: none; }
  .altgr .level4 { display: block; }

  /* highlight AltGr + Dead Keys */
  .dk .level1, .altgr .level1,
  .dk .level2, .altgr .level2 { opacity: 0.25; }
  .dk .level5, .altgr .level3,
  .dk .level6, .altgr .level4 { opacity: 1; }
  .dk .level3,
  .dk .level4 { display: none; }

  @media (prefers-color-scheme: dark) {
    rect, path { stroke: #777; fill: #4d4d4d; }
    .specialKey, .specialKey rect, .specialKey path { fill: #333; }
    g:target rect, .press rect, g:target path, .press path { fill: #558; }
    text { fill: #bbb; }
    .level3, .level4 { fill: #99f; }
    .level5, .level6 { fill: #6d6; }
    .deadKey { fill: #f44; }

    [theme="reach"] .pinkyKey  rect { fill: hsl(  0, 20%, 30%); }
    [theme="reach"] .numberKey rect { fill: hsl( 35, 25%, 30%); }
    [theme="reach"] .letterKey rect { fill: hsl( 61, 30%, 30%); }
    [theme="reach"] .homeKey   rect { fill: hsl(136, 30%, 30%); }
    [theme="reach"] .press     rect { fill: #449; }

    [theme="hints"] [finger="m1"] rect { fill: hsl(  0, 25%, 30%); }
    [theme="hints"] [finger="l2"] rect { fill: hsl( 31, 30%, 30%); }
    [theme="hints"] [finger="r2"] rect { fill: hsl( 61, 30%, 30%); }
    [theme="hints"] [finger="l3"] rect,
    [theme="hints"] [finger="r3"] rect { fill: hsl(136, 30%, 30%); }
    [theme="hints"] [finger="l4"] rect,
    [theme="hints"] [finger="r4"] rect { fill: hsl(200, 30%, 30%); }
    [theme="hints"] [finger="l5"] rect,
    [theme="hints"] [finger="r5"] rect { fill: hsl(230, 30%, 30%); }
    [theme="hints"] .specialKey   rect,
    [theme="hints"] .specialKey   path { fill: #333; }
    [theme="hints"] .hint         rect { fill: #a33; }
    [theme="hints"] .press        rect { fill: #335; }
    [theme="hints"] .press        text { fill: #fff; }
    [theme="hints"] .hint text {
      font-weight: bold;
      fill: white;
    }
  }
`;

// export full stylesheet
const style = `
  ${main}
  ${classicGeometry}
  ${orthoGeometry}
  ${cjkKeys}
  ${modifiers}
  ${themes}
`;

/**
 * Custom Element
 */

const setFingerAssignment = (root, ansiStyle) => {
  (ansiStyle
    ? ['l5', 'l4', 'l3', 'l2', 'l2', 'r2', 'r2', 'r3', 'r4', 'r5']
    : ['l5', 'l5', 'l4', 'l3', 'l2', 'l2', 'r2', 'r2', 'r3', 'r4']
  ).forEach((attr, i) => {
    root.getElementById(`Digit${(i + 1) % 10}`).setAttribute('finger', attr);
  });
};

const getKeyChord = (root, key) => {
  if (!key || !key.id) {
    return [];
  }
  const element = root.getElementById(key.id);
  const chord = [element];
  if (key.level > 1) {
    // altgr
    chord.push(root.getElementById('AltRight'));
  }
  if (key.level % 2) {
    // shift
    chord.push(
      root.getElementById(
        element.getAttribute('finger')[0] === 'l' ? 'ShiftRight' : 'ShiftLeft',
      ),
    );
  }
  return chord;
};

const guessPlatform = () => {
  const p = navigator.platform.toLowerCase();
  if (p.startsWith('win')) {
    return 'win';
  }
  if (p.startsWith('mac')) {
    return 'mac';
  }
  if (p.startsWith('linux')) {
    return 'linux';
  }
  return '';
};

const template = document.createElement('template');
template.innerHTML = `<style>${style}</style>${svgContent}`;

class Keyboard extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));
    this._state = {
      geometry: this.getAttribute('geometry') || '',
      platform: this.getAttribute('platform') || '',
      theme: this.getAttribute('theme') || '',
      layout: newKeyboardLayout(),
    };
    this.geometry = this._state.geometry;
    this.platform = this._state.platform;
    this.theme = this._state.theme;
  }

  /**
   * User Interface: color theme, shape, layout.
   */

  get theme() {
    return this._state.theme;
  }

  set theme(value) {
    this._state.theme = value;
    this.root.querySelector('svg').setAttribute('theme', value);
  }

  setCustomColors(keymap) { // XXX drop in favor of .keys?
    Object.entries(keymap).forEach(([id, color]) => {
      this.root
        .getElementById(id)
        .querySelectorAll('rect')
        .forEach(rect => {
          rect.style.fill = color;
        });
    });
  }

  setCustomOpacity(keymap) { // XXX drop in favor of .keys?
    Object.entries(keymap).forEach(([id, opacity]) => {
      this.root
        .getElementById(id)
        .querySelectorAll('rect')
        .forEach(rect => {
          rect.style.opacity = opacity;
        });
    });
  }

  get geometry() {
    return this._state.geometry;
  }

  set geometry(value) {
    /**
     * Supported geometries (besides ANSI):
     * - Euro-style [Enter] key:
     *     ISO  = ANSI + IntlBackslash
     *     ABNT = ISO + IntlRo + NumpadComma
     *     JIS  = ISO + IntlRo + IntlYen - IntlBackslash
     *                + NonConvert + Convert + KanaMode
     * - Russian-style [Enter] key:
     *     ALT = ANSI - Backslash + IntlYen
     *     KS = ALT + Lang1 + Lang2
     * - Ortholinear:
     *     OL60 = TypeMatrix 2030
     *     OL50 = OLKB Preonic
     *     OL40 = OLKB Planck
     */
    const supportedShapes = {
      alt: 'alt intlYen',
      ks: 'alt intlYen ks',
      jis: 'iso intlYen intlRo jis',
      abnt: 'iso intlBackslash intlRo',
      iso: 'iso intlBackslash',
      ansi: '',
      ol60: 'ergo ol60',
      ol50: 'ergo ol50',
      ol40: 'ergo ol40',
    };
    if (value && !(value in supportedShapes)) {
      return;
    }
    this._state.geometry = value;
    const geometry = value || this.layout.geometry || 'ansi';
    const shape = supportedShapes[geometry];
    this.root.querySelector('svg').className.baseVal = shape;
    setFingerAssignment(this.root, !shape.startsWith('iso'));
  }

  get platform() {
    return this._state.platform;
  }

  set platform(value) {
    const supportedPlatforms = {
      win: 'win',
      mac: 'mac',
      linux: 'gnu',
    };
    this._state.platform = value in supportedPlatforms ? value : '';
    const platform = this._state.platform || guessPlatform();
    this.layout.platform = platform;
    this.root
      .querySelector('svg')
      .setAttribute('platform', supportedPlatforms[platform]);
  }

  get layout() {
    return this._state.layout;
  }

  set layout(value) {
    this._state.layout = value;
    this._state.layout.platform = this.platform;
    this.geometry = this._state.geometry;
    Array.from(this.root.querySelectorAll('.key')).forEach(key =>
      drawKey(key, value.keyMap),
    );
  }

  get fingerAssignments() {
    const fingers = ['l5', 'l4', 'l3', 'l2', 'r2', 'r2', 'r3', 'r4', 'r5'];
    const keys = {};
    fingers.forEach(f => {
      keys[f] = Array
        .from(this.root.querySelectorAll(`[finger=${f}]`))
        .map(element => element.id);
    });
    return keys;
  }

  setKeyboardLayout(keyMap, deadKeys, geometry) {
    this.layout = newKeyboardLayout(keyMap, deadKeys, geometry);
  }

  get keys() { // XXX return IDs only and rely on setCustom{Colors,Opacity}?
    return Array
      .from(this.root.querySelectorAll('[id]'))
      .filter(element => !element.id.startsWith('row_'));
  }

  /**
   * KeyboardEvent helpers
   */

  keyDown(event) {
    const code = event.code.replace(/^OS/, 'Meta'); // https://bugzil.la/1264150
    if (!code) {
      return '';
    }
    const element = this.root.getElementById(code);
    if (!element) {
      return '';
    }
    element.classList.add('press');
    const dk = this.layout.pendingDK;
    const rv = this.layout.keyDown(code); // updates `this.layout.pendingDK`
    const alt = this.layout.modifiers.altgr;
    if (alt) {
      this.root.querySelector('svg').classList.add('altgr');
    }
    if (dk) {
      // a dead key has just been unlatched, hide all key hints
      if (!element.classList.contains('specialKey')) {
        this.root.querySelector('svg').classList.remove('dk');
        Array.from(this.root.querySelectorAll('.dk')).forEach(span => {
          span.textContent = '';
        });
      }
    }
    if (this.layout.pendingDK) {
      // show hints for this dead key
      Array.from(this.root.querySelectorAll('.key')).forEach(key => {
        drawDK(key, this.layout.keyMap, this.layout.pendingDK);
      });
      this.root.querySelector('svg').classList.add('dk');
    }
    return !alt && (event.ctrlKey || event.altKey || event.metaKey) ? '' : rv; // don't steal ctrl/alt/meta shortcuts
  }

  keyUp(event) {
    const code = event.code.replace(/^OS/, 'Meta'); // https://bugzil.la/1264150
    if (!code) {
      return;
    }
    const element = this.root.getElementById(code);
    if (!element) {
      return;
    }
    element.classList.remove('press');
    this.layout.keyUp(code);
    if (!this.layout.modifiers.altgr) {
      this.root.querySelector('svg').classList.remove('altgr');
    }
  }

  /**
   * Keyboard hints
   */

  clearStyle() {
    Array.from(this.root.querySelectorAll('[style]')).forEach(element =>
      element.removeAttribute('style'),
    );
    Array.from(this.root.querySelectorAll('.press')).forEach(element =>
      element.classList.remove('press'),
    );
  }

  showKeys(chars, cssText) {
    this.clearStyle();
    this.layout.getKeySequence(chars).forEach(key => {
      this.root.getElementById(key.id).style.cssText = cssText;
    });
  }

  showHint(keyObj) {
    let hintClass = '';
    Array.from(this.root.querySelectorAll('.hint')).forEach(key =>
      key.classList.remove('hint'),
    );
    getKeyChord(this.root, keyObj).forEach(key => {
      key.classList.add('hint');
      hintClass += `${key.getAttribute('finger')} `;
    });
    return hintClass;
  }

  pressKey(keyObj) {
    this.clearStyle();
    getKeyChord(this.root, keyObj).forEach(key => {
      key.classList.add('press');
    });
  }

  pressKeys(str, duration = 250) {
    function* pressKeys(keys) {
      for (const key of keys) {
        // eslint-disable-line
        yield key;
      }
    }
    const it = pressKeys(this.layout.getKeySequence(str));
    const send = setInterval(() => {
      const { value, done } = it.next();
      // this.showHint(value);
      this.pressKey(value);
      if (done) {
        clearInterval(send);
      }
    }, duration);
  }
}

customElements.define('x-keyboard', Keyboard);

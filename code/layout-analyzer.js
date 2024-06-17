window.addEventListener('DOMContentLoaded', () => {
  'use strict'; // eslint-disable-line

  const inputField = document.querySelector('input');
  const keyboard = document.querySelector('x-keyboard');

  let keyChars = {};
  let corpus = {};
  let digrams = {};
  let trigrams = {};
  let corpusName = '';
  let impreciseData = false;

  const substituteChars = {
    '\u00a0': ' ', // ( ) no-break space
    '\u202f': ' ', // ( ) narrow no-break space

    '\u00ab': '"', // («) left-pointing double angle quotation mark
    '\u00bb': '"', // (») right-pointing double angle quotation mark
    '\u201c': '"', // (“) left double quotation mark
    '\u201d': '"', // (”) right double quotation mark
    '\u201e': '"', // („) double low-9 quotation mark

    '\u2018': "'", // (‘) left single quotation mark
    '\u2019': "'", // (’) right single quotation mark

    '\u2013': '-', // (–) en dash
    '\u2014': '-', // (—) em dash
    '\u2026': '...', // (…) ellipsis
  };

  // create an efficient hash table to parse a text
  const supportedChars = (keymap, deadkeys) => {
    const charTable = {};
    const deadTable = {};

    // main chars, directly accessible (or with Shift / AltGr)
    Object.entries(keymap).forEach(([key, values]) => {
      values.forEach(char => {
        if (!(char in charTable)) {
          if (char.length === 1) {
            charTable[char] = [key];
          } else if (!(char in deadTable)) {
            deadTable[char] = key;
          }
        }
      });
    });

    // additional chars, requiring dead keys
    Object.entries(deadkeys).forEach(([key, dict]) => {
      Object.entries(dict).forEach(([orig, char]) => {
        if (!(char in charTable) && charTable[orig]) {
          charTable[char] = [deadTable[key]].concat(charTable[orig]);
        }
      });
    });

    return charTable;
  };

  // display a percentage value
  const fmtPercent = (num, p) => `${Math.round(10 ** p * num) / 10 ** p}%`;
  const showPercent = (sel, num, precision, parentId) => {
    const element = parentId
      ? document.querySelector(parentId).shadowRoot
      : document;
    element.querySelector(sel).innerText = fmtPercent(num, precision);
  };

  const getKeyPositionQuality = keyCode => {
    // This is cursed, there *has* to be a better way
    switch (keyCode) {
      case 'KeyA':
      case 'KeyS':
      case 'KeyD':
      case 'KeyF':
      case 'KeyW':
      case 'KeyE':
      case 'KeyV':
      case 'KeyJ':
      case 'KeyK':
      case 'KeyL':
      case 'Semicolon':
      case 'KeyM':
      case 'KeyI':
      case 'KeyO':
        return 'good';

      case 'KeyC':
      case 'KeyR':
      case 'KeyG':
      case 'KeyH':
      case 'KeyU':
      case 'KeyComma':
        return 'meh';

      default:
        return 'bad';
    }
  };

  // display a finger/frequency table and bar graph
  const showFingerData = (sel, values, maxValue, precision) => {
    const canvas = document.querySelector(`${sel} canvas`);
    const table = document.querySelector(`${sel} table`);

    canvas.width = 1000;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.save();
    const headingColor = getComputedStyle(
      document.querySelector('h1'),
    ).getPropertyValue('color');
    ctx.fillStyle = impreciseData ? headingColor : '#88f';
    const width = canvas.width / 11;
    const margin = 20;
    const scale = 100 / maxValue;

    let cols = '';
    Object.values(values).forEach((value, i) => {
      const idx = i >= 4 ? i + 2 : i + 1;
      cols +=
        (i === 4 ? '<td></td>' : '') +
        `<td>${fmtPercent(value, precision)}</td>`;
      ctx.fillRect(
        idx * width + margin / 2,
        canvas.height - value * scale,
        width - margin / 2,
        value * scale,
      );
    });
    ctx.restore();
    table.innerHTML = `<tr><td></td>${cols}<td></td></tr>`;
  };

  // compute the same-finger usages and rolls
  const computeDigrams = () => {
    const skuCount = {}; // same-key usage
    const sfuCount = {}; // same-finger usage
    const skuDigrams = {};
    const sfuDigrams = {};
    const inwardDigrams = {};
    const outwardDigrams = {};
    const extendedRolls = {};
    const scisors = {};

    const fingers = ['l5', 'l4', 'l3', 'l2', 'r2', 'r3', 'r4', 'r5'];
    fingers.forEach(finger => {
      sfuCount[finger] = 0;
      skuCount[finger] = 0;
    });

    const keyFinger = {};
    Object.entries(keyboard.fingerAssignments).forEach(([f, keys]) => {
      keys.forEach(keyName => {
        keyFinger[keyName] = f;
      });
    });

    // Index Inner or outside of 3×10 matrix.
    const requiresExtension = keyCode =>
      Array.from('TGBNHY').some(l => l == keyCode.at(3)) ||
      !(
        keyCode.startsWith('Key') ||
        ['Space', 'Comma', 'Period', 'Slash', 'Semicolon'].includes(keyCode)
      )
      ;

    const getKeyRow = keyCode => {
      if (keyCode === 'Space') return 0;
      if (keyCode.startsWith('Digit')) return 4;

      if (keyCode.startsWith('Key')) {
        const letter = keyCode.at(3);
        if (Array.from('QWERTYUIOP').indexOf(letter) >= 0) return 3;
        if (Array.from('ASDFGHJKL').indexOf(letter) >= 0) return 2;
        if (Array.from('ZXCVBNM').indexOf(letter) >= 0) return 1;
      }

      if (['Backquote', 'Minus'].some(kc => kc == keyCode)) return 4;
      if (['BracketLeft', 'BracketRight'].some(kc => kc == keyCode)) return 3;
      if (['Semicolon', 'Quote', 'Backslash'].some(kc => kc == keyCode)) return 2;
      if (['Comma', 'Period', 'Slash', 'IntlBackslash'].some(kc => kc == keyCode)) return 1;

      console.error(`Unknown Key Row: ${keyCode}`);
      return 0;
    };

    const isScisor = (kc1, kc2, finger1, finger2) => {
      var finger1Height = getKeyRow(kc1);
      var finger2Height = getKeyRow(kc2);

      switch (finger1.at(1) + finger2.at(1)) {
        case '45':
          [finger1Height, finger2Height] = [finger2Height, finger1Height];
        // FallThrough
        case '54':
          // Stricter tolerance if it’s pinky and ring, but AW (qwerty) is fine
          return (
            Math.abs(getKeyRow(kc1) - getKeyRow(kc2)) >= 1 &&
            !(finger1Height == 2 && finger2Height == 3)
          );
        default:
          return Math.abs(getKeyRow(kc1) - getKeyRow(kc2)) >= 2;
      }
      // if (fingerUsed == '54' || fingerUsed == '45') {
      //   return Math.abs(getKeyRow(kc1) - getKeyRow(acc)) >= 1;
      // }
      // return Math.abs(getKeyRow(kc1) - getKeyRow(acc)) >= 2;
    };

    // note: in Ergol, ï and î are same-finger digrams even though they are
    // single characters => count symbols, too?
    const sum = (acc, freq) => acc + freq;
    const total = Object.values(digrams).reduce(sum, 0);
    Object.entries(digrams)
      .map(([digram, frequency]) => [digram, (100 * frequency) / total])
      .forEach(([digram, frequency]) => {
        keyboard.layout.getKeySequence(digram).reduce((acc, key) => {
          const curr_finger = keyFinger[key.id];
          const last_finger = keyFinger[acc];
          // Safeguard, skip iteration if check fails
          if (!curr_finger || !last_finger) return key.id;

          if (acc === key.id) {
            // same key
            skuDigrams[digram] = frequency;
            skuCount[curr_finger] += frequency;
          } else if (curr_finger === last_finger) {
            // same finger
            sfuDigrams[digram] = frequency;
            sfuCount[curr_finger] += frequency;
          } else if (curr_finger[0] === last_finger[0]) {
            // same hand
            // if (Math.abs(getKeyRow(key.id) - getKeyRow(acc)) >= 2) {
            if (isScisor(key.id, acc, curr_finger, last_finger)) {
              scisors[digram] = frequency;

              if (requiresExtension(key.id) || requiresExtension(acc)) {
                extendedRolls[digram] = frequency;
              }
            } else {
              if (requiresExtension(key.id) || requiresExtension(acc)) {
                extendedRolls[digram] = frequency;
              } else if (curr_finger[1] < last_finger[1]) {
                inwardDigrams[digram] = frequency;
              } else {
                outwardDigrams[digram] = frequency;
              }
            }
          }

          return key.id;
        }, '');
      });

    document.querySelector('#imprecise-data').style.display = impreciseData
      ? 'block'
      : 'none';

    const sumUpFrequencies = dict => Object.values(dict).reduce(sum, 0);

    showFingerData('#sfu', sfuCount, 3.5, 2);
    showFingerData('#sku', skuCount, 3.5, 2);

    showPercent('#sfu-all', sumUpFrequencies(sfuCount), 2);
    showPercent('#sku-all', sumUpFrequencies(skuCount), 2);

    showPercent('#sfu-all', sumUpFrequencies(sfuCount), 2, '#Achoppements');
    showPercent(
      '#extensions-all',
      sumUpFrequencies(extendedRolls),
      2,
      '#Achoppements',
    );
    showPercent('#scisors-all', sumUpFrequencies(scisors), 2, '#Achoppements');

    showPercent(
      '#inward-all',
      sumUpFrequencies(inwardDigrams),
      1,
      '#Digrammes',
    );
    showPercent(
      '#outward-all',
      sumUpFrequencies(outwardDigrams),
      1,
      '#Digrammes',
    );
    showPercent('#sku-all', sumUpFrequencies(skuCount), 2, '#Digrammes');

    // document.querySelector("stats-canvas").renderData([
    //   [
    //     { "good": 4 , "meh": 3, "bad": 5 },
    //     { "good": 7 , "meh": 3, "bad": 5 },
    //     { "good": 7 , "meh": 3, "bad": 5 },
    //     { "good": 12, "meh": 3, "bad": 5 },
    //   ],
    //   [
    //     { "good": 7 , "meh": 3, "bad": 5 },
    //     { "good": 7 , "meh": 3, "bad": 5 },
    //   ],
    //   [
    //     { "good": 12, "meh": 3, "bad": 5 },
    //     { "good": 7 , "meh": 3, "bad": 5 },
    //     { "good": 7 , "meh": 3, "bad": 5 },
    //     { "good": 4 , "meh": 3, "bad": 5 },
    //   ],
    // ], 26);

    const achoppements = document.getElementById('Achoppements');
    achoppements.updateTableData('#sfu-digrams', 'SFU', sfuDigrams, 2);
    achoppements.updateTableData(
      '#extended-rolls',
      'extensions',
      extendedRolls,
      2,
    );
    achoppements.updateTableData('#scisors', 'ciseaux', scisors, 2);

    const digrammes = document.getElementById('Digrammes');
    digrammes.updateTableData('#sku-digrams', 'SKU', skuDigrams, 2);
    digrammes.updateTableData('#inward', 'rolls intérieur', inwardDigrams, 2);
    digrammes.updateTableData('#outward', 'rolls extérieur', outwardDigrams, 2);
  };

  // compute the redirected rolls
  const computeTrigrams = () => {
    const redirects = {};
    const badRedirects = {};
    const almostSKBs = {};
    const almostSFBs = {};

    const keyFinger = { Space: 'th' };
    Object.entries(keyboard.fingerAssignments).forEach(([f, keys]) => {
      keys.forEach(keyName => {
        keyFinger[keyName] = f;
      });
    });

    const sum = (acc, freq) => acc + freq;
    const total = Object.values(trigrams).reduce(sum, 0);
    Object.entries(trigrams)
      .map(([trigram, frequency]) => [trigram, (100 * frequency) / total])
      .forEach(([trigram, frequency]) => {
        const keySequence = keyboard.layout.getKeySequence(trigram);
        const fingers = keySequence.map(key => keyFinger[key.id] ?? '  '); // XXX dirty workaround, FIXME
        const hands = fingers.map(key => key.charAt(0)).join('');
        // TODO: handle trigrams that involve more than 3 keys

        // Almost SFBs
        if (fingers[0] == fingers[2]) {
          for (let i = 0; i < keySequence.length - 2; i++) {
            if (keySequence[i].id == keySequence[i + 2].id) {
              almostSKBs[trigram] = frequency;
              return;
            }
          }

          // not an 'almost skb' so it’s an 'almost sfb'
          almostSFBs[trigram] = frequency;
          return;
        }

        // Redirects
        if (hands === 'lll' || hands === 'rrr') {
          const nums = fingers.map(key => Number(key.charAt(1)));
          if (
            (nums[0] < nums[1] && nums[1] > nums[2]) ||
            (nums[0] > nums[1] && nums[1] < nums[2])
          ) {
            if (nums.some(finger => finger == 2)) {
              // redirection has an index somewhere
              redirects[trigram] = frequency;
            } else {
              // no index = bad redirects
              badRedirects[trigram] = frequency;
            }
          }
        }
      });

    // display metrics
    showPercent(
      '#almost-skb-all',
      Object.values(almostSKBs).reduce(sum, 0),
      1,
      '#Trigrammes',
    );
    showPercent(
      '#almost-sfb-all',
      Object.values(almostSFBs).reduce(sum, 0),
      1,
      '#Trigrammes',
    );
    showPercent(
      '#redirect-all',
      Object.values(redirects).reduce(sum, 0),
      1,
      '#Trigrammes',
    );
    showPercent(
      '#bad-redirect-all',
      Object.values(badRedirects).reduce(sum, 0),
      2,
      '#Trigrammes',
    );

    const trigrammes = document.getElementById('Trigrammes');
    trigrammes.updateTableData('#almost-skbs', 'presque SKBs', almostSKBs, 2);
    trigrammes.updateTableData('#almost-sfbs', 'presque SFBs', almostSFBs, 2);
    trigrammes.updateTableData('#redirect', 'redirections', redirects, 2);
    trigrammes.updateTableData(
      '#bad-redirect',
      'redirections foireuses',
      badRedirects,
      2,
    );
  };

  // compute the heatmap for a text on a given layout
  const computeHeatmap = () => {
    const keyCount = {};
    Object.values(keyChars).forEach(keys => {
      keys.forEach(key => {
        keyCount[key] = 0;
      });
    });

    // count the key strokes in the corpus
    const unsupportedChars = {};
    Object.entries(corpus).forEach(([char, count]) => {
      const keys = keyChars[char] || keyChars[substituteChars[char]];
      if (keys) {
        keys.forEach(key => {
          keyCount[key] += count;
        });
      } else {
        unsupportedChars[char] = count;
      }
    });

    const totalUnsupportedChars = Object.values(unsupportedChars)
      .reduce((acc, elem) => acc + elem, 0)
      .toFixed(3);

    // Set global variable, controls the color of canvas element for finger data
    // (There’s ~probably~ a better way to do this)
    impreciseData = totalUnsupportedChars >= 0.5;

    // display the heatmap
    const colormap = {};
    const contrast = 6;
    const total = Object.values(corpus).reduce((acc, n) => n + acc, 0);

    const headingColor = getComputedStyle(document.querySelector('h1'))
      .getPropertyValue('color')
      .slice(0, -1); // remove `)` to add opacity later

    Object.keys(keyboard.layout.keyMap).forEach(key => {
      if (key !== 'Enter') {
        const count = key in keyCount ? keyCount[key] : 0;
        const lvl = (contrast * count) / total;
        colormap[key] = impreciseData
          ? headingColor + `, ${lvl})` // orange scale
          : `rgb(127, 127, 255, ${lvl})`; // blue scale
      }
    });
    keyboard.setCustomColors(colormap);

    // compute metrics
    const fingerCount = {};
    const fingerLoad = {};
    let keystrokes = 0;
    Object.entries(keyboard.fingerAssignments).forEach(([f, keys]) => {
      fingerCount[f] = keys
        .filter(id => id in keyCount)
        .reduce((acc, id) => acc + keyCount[id], 0);
      keystrokes += fingerCount[f];
    });
    Object.entries(fingerCount).forEach(([f, count]) => {
      fingerLoad[f] = (100 * count) / keystrokes;
    });

    const getLoadGroup = fingers => fingers.map(finger => {
      const res = {
        'good': 0,
        'meh': 0,
        'bad': 0,
      };

      for (const key of finger) {
        res[getKeyPositionQuality(key)] += keyCount[key] ?? 0;
      }

      return res;
    });

    const allFingers = Object.values(keyboard.fingerAssignments);

    const load = [
      getLoadGroup(allFingers.splice(0, 4)),
      getLoadGroup(allFingers),
    ];

    document.querySelector('stats-canvas').renderData(load, 25);

    // display metrics
    const sum = (acc, id) => fingerLoad[id] + acc;
    showPercent('#load-left', ['l2', 'l3', 'l4', 'l5'].reduce(sum, 0), 1);
    showPercent('#load-right', ['r2', 'r3', 'r4', 'r5'].reduce(sum, 0), 1);
    showPercent('#unsupported-all', totalUnsupportedChars, 3, '#Achoppements');
    showFingerData('#load', fingerLoad, 25.0, 1, totalUnsupportedChars >= 0.5);

    document
      .getElementById('Achoppements')
      .updateTableData(
        '#unsupported',
        'non-support\u00e9',
        unsupportedChars,
        3,
      );
  };

  // keyboard state: these <select> element IDs match the x-keyboard properties
  // -- but the `layout` property requires a JSON fetch
  const IDs = ['layout', 'geometry', 'corpus'];
  const setProp = (key, value) => {
    if (key === 'layout') {
      if (value) {
        fetch(`../layouts/${value}.json`)
          .then(response => response.json())
          .then(data => {
            inputField.placeholder = `zone de saisie ${value}`;
            keyboard.setKeyboardLayout(
              data.keymap,
              data.deadkeys,
              data.geometry.replace('ergo', 'iso'),
            );
            data.keymap.Enter = ['\r', '\n'];
            keyChars = supportedChars(data.keymap, data.deadkeys);
            if (Object.keys(corpus).length > 0) {
              computeHeatmap();
              computeDigrams();
              computeTrigrams();
            }
          });
      } else {
        keyboard.setKeyboardLayout();
        keyChars = {};
        inputField.placeholder = 'select a keyboard layout';
      }
    } else if (key === 'corpus') {
      if (value && value !== corpusName) {
        fetch(`../corpus/${value}.json`)
          .then(response => response.json())
          .then(data => {
            corpus = data.symbols;
            digrams = data.digrams;
            trigrams = data.trigrams;
            if (Object.keys(keyChars).length > 0) {
              computeHeatmap();
              computeDigrams();
              computeTrigrams();
            }
          });
        corpusName = value;
      }
    } else {
      keyboard[key] = value;
    }
    document.getElementById(key).value = value;
  };

  // store the keyboard state in the URL hash like it's 1995 again! :-)
  const state = {};
  const updateHashState = (key, value) => {
    state[key] = value;
    window.location.hash = '/' +
      IDs.map(prop => state[prop]).join('/').replace(/\/+$/, '');
  };
  const applyHashState = () => {
    const hash = window.location.hash || '#/ergol//en+fr';
    const hashState = hash.split('/').slice(1);
    IDs.forEach((key, i) => {
      setProp(key, hashState[i] || '');
      state[key] = hashState[i] || '';
    });
  };
  IDs.forEach(key => {
    document
      .getElementById(key)
      .addEventListener('change', event =>
        updateHashState(key, event.target.value),
      );
  });
  window.addEventListener('hashchange', applyHashState);
  applyHashState();
});

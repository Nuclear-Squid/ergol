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

  const charToKeys = char => keyChars[char] ?? keyChars[substituteChars[char]];

  const is1DFH = keyCode =>
    keyCode.startsWith('Key') ||
      ['Space', 'Comma', 'Period', 'Slash', 'Semicolon'].includes(keyCode);

  // create an efficient hash table to parse a text
  const supportedChars = (keymap, deadkeys) => {
    const charTable = {};
    const deadTable = {};

    // In case there are multiple ways of typing a singel char, this checks
    // which sequence is easier to type (examples are in Ergo‑L)
    const requiresLessEffort = (originalKeySequence, newKeySequence) => {
      const arrayCount = (array, predicate) => {
        let rv = 0;
        array.forEach(elem => { if (predicate(elem)) rv++ });
        return rv;
      };

      const cmp = (val1, val2) => {
        if (val1 > val2) return "more";
        if (val1 < val2) return "less";
        return "same";
      };

      const cmpNot1DFH = cmp(
        arrayCount(newKeySequence, key => !is1DFH(key.keyCode)),
        arrayCount(originalKeySequence, key => !is1DFH(key.keyCode))
      );

      // Checks if new sequence has less keys that aren’t 1DFH.
      // => will prefer altgr[B] over shift[9] for `#`.
      if (cmpNot1DFH == "less") return true;
      if (cmpNot1DFH == "more") return false;
      // If it’s the same, we check the rest.

      const cmpHighestLevel = cmp(
        newKeySequence.reduce((max, elem) => Math.max(max, elem.level), 0),
        originalKeySequence.reduce((max, elem) => Math.max(max, elem.level), 0)
      );

      // Checks if the highest layer is lower in the new squence.
      // => will prefer 1dk -> `r` over altgr[D] for `)`.
      if (cmpHighestLevel == "less") return true;
      if (cmpHighestLevel == "more") return false;

      // Checks if the new sequence has fewer keystrokes than the original one.
      // => will prefer 1dk -> `i` over 1dk -> 1dk -> `i` for `ï`
      return newKeySequence.length < originalKeySequence.length;
    };

    const insertInTable = (table, char, keySequence) => {
      if (!(char in table) || requiresLessEffort(table[char], keySequence)) {
        table[char] = keySequence;
      }
    };

    function insertDeadKeySequences(charTable, deadKeys, currentDeadKey) {
      for (const [baseChar, outputChar] of Object.entries(deadKeys[currentDeadKey.name])) {
        if (!(baseChar in charTable)) continue;
        const newSequence = currentDeadKey.sequence.concat(charTable[baseChar]);

        if (outputChar.length == 1)
          insertInTable(charTable, outputChar, newSequence);
        else
          insertDeadKeySequences(charTable, deadKeys, {
            "name": outputChar,
            "sequence": newSequence,
          });
      }
    }

    for (const [keyCode, charsPerLevel] of Object.entries(keymap)) {
      for (const [level, char] of charsPerLevel.entries()) {
        const sequence = [{ keyCode, level }];
        insertInTable(charTable, char, sequence);
        if (char.length != 1) insertInTable(deadTable, char, sequence);
      }
    }

    for (const [deadKey, sequence] of Object.entries(deadTable)) {
      insertDeadKeySequences(charTable, deadkeys, { "name": deadKey, "sequence": sequence });
    }

    const finalTable = {};
    for (const [char, sequence] of Object.entries(charTable)) {
      finalTable[char] = sequence.map(key => key.keyCode)
    }
    return finalTable;
  };

  // display a percentage value
  const fmtPercent = (num, p) => `${Math.round(10 ** p * num) / 10 ** p}%`;
  const showPercent = (sel, num, precision, parentId) => {
    const element = parentId
      ? document.querySelector(parentId).shadowRoot
      : document;
    element.querySelector(sel).innerText = fmtPercent(num, precision);
  };

  const showPercentAll = (sel, nums, precision, parentId) => {
    const element = parentId
      ? document.querySelector(parentId).shadowRoot
      : document;
    element.querySelector(sel).innerText =
      nums.map(value => fmtPercent(value, precision)).join(' / ');
  };

  const sumUpBar = bar => bar.good + bar.meh + bar.bad;
  const sumUpBarGroup = group => group.reduce((acc, bar) => acc + sumUpBar(bar), 0);

  // This has to be the *stupidest* way to format code, and I love it
  const goodKeysSet = new Set([
            'KeyW', 'KeyE',                    'KeyI', 'KeyO',
    'KeyA', 'KeyS', 'KeyD', 'KeyF',    'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
                            'KeyV',    'KeyM',
  ]);

  const mehKeysSet = new Set([ 'KeyC', 'KeyR', 'KeyG', 'KeyH', 'KeyU', 'KeyComma' ]);

  const getKeyPositionQuality = keyCode => {
    if (goodKeysSet.has(keyCode)) return "good";
    if (mehKeysSet.has(keyCode)) return "meh";
    return "bad";
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

  // Returns a custom iterator, similar to Rust’s std::slice::Windows.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
  // https://doc.rust-lang.org/std/primitive.slice.html#method.windows
  const arrayWindows = (arr, len) => ({
    *[Symbol.iterator]() {
      let rv = arr.slice(0, len);
      yield rv;
      for (let i = len; i < arr.length; i++) {
        for (let j = 0; j < len - 1; j++) {
          rv[j] = rv[j + 1];
        }
        rv[len - 1] = arr[i];
        yield rv;
      }
    }
  });

  const computeNGrams = () => {
    const ngrams = Object.fromEntries([
        // Digrams
        'sfb',  // Same Finger Bigram
        'skb',  // Same Key Bigram
        'lsb',  // Lateral Strech Bigram
        'handChange',  // Two keys typed by different hands
        'scisor',  // Roll with uncomfortable height difference between the keys
        'extendedScisor',  // scisor + lsb
        'inwardRoll',   // Roll in the pinky -> index direction
        'outwardRoll',  // Roll in the index -> pinky direction

        // Trigrams
        'redirect',  // Two rolls going in different directions
        'badRedirect', // Redirect that doesn’t use the index
        'sfs',  // Same Finger Skipgram (sfb with other key in the middle)
        'sks',  // Same Key Skipgram (skb with other key in the middle)
        'rollAndHandChange',  // A roll and hand change (no particullar order)
        'doubleRoll', // Two rolls in the same direction
        'doubleHandChange'  // Two hand changes
      ].map(digramType => [digramType, { 'symbols': {}, 'total': 0 }])
    );

    const keyFinger = {};
    Object.entries(keyboard.fingerAssignments).forEach(([f, keys]) => {
      keys.forEach(keyName => {
        keyFinger[keyName] = f;
      });
    });

    // Index Inner or outside of 3×10 matrix.
    const requiresExtension = keyCode =>
      Array.from('TGBNHY').some(l => l == keyCode.at(3)) || !is1DFH(keyCode);

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
    };

    // NOTE: in Ergol, ï and · are same-finger digrams even though they are
    // single characters => count symbols, too?
    const getDigramType = (lastKeyCode, currKeyCode) => {
      if (lastKeyCode === currKeyCode) return 'skb';

      const lastFinger = keyFinger[lastKeyCode];
      const currFinger = keyFinger[currKeyCode];

      if (currFinger === lastFinger) return 'sfb';
      if (currFinger[0] !== lastFinger[0]) return 'handChange';

      if (isScisor(currKeyCode, lastKeyCode, currFinger, lastFinger))
        return [lastKeyCode, currKeyCode].some(requiresExtension)
          ? 'extendedScisor'
          : 'scisor';

      if ([lastKeyCode, currKeyCode].some(requiresExtension)) return 'lsb';
      return currFinger[1] < lastFinger[1] ? 'inwardRoll' : 'outwardRoll';
    };

    const getTrigramType = (lastKeyCode, currKeyCode, nextKeyCode) => {
      const lastFinger = keyFinger[lastKeyCode];
      const currFinger = keyFinger[currKeyCode];
      const nextFinger = keyFinger[nextKeyCode];

      if (lastFinger == nextFinger) return lastKeyCode == nextKeyCode ? 'sks' : 'sfs';

      const hands = lastFinger[0] + currFinger[0] + nextFinger[0];

      if (['lrl', 'rlr'].includes(hands)) return 'doubleHandChange';
      if (['llr', 'rll', 'rrl', 'lrr'].includes(hands)) return 'rollAndHandChange';

      // I don’t know if this is briliant or if I deserve a VIP ticket to Hell.
      if ((lastFinger[1] > currFinger[1]) != (currFinger[1] > nextFinger[1]))
        return [lastFinger, currFinger, nextFinger].some(finger => finger[1] == '2')
          ? 'redirect'
          : 'badRedirect';

      return 'doubleRoll';
    };

    // TODO: This needs a better name
    const addNGrams = (outDict, ngramsDict, getNGramType) => {
      const total = Object.values(ngramsDict).reduce((acc, e) => acc + e);

      for (const [ngram, frequency] of Object.entries(ngramsDict)) {
        const keySequence = Array.from(ngram).flatMap(symbol => keyChars[symbol]);
        if (keySequence.some(key => key == undefined)) continue;

        const normalizedFrequency = 100 * frequency / total;
        for (const keyCodes of arrayWindows(keySequence, ngram.length)) {
          if (keyCodes.includes('Space')) continue;
          const ngramType = getNGramType(...keyCodes);
          outDict[ngramType].symbols[ngram] = frequency;
          outDict[ngramType].total += normalizedFrequency;
        }
      }
    };

    addNGrams(ngrams,  digrams,  getDigramType);
    addNGrams(ngrams, trigrams, getTrigramType);

    const getFingerPosition = ([hand, finger]) =>
      hand == 'l' ? [0, 5 - Number(finger)] : [1, Number(finger) - 2];

    // JS, I know you suck at FP, but what the fuck is that, man??
    const totalSfuSkuPerFinger = Array(2).fill(0).map(_ =>
      Array(4).fill(0).map(_ => ({ "good": 0, "meh": 0, "bad": 0 }))
    );

    for (const [sfb, frequency] of Object.entries(ngrams.sfb.symbols)) {
      const [groupIndex, itemIndex] = getFingerPosition(keyFinger[keyChars[sfb[1]][0]]);
      totalSfuSkuPerFinger[groupIndex][itemIndex].bad += frequency;
    }

    for (const [skb, frequency] of Object.entries(ngrams.skb.symbols)) {
      const [groupIndex, itemIndex] = getFingerPosition(keyFinger[keyChars[skb[1]][0]]);
      totalSfuSkuPerFinger[groupIndex][itemIndex].meh += frequency;
    }

    // Render digrams
    document.querySelector('#sfu stats-canvas').renderData({
      values: totalSfuSkuPerFinger,
      maxValue: 4,
      precision: 2,
      flipVertically: true,
      detailedValues: true,
    });

    showPercent('#sfu-all', ngrams.sfb.total, 2);
    showPercent('#sku-all', ngrams.skb.total, 2);

    showPercent('#sfu-all',        ngrams.sfb.total,    2, '#Achoppements');
    showPercent('#extensions-all', ngrams.lsb.total,    2, '#Achoppements');
    showPercent('#scisors-all',    ngrams.scisor.total, 2, '#Achoppements');

    showPercent('#inward-all',  ngrams.inwardRoll.total,  1, '#Digrammes');
    showPercent('#outward-all', ngrams.outwardRoll.total, 1, '#Digrammes');
    showPercent('#sku-all',     ngrams.skb.total,         2, '#Digrammes');

    const achoppements = document.getElementById('Achoppements');
    achoppements.updateTableData('#sfu-digrams', 'SFU', ngrams.sfb.symbols, 2);
    achoppements.updateTableData('#extended-rolls', 'extensions', ngrams.lsb.symbols, 2,);
    achoppements.updateTableData('#scisors', 'ciseaux', ngrams.scisor.symbols, 2);

    const digrammes = document.getElementById('Digrammes');
    digrammes.updateTableData('#sku-digrams', 'SKU', ngrams.skb.symbols, 2);
    digrammes.updateTableData('#inward', 'rolls intérieur', ngrams.inwardRoll.symbols, 2);
    digrammes.updateTableData('#outward', 'rolls extérieur', ngrams.outwardRoll.symbols, 2);

    // Display trigrams
    showPercent('#almost-skb-all',   ngrams.sks.total, 1, '#Trigrammes');
    showPercent('#almost-sfb-all',   ngrams.sfs.total, 1, '#Trigrammes');
    showPercent('#redirect-all',     ngrams.redirect.total, 1, '#Trigrammes');
    showPercent('#bad-redirect-all', ngrams.badRedirect.total, 2, '#Trigrammes');

    const trigrammes = document.getElementById('Trigrammes');
    trigrammes.updateTableData('#almost-skbs', 'presque SKBs', ngrams.sks.symbols, 2);
    trigrammes.updateTableData('#almost-sfbs', 'presque SFBs', ngrams.sfs.symbols, 2);
    trigrammes.updateTableData('#redirect', 'redirections', ngrams.redirect.symbols, 2);
    trigrammes.updateTableData(
      '#bad-redirect',
      'mauvaises redirections',
      ngrams.badRedirect.symbols,
      2,
    );
  };

  // compute the heatmap for a text on a given layout
  const computeHeatmap = () => {
    const unsupportedChars = {};
    const keyCount = {};
    let totalUnsupportedChars = 0;
    let extraKeysFrequency = 0;

    for (const [char, frequency] of Object.entries(corpus)) {
      const keys = charToKeys(char);
      if (!keys) {
        unsupportedChars[char] = frequency;
        totalUnsupportedChars += frequency;
        continue;
      }
      for (const key of keys) {
        if (!(key in keyCount)) keyCount[key] = 0;
        keyCount[key] += frequency;
      }
      extraKeysFrequency += frequency * (keys.length - 1);
    }

    // Set global variable, controls the color of canvas element for finger data
    // (There’s ~probably~ a better way to do this)
    impreciseData = totalUnsupportedChars >= 0.5;
    document.querySelector('#imprecise-data').style.display = impreciseData
      ? 'block'
      : 'none';

    // display the heatmap
    const colormap = {};
    const contrast = 6;
    const total = Object.values(corpus).reduce((acc, n) => n + acc, 0);

    const headingColor = getComputedStyle(document.querySelector('h1'))
      .getPropertyValue('color')
      .slice(0, -1); // remove `)` to add opacity later

    Object.keys(keyboard.layout.keyMap).forEach(key => {
      if (key === 'Enter') return;
      const count = keyCount[key] ?? 0;
      const lvl = (contrast * count) / total;
      colormap[key] = impreciseData
        ? headingColor + `, ${lvl})` // gray scale
        : `rgb(127, 127, 255, ${lvl})`; // blue scale
    });
    keyboard.setCustomColors(colormap);

    const getLoadGroup = fingers_array => fingers_array.map(finger => {
      const rv = { "good": 0, "meh": 0, "bad": 0 };
      finger.forEach(key => {
        const keyQuality = getKeyPositionQuality(key);
        const normalizedFrequency = keyCount[key] * 100 / (100 + extraKeysFrequency) || 0;
        rv[keyQuality] += normalizedFrequency;
      });
      return rv;
    });

    const allFingers = Object.values(keyboard.fingerAssignments);

    const loadGroups = [
      getLoadGroup(allFingers.slice(0, 4)),
      getLoadGroup(allFingers.slice(-4)),
    ];

    document.querySelector('#load stats-canvas').renderData({
      values: loadGroups,
      maxValue: 25,
      precision: 1
    });
    showPercentAll('#load small', loadGroups.map(sumUpBarGroup), 1);

    showPercent('#unsupported-all', totalUnsupportedChars, 3, '#Achoppements');

    document
      .getElementById('Achoppements')
      .updateTableData('#unsupported', 'non-support\u00e9', unsupportedChars, 3);
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
              computeNGrams();
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

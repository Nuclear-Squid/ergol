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
    '\u00a0': ' ', // ( ) no-break space
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

  const NGRAM_CATEGORIES = [
    // Digrams
    'sfb',             // Same Finger Bigram
    'skb',             // Same Key Bigram
    'lsb',             // Lateral Strech Bigram
    'handChange',      // Two keys typed by different hands
    'scissor',         // Roll with uncomfortable height difference between the keys
    'extendedScissor', // scissor + lsb
    'inwardRoll',      // Roll in the pinky -> index direction
    'outwardRoll',     // Roll in the index -> pinky direction

    // Trigrams
    'redirect',        // Two rolls going in different directions
    'badRedirect',     // Redirect that doesn’t use the index
    'sfs',             // Same Finger Skipgram (sfb with other key in the middle)
    'sks',             // Same Key Skipgram (skb with other key in the middle)
    'other',           // unused, is just two simple digrams, nothing to note.
  ];

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
      const uses1DK = '**' in keyboard.layout.deadKeys
          ? keySequence => keySequence.some(key => key === charTable['**'][0])
          : (_) => false;

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

      if (originalKeySequence.length > 1 && newKeySequence.length > 1) {
        const cmp1DK = cmp(
          uses1DK(originalKeySequence),
          uses1DK(newKeySequence)
        );
        if (cmp1DK === 'less') return true;
        if (cmp1DK === 'more') return false;
      }

      const cmpNot1DFH = cmp(
        arrayCount(newKeySequence, key => !is1DFH(key.keyCode)),
        arrayCount(originalKeySequence, key => !is1DFH(key.keyCode))
      );

      // Checks if new sequence has less keys that aren’t 1DFH.
      // => will prefer altgr[B] over shift[9] for `#`.
      if (cmpNot1DFH === "less") return true;
      if (cmpNot1DFH === "more") return false;
      // If it’s the same, we check the rest.

      const cmpHighestLevel = cmp(
        newKeySequence.reduce((max, elem) => Math.max(max, elem.level), 0),
        originalKeySequence.reduce((max, elem) => Math.max(max, elem.level), 0)
      );

      // Checks if the highest layer is lower in the new squence.
      // => will prefer 1dk -> `r` over altgr[D] for `)`.
      if (cmpHighestLevel === "less") return true;
      if (cmpHighestLevel === "more") return false;

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

        if (outputChar.length === 1)
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
        if (char.length !== 1) insertInTable(deadTable, char, sequence);
      }
    }

    for (const [deadKey, sequence] of Object.entries(deadTable)) {
      insertDeadKeySequences(charTable, deadkeys, { "name": deadKey, "sequence": sequence });
    }

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

  const mehKeysSet = new Set([ 'KeyC', 'KeyR', 'KeyG', 'KeyH', 'KeyU', 'Comma' ]);

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
      for (let i = 0; i <= arr.length - len; i++) {
        yield arr.slice(i, i + len);
      }
    }
  });

  const computeNGrams = () => {
    const ngrams = Object.fromEntries(NGRAM_CATEGORIES.map(digramType => [digramType, {}]));

    const buildNgramDict = (dict, ngramLength) => {
      let total = 0;
      const rv = {};

      for (const [ngram, frequency] of Object.entries(dict)) {
        let nextPendingDeadKey = undefined;
        const totalKeySequence = Array.from(ngram).flatMap(charToKeys);

        for (const keySequence of arrayWindows(totalKeySequence, ngramLength)) {
          total += frequency;
          if (totalKeySequence.some(key => key === undefined)) continue;

          let [pendingDeadKey, name] = keySequence.reduce(([pendingDeadKey, acc], { keyCode, level }) => {
            let char = keyboard.layout.keyMap[keyCode][level];
            if (pendingDeadKey)
              char = keyboard.layout.deadKeys[pendingDeadKey][char];

            return char?.length === 1
                ? [undefined, acc + char]
                : [char, acc];
          }, [nextPendingDeadKey, '']);

          if (pendingDeadKey) {
            name += pendingDeadKey;
            pendingDeadKey = undefined;
          }

          // PrettyPrint the ODK
          // TODO: add a system for generic deadKeys ?
          name = name.replaceAll('**', '★');

          // I wanted a "Zig-style block expression", syntax might be stupid
          nextPendingDeadKey = (() => {
            const { keyCode, level } = keySequence[0];
            const firstCharInSequence = keyboard.layout.keyMap[keyCode][level]
            if (firstCharInSequence.length === 1) return undefined;
            return pendingDeadKey !== undefined
                ? keyboard.layout.deadKeys[pendingDeadKey][firstCharInSequence]
                : firstCharInSequence;
          })();

          // keylevels are needed when building the ngramDicts, but aren’t
          // used when computing the ngrams, so we simplify the data structure.
          const keyCodes = keySequence.map(({ keyCode }) => keyCode);
          if (!(name in rv)) rv[name] = { keyCodes, frequency };
          else rv[name].frequency += frequency;
        }
      }

      // normalize values
      for (const [name, { frequency }] of Object.entries(rv)) {
        rv[name].frequency = frequency * 100 / total;
      }

      return rv;
    };

    const realDigrams  = buildNgramDict(digrams, 2);
    const realTrigrams = buildNgramDict(trigrams, 3);

    const keyFinger = {};
    Object.entries(keyboard.fingerAssignments).forEach(([f, keys]) => {
      keys.forEach(keyName => {
        keyFinger[keyName] = f;
      });
    });

    // Index Inner or outside of 3×10 matrix.
    const requiresExtension = keyCode =>
      Array.from('TGBNHY').some(l => l === keyCode.at(3)) || !is1DFH(keyCode);

    const getKeyRow = keyCode => {
      if (keyCode === 'Space') return 0;
      if (keyCode.startsWith('Digit')) return 4;

      if (keyCode.startsWith('Key')) {
        const letter = keyCode.at(3);
        if (Array.from('QWERTYUIOP').indexOf(letter) >= 0) return 3;
        if (Array.from('ASDFGHJKL').indexOf(letter) >= 0) return 2;
        if (Array.from('ZXCVBNM').indexOf(letter) >= 0) return 1;
      }

      if (['Backquote', 'Minus'].some(kc => kc === keyCode)) return 4;
      if (['BracketLeft', 'BracketRight'].some(kc => kc === keyCode)) return 3;
      if (['Semicolon', 'Quote', 'Backslash'].some(kc => kc === keyCode)) return 2;
      if (['Comma', 'Period', 'Slash', 'IntlBackslash'].some(kc => kc === keyCode)) return 1;

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
            !(finger1Height === 2 && finger2Height == 3)
          );
        default:
          return Math.abs(getKeyRow(kc1) - getKeyRow(kc2)) >= 2;
      }
    };

    const getDigramType = (prevKeyCode, currKeyCode) => {
      if (prevKeyCode === currKeyCode) return 'skb';

      const prevFinger = keyFinger[prevKeyCode];
      const currFinger = keyFinger[currKeyCode];

      if (currFinger === prevFinger) return 'sfb';
      if (currFinger[0] !== prevFinger[0]) return 'handChange';

      if (isScisor(currKeyCode, prevKeyCode, currFinger, prevFinger))
        return [prevKeyCode, currKeyCode].some(requiresExtension)
          ? 'extendedScissor'
          : 'scissor';

      if ([prevKeyCode, currKeyCode].some(requiresExtension)) return 'lsb';
      return currFinger[1] < prevFinger[1] ? 'inwardRoll' : 'outwardRoll';
    };

    const getTrigramType = (prevKeyCode, currKeyCode, nextKeyCode) => {
      const prevFinger = keyFinger[prevKeyCode];
      const currFinger = keyFinger[currKeyCode];
      const nextFinger = keyFinger[nextKeyCode];

      if (prevFinger === nextFinger) return prevKeyCode == nextKeyCode ? 'sks' : 'sfs';

      const hands = prevFinger[0] + currFinger[0] + nextFinger[0];

      if (!['lll', 'rrr'].includes(hands)) return 'other';

      const fingers = prevFinger[1] + currFinger[1] + nextFinger[1];
      if (fingers[0] === fingers[1] || fingers[1] == fingers[2]) return 'other';

      const firstRollIsInward = fingers[0] > fingers[1];
      const secondRollIsInward = fingers[1] > fingers[2];
      if (firstRollIsInward !== secondRollIsInward)
        return [prevFinger, currFinger, nextFinger].some(finger => finger[1] === '2')
          ? 'redirect'
          : 'badRedirect';

      return 'other';
    };

    const getFingerPosition = ([hand, finger]) =>
      hand === 'l' ? [0, 5 - Number(finger)] : [1, Number(finger) - 2];

    // JS, I know you suck at FP, but what the fuck is that, man??
    const totalSfuSkuPerFinger = Array(2).fill(0).map(_ =>
      Array(4).fill(0).map(_ => ({ "good": 0, "meh": 0, "bad": 0 }))
    );

    for (const [ngram, { keyCodes, frequency }] of Object.entries(realDigrams)) {
      if (keyCodes.includes('Space')) continue;
      const ngramType = getDigramType(...keyCodes);
      ngrams[ngramType][ngram] = frequency;

      if (ngramType === 'sfb') {
        const [groupIndex, itemIndex] = getFingerPosition(keyFinger[keyCodes[0]]);
        totalSfuSkuPerFinger[groupIndex][itemIndex].bad += frequency;
      }

      if (ngramType === 'skb') {
        const [groupIndex, itemIndex] = getFingerPosition(keyFinger[keyCodes[0]]);
        totalSfuSkuPerFinger[groupIndex][itemIndex].meh += frequency;
      }
    }

    for (const [ngram, { keyCodes, frequency }] of Object.entries(realTrigrams)) {
      if (keyCodes.includes('Space')) continue;
      const ngramType = getTrigramType(...keyCodes);
      ngrams[ngramType][ngram] = frequency;
    }

    // Render digrams
    document.querySelector('#sfu stats-canvas').renderData({
      values: totalSfuSkuPerFinger,
      maxValue: 4,
      precision: 2,
      flipVertically: true,
      detailedValues: true,
    });

    const sum = dict => Object.entries(dict).reduce((acc, [_, e]) => acc + e, 0);

    showPercent('#sfu-all', sum(ngrams.sfb), 2);
    showPercent('#sku-all', sum(ngrams.skb), 2);

    showPercent('#sfu-all',        sum(ngrams.sfb),     2, '#Achoppements');
    showPercent('#extensions-all', sum(ngrams.lsb),     2, '#Achoppements');
    showPercent('#scissors-all',   sum(ngrams.scissor), 2, '#Achoppements');

    showPercent('#inward-all',  sum(ngrams.inwardRoll),  1, '#Bigrammes');
    showPercent('#outward-all', sum(ngrams.outwardRoll), 1, '#Bigrammes');
    showPercent('#sku-all',     sum(ngrams.skb),         2, '#Bigrammes');

    const achoppements = document.getElementById('Achoppements');
    achoppements.updateTableData('#sfu-digrams',    'SFU',        ngrams.sfb, 2);
    achoppements.updateTableData('#extended-rolls', 'LSB',        ngrams.lsb, 2,);
    achoppements.updateTableData('#scissors',       'ciseaux',    ngrams.scissor, 2);

    const bigrammes = document.getElementById('Bigrammes');
    bigrammes.updateTableData('#sku-digrams', 'SKU', ngrams.skb, 2);
    bigrammes.updateTableData('#inward',  'roulements intérieurs', ngrams.inwardRoll,  2);
    bigrammes.updateTableData('#outward', 'roulements extérieurs', ngrams.outwardRoll, 2);

    // Display trigrams
    showPercent('#sks-all',          sum(ngrams.sks),         1, '#Trigrammes');
    showPercent('#sfs-all',          sum(ngrams.sfs),         1, '#Trigrammes');
    showPercent('#redirect-all',     sum(ngrams.redirect),    1, '#Trigrammes');
    showPercent('#bad-redirect-all', sum(ngrams.badRedirect), 2, '#Trigrammes');

    const trigrammes = document.getElementById('Trigrammes');
    trigrammes.updateTableData('#sks',      'SKS',          ngrams.sks, 2);
    trigrammes.updateTableData('#sfs',      'SFS',          ngrams.sfs, 2);
    trigrammes.updateTableData('#redirect', 'redirections', ngrams.redirect, 2);
    trigrammes.updateTableData(
      '#bad-redirect',
      'mauvaises redirections',
      ngrams.badRedirect,
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
      const keys = charToKeys(char)?.map(({ keyCode }) => keyCode);
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
            const selectedOption =
              document
                .querySelector('#layout option:checked')
                .textContent.trim() || value;
            inputField.placeholder = `zone de saisie ${selectedOption}`;
            keyboard.setKeyboardLayout(
              data.keymap,
              data.deadkeys,
              data.geometry.replace('ergo', 'iso'),
            );
            data.keymap.Enter = ['\r', '\n'];
            keyChars = supportedChars(data.keymap, data.deadkeys);
            computeHeatmap();
            computeNGrams();
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
    const hash = window.location.hash;
    if (hash.length < 4) {
      window.location.hash = '/fr/ergol/iso/en+fr';
    }
    const hashState = hash.split('/').slice(1);
    // Merge les deux premiers éléments, car ce sont "fr" et "ergol" par exemple, et on veut "fr/ergol"
    if (hashState.length > 1) {
      hashState[1] = `${hashState[0]}/${hashState[1]}`;
      hashState.splice(0, 1);
    }
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

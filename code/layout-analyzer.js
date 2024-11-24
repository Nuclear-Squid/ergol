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
    // Bigrams
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
    'other',           // unused, is just two simple bigrams, nothing to note.
  ];

  // thsis could be part of x-keyboard
  const is1DFH = keyCode =>
    keyCode.startsWith('Key') ||
      ['Space', 'Comma', 'Period', 'Slash', 'Semicolon'].includes(keyCode);


// create an efficient hash table to parse a text
export function getSupportedChars(keymap, deadkeys) {
    const charTable = {};
    const deadTable = {};

    // In case there are multiple ways of typing a singel char, this checks
    // which sequence is easier to type (examples are in Ergo‑L)
    const requiresLessEffort = (originalKeySequence, newKeySequence) => {
      const uses1DK = '**' in deadkeys
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

    const insertDeadKeySequences = (charTable, deadKeys, currentDeadKey) => {
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
    };

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
}


// XXX thsis should be part of x-keyboard
function getKeyPositionQuality(keyCode) {
  // This has to be the *stupidest* way to format code, and I love it
  const goodKeysSet = new Set([
            'KeyW', 'KeyE',                    'KeyI', 'KeyO',
    'KeyA', 'KeyS', 'KeyD', 'KeyF',    'KeyJ', 'KeyK', 'KeyL', 'Semicolon',
                            'KeyV',    'KeyM',
  ]);
  const mehKeysSet = new Set([ 'KeyC', 'KeyR', 'KeyG', 'KeyH', 'KeyU', 'Comma' ]);

    if (goodKeysSet.has(keyCode)) return 'good';
    if (mehKeysSet.has(keyCode)) return 'meh';
    return 'bad';
}


export function analyzeKeyboardLayout(
    keyboard,
    corpus,
    keyChars = getSupportedChars(keyboard.layout.keyMap, keyboard.layout.deadKeys),
    errorColor = 'rgb(127, 127, 127)'
) {
  const charToKeys = char => keyChars[char] ?? keyChars[substituteChars[char]];

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
    const ngrams = Object
      .fromEntries(NGRAM_CATEGORIES.map(bigramType => [bigramType, {}]));

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

    const realBigrams  = buildNgramDict(corpus.bigrams, 2);
    const realTrigrams = buildNgramDict(corpus.trigrams, 3);

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

    const isScissor = (kc1, kc2, finger1, finger2) => {
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

    const getBigramType = (prevKeyCode, currKeyCode) => {
      if (prevKeyCode === currKeyCode) return 'skb';

      const prevFinger = keyFinger[prevKeyCode];
      const currFinger = keyFinger[currKeyCode];

      if (currFinger === prevFinger) return 'sfb';
      if (currFinger[0] !== prevFinger[0]) return 'handChange';

      if (isScissor(currKeyCode, prevKeyCode, currFinger, prevFinger))
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

      if (prevFinger === nextFinger) {
        return prevKeyCode == nextKeyCode ? 'sks' : 'sfs';
      }

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

    for (const [ngram, { keyCodes, frequency }] of Object.entries(realBigrams)) {
      if (keyCodes.includes('Space')) continue;
      const ngramType = getBigramType(...keyCodes);
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

    return {
      ngrams,
      totalSfuSkuPerFinger,
    };
  };

  // compute the heatmap for a text on a given layout
  const computeHeatmap = () => {
    const unsupportedChars = {};
    const keyCount = {};
    let totalUnsupportedChars = 0;
    let extraKeysFrequency = 0;

    for (const [char, frequency] of Object.entries(corpus.symbols)) {
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

    // display the heatmap
    const colormap = {};
    const contrast = 6;
    const total = Object.values(corpus.symbols).reduce((acc, n) => n + acc, 0);
    const impreciseData = totalUnsupportedChars >= 0.5;
    const color = impreciseData ? errorColor : 'rgb(127, 127, 255)';

    Object.keys(keyboard.layout.keyMap).forEach(key => {
      if (key === 'Enter') return;
      const count = keyCount[key] ?? 0;
      const lvl = (contrast * count) / total;
      colormap[key] = color.replace(')',  `, ${lvl})`); // opacity
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

    return {
      loadGroups,
      unsupportedChars,
      totalUnsupportedChars,
      impreciseData,
    };
  };

  // main
  if (Object.keys(keyChars).length === 0) {
    return {};
  }
  const heatmap = computeHeatmap();
  const ngrams = computeNGrams();
  return {
    loadGroups:            heatmap.loadGroups,
    unsupportedChars:      heatmap.unsupportedChars,
    totalUnsupportedChars: heatmap.totalUnsupportedChars,
    impreciseData:         heatmap.impreciseData,
    ngrams:                ngrams.ngrams,
    totalSfuSkuPerFinger:  ngrams.totalSfuSkuPerFinger,
  };
}

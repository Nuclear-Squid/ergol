const FINGER_ASSIGNEMENTS = {
    "l5": [
        "Escape", "Backquote", "Digit1", "Tab", "KeyQ", "CapsLock", "KeyA",
        "ShiftLeft", "IntlBackslash", "KeyZ", "ControlLeft"
    ],
    "l4": [ "Digit2", "KeyW", "KeyS", "KeyX" ],
    "l3": [ "Digit3", "KeyE", "KeyD", "KeyC" ],
    "l2": [ "Digit4", "Digit5", "KeyR", "KeyT", "KeyF", "KeyG", "KeyV", "KeyB" ],
    "r2": [ "Digit6", "Digit7", "KeyY", "KeyU", "KeyH", "KeyJ", "KeyN", "KeyM" ],
    "r3": [ "Digit8", "KeyI", "KeyK", "Comma" ],
    "r4": [ "Digit9", "KeyO", "KeyL", "Period" ],
    "r5": [
        "Digit0", "Minus", "Equal", "IntlYen", "Backspace", "KeyP", "BracketLeft",
        "BracketRight", "Backslash", "Semicolon", "Quote", "Enter", "Slash",
        "IntlRo", "ShiftRight", "ContextMenu", "ControlRight"
    ]
}

const is1DFH = keyCode =>
    keyCode.startsWith('Key') ||
        ['Space', 'Comma', 'Period', 'Slash', 'Semicolon'].includes(keyCode);

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

const NGRAM_CATEGORIES = [
    // Digrams
    'sfb',             // Same Finger Bigram
    'skb',             // Same Key Bigram
    'lsb',             // Lateral Strech Bigram
    'handChange',      // Two keys typed by different hands
    'scisor',          // Roll with uncomfortable height difference between the keys
    'extendedScisor',  // scisor + lsb
    'inwardRoll',      // Roll in the pinky -> index direction
    'outwardRoll',     // Roll in the index -> pinky direction

    // Trigrams
    'redirect',        // Two rolls going in different directions
    'badRedirect',     // Redirect that doesn’t use the index
    'sfs',             // Same Finger Skipgram (sfb with other key in the middle)
    'sks',             // Same Key Skipgram (skb with other key in the middle)
    'doubleRoll', // TODO: delete this line later
    'other',           // unused, is just two simple digrams, nothing to note.
];

class ReverseKeyboardLayout {
    substituteChars = {
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

    keyChars = {};

    constructor(layout) {
        const deadTable = {};

        // In case there are multiple ways of typing a singel char, this checks
        // which sequence is easier to type (examples are in Ergo‑L)
        const requiresLessEffort = (originalKeySequence, newKeySequence) => {
            const uses1DK = '**' in layout.deadkeys
                ? keySequence => keySequence.some(key => key === this.keyChars['**'][0])
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

        function insertDeadKeySequences(table, deadKeys, currentDeadKey) {
            for (const [baseChar, outputChar] of Object.entries(deadKeys[currentDeadKey.name])) {
                if (!(baseChar in table)) continue;
                const newSequence = currentDeadKey.sequence.concat(table[baseChar]);

                if (outputChar.length === 1)
                insertInTable(table, outputChar, newSequence);
                else
                insertDeadKeySequences(table, deadKeys, {
                    "name": outputChar,
                    "sequence": newSequence,
                });
            }
        }

        for (const [keyCode, charsPerLevel] of Object.entries(layout.keymap)) {
            for (const [level, char] of charsPerLevel.entries()) {
                const sequence = [{ keyCode, level }];
                insertInTable(this.keyChars, char, sequence);
                if (char.length !== 1) insertInTable(deadTable, char, sequence);
            }
        }

        for (const [deadKey, sequence] of Object.entries(deadTable)) {
            insertDeadKeySequences(this.keyChars, layout.deadkeys, { "name": deadKey, "sequence": sequence });
        }
    }

    getKeys(symbol) {
        return this.keyChars[symbol] ?? this.keyChars[this.substituteChars[symbol]];
    }
}

function buildNGramDict(ngrammDict, layout, inverseLayout) {
    let total = 0;
    const rv = {};

    for (const [ngram, frequency] of Object.entries(ngrammDict)) {
        let nextPendingDeadKey = undefined;
        const totalKeySequence = Array.from(ngram).flatMap(s => inverseLayout.getKeys(s));

        for (const keySequence of arrayWindows(totalKeySequence, ngram.length)) {
            total += frequency;
            if (totalKeySequence.some(key => key === undefined)) continue;

            let [pendingDeadKey, name] = keySequence.reduce(([pendingDeadKey, acc], { keyCode, level }) => {
                let char = layout.keymap[keyCode][level];
                if (pendingDeadKey)
                char = layout.deadkeys[pendingDeadKey][char];

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
                const firstCharInSequence = layout.keymap[keyCode][level]
                if (firstCharInSequence.length === 1) return undefined;
                return pendingDeadKey !== undefined
                    ? layout.deadkeys[pendingDeadKey][firstCharInSequence]
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
}

function computeNGrams(digrams, trigrams) {
    const ngrams = Object.fromEntries(NGRAM_CATEGORIES.map(digramType => [digramType, {}]));

    const keyFinger = {};
    Object.entries(FINGER_ASSIGNEMENTS).forEach(([f, keys]) => {
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
            ? 'extendedScisor'
            : 'scisor';

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

        // return 'other';
        return 'doubleRoll';
    };

    const getFingerPosition = ([hand, finger]) =>
        hand === 'l' ? [0, 5 - Number(finger)] : [1, Number(finger) - 2];

    // JS, I know you suck at FP, but what the fuck is that, man??
    ngrams.totalSfuSkuPerFinger = Array(2).fill(0).map(_ =>
        Array(4).fill(0).map(_ => ({ "good": 0, "meh": 0, "bad": 0 }))
    );

    for (const [ngram, { keyCodes, frequency }] of Object.entries(digrams)) {
        if (keyCodes.includes('Space')) continue;
        const ngramType = getDigramType(...keyCodes);
        ngrams[ngramType][ngram] = frequency;

        if (ngramType === 'sfb') {
            const [groupIndex, itemIndex] = getFingerPosition(keyFinger[keyCodes[0]]);
            ngrams.totalSfuSkuPerFinger[groupIndex][itemIndex].bad += frequency;
        }

        if (ngramType === 'skb') {
            const [groupIndex, itemIndex] = getFingerPosition(keyFinger[keyCodes[0]]);
            ngrams.totalSfuSkuPerFinger[groupIndex][itemIndex].meh += frequency;
        }
    }

    for (const [ngram, { keyCodes, frequency }] of Object.entries(trigrams)) {
        if (keyCodes.includes('Space')) continue;
        const ngramType = getTrigramType(...keyCodes);
        ngrams[ngramType][ngram] = frequency;
    }

    return ngrams;
}

function computeHeatmap(symbols, inverseLayout) {
    const unsupportedChars = {};
    const keyCount = {};
    let totalUnsupportedChars = 0;
    let extraKeysFrequency = 0;

    for (const [char, frequency] of Object.entries(symbols)) {
        const keys = inverseLayout.getKeys(char)?.map(({ keyCode }) => keyCode);
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

    const getLoadGroup = fingers_array => fingers_array.map(finger => {
        const rv = { "good": 0, "meh": 0, "bad": 0 };
        finger.forEach(key => {
            const keyQuality = getKeyPositionQuality(key);
            // const normalizedFrequency = keyCount[key] * 100 / (100 + extraKeysFrequency) || 0;
            keyCount[key] = keyCount[key] * 100 / (100 + extraKeysFrequency) || 0;
            const normalizedFrequency = keyCount[key]

            rv[keyQuality] += normalizedFrequency;
        });
        return rv;
    });

    const allFingers = Object.values(FINGER_ASSIGNEMENTS);

    const res = ({
        impreciseData: totalUnsupportedChars >= 0.5,
        loadGroups: [
            getLoadGroup(allFingers.slice(0, 4)),
            getLoadGroup(allFingers.slice(-4)),
        ]
    });

    return res;
}

export function getLayoutStats(layout, corpus) {
    const inverseLayout = new ReverseKeyboardLayout(layout);

    const digrams  = buildNGramDict(corpus.digrams, layout, inverseLayout);
    const trigrams = buildNGramDict(corpus.trigrams, layout, inverseLayout);

    return {
        heatmap: computeHeatmap(corpus.symbols, inverseLayout),
        ngrams:  computeNGrams(digrams, trigrams),
    };
}

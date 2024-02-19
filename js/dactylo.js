/**
 * WebTypist v3 (preview) a.k.a. DuckTypist.
 * https://github.com/OneDeadKey/webtypist
 *
 * Copyleft (C) 2010-2024, Fabien & Léo Cazenave.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const QUACK = new Audio('quack.wav');
const MIN_PRECISION  = 98;  // percentage of correct keys
const MIN_CPM_SPEED  = 100; // characters per minute
const MIN_WIN_STREAK = 5;

const STARTING_LEVEL = 4;   // number of keys to begin with
const MIN_WORD_COUNT = 42;  // nim number or words/ngrams we want for a lesson
const ALL_30_KEYS = [
  'KeyF', 'KeyJ',
  'KeyD', 'KeyK',
  'KeyS', 'KeyL',
  'KeyA', 'Semicolon',
  'KeyE', 'KeyI',
  'KeyW', 'KeyO',
  'KeyV', 'KeyM',
  'KeyG', 'KeyH',
  'KeyQ', 'KeyP',
  'KeyR', 'KeyU',
  'KeyT', 'KeyY',
  'KeyB', 'KeyN',
  'KeyC', 'Comma',
  'KeyX', 'Period',
  'KeyZ', 'Slash',
];

window.addEventListener('DOMContentLoaded', () => {
  'use strict'; // eslint-disable-line

  const gKeyboard = document.querySelector('x-keyboard');
  const gGeometry = document.querySelector('#geometry');
  const gLayout   = document.querySelector('#layout');
  const gDict     = document.querySelector('#dict');

  const gKeyList  = document.querySelector('header .key_list');
  const gStatus   = document.querySelector('header .status');
  const gQuacks   = document.querySelector('header .quacks');
  const gLesson   = document.querySelector('#lesson');
  const gInput    = document;

  let gKeyLayout = undefined;
  let gDictionary = {
    words:    undefined,
    trigrams: undefined,
    bigrams:  undefined,
  };

  let gLessonWords     = [];
  let gLessonCurrent   = undefined;
  let gLessonStartTime = undefined;
  let gLessonLevel     = undefined;
  let gQuackCount      = undefined
  let gPendingError    = false;

  // fetch a kalamine corpus: symbols, bigrams, trigrams
  const fetchNgrams = () => {
    const ngrams = gDict.value.split(',')[0];
    return fetch(`data/corpus/${ngrams}.json`)
      .then(response => response.json())
      .then(data => {
        gDictionary.trigrams = Object.keys(data.trigrams);
        gDictionary.bigrams = Object.keys(data.digrams);
      });
  };

  // fetch MonkeyType words
  const fetchWords = () => {
    const words = gDict.value.split(',')[1];
    return fetch(`data/dicts/${words}.json`)
      .then(response => response.json())
      .then(data => {
        gDictionary.words = data.words;
      });
  };

  // fetch a kalamine keyboard layout
  const fetchLayout = () => {
    return fetch(`data/layouts/${gLayout.value}.json`)
      .then(response => response.json())
      .then(layout => {
        gKeyboard.setKeyboardLayout(layout.keymap, layout.deadkeys, gGeometry.value);
        gKeyboard.theme = 'hints';
        gKeyLayout = layout;
      });
  };

  gLayout.addEventListener('change', () => {
    window.location.hash = `${gLayout.value}`;
    init();
  });

  gDict.addEventListener('change', () => {
    localStorage.setItem('dict', gDict.value);
    Promise.all([fetchNgrams(), fetchWords()]).then(setLessonLevel);
  });

  gGeometry.addEventListener('change', event => {
    localStorage.setItem('geometry', gGeometry.value);
    gKeyboard.geometry = gGeometry.value;
  });

  gKeyList.addEventListener('click', event => {
    if (event.target.nodeName.toLowerCase() == 'kbd') {
      gLessonLevel = event.target.dataset.level;
      setLessonLevel();
    }
  });

  const setLessonLevel = () => {
    localStorage.setItem(`${gLayout.value}.level`, gLessonLevel);

    const keys = ALL_30_KEYS.slice(0, gLessonLevel);
    const rawLetters = keys.map(key => gKeyLayout.keymap[key][0]);
    const altLetters = keys.flatMap(key => gKeyLayout.keymap[key]);

    const odk = gKeyLayout.deadkeys['**'];
    const has1dk = keys.some(key => gKeyLayout.keymap[key].indexOf('**') >= 0);
    const deadkeyLetters = !has1dk ? [] :
      rawLetters
        .filter(letter => letter in odk)
        .map(letter => odk[letter]);

    const lessonLetters = rawLetters.concat(deadkeyLetters);
    const lessonFilter = word =>
      Array.from(word).every(letter => lessonLetters.indexOf(letter) >= 0);

    gLessonWords = [];
    for (const dict of [
      gDictionary.words, gDictionary.trigrams, gDictionary.bigrams, rawLetters
    ]) {
      gLessonWords = gLessonWords.concat(dict.filter(lessonFilter));
      if (gLessonWords.length > MIN_WORD_COUNT) {
        break;
      }
    }

    showQuackStatus();
    showLesson();
    showKeys();
  };

  const showKeys = () => {
    const isActive = idx => idx >= 0 && idx < gLessonLevel;

    const serializeKey = (key, idx) => {
      const action = gKeyLayout.keymap[key][0];
      const char = action === '**' ? '★' : action.slice(-1);
      const state = isActive(idx) ? '' : 'inactive';
      return `<kbd data-level="${idx + 1}" class="${state}">${char}</kbd>`;
    };
    gKeyList.innerHTML = ALL_30_KEYS.map(serializeKey).join('');

    gKeyboard.keys.forEach(key => {
      key.style.opacity = isActive(ALL_30_KEYS.indexOf(key.id)) ? 1.0 : 0.5;
    });
  };

  const showLesson = () => {
    gLessonStartTime = undefined;
    gLesson.innerHTML = '';
    if (gLessonWords.length === 0) {
      return;
    }

    let lessonText = '';
    while(lessonText.length < 120) {
      lessonText += gLessonWords[gLessonWords.length * Math.random() | 0] + ' ';
    }
    gLesson.innerHTML = Array.from(lessonText.slice(0, -1))
      .map(char => char == ' ' ? '<span class="space"></span>'
                               : `<span>${char}</span>`)
      .join('');

    gLessonCurrent = gLesson.firstElementChild;
    gLessonCurrent.id = 'current';
    gPendingError = false;
  };

  const goNextChar = value => {
    if (!gLessonCurrent) {
      return;
    }

    const correctChar = gLessonCurrent.innerText === value ||
      (value === ' ' && gLessonCurrent.innerText === '');

    if (!correctChar && !gLessonStartTime) {
      return; // ignore errors on first char
    }

    if (correctChar) {
      gLessonCurrent.classList.add(gPendingError ? 'fixed' : 'done');
      gLessonCurrent.id = '';
      gLessonCurrent = gLessonCurrent.nextSibling;
      gPendingError = false;
    } else {
      gLessonCurrent.classList.add('error');
      gPendingError = true;
    }

    if (!gLessonStartTime) { // first char?
      gLessonStartTime = performance.now()
      gStatus.innerText = '…';
    }
    if (gLessonCurrent) { // next char
      gLessonCurrent.id = 'current';
    } else { // last char, compute stats
      showLessonStatus(performance.now());
      gLessonStartTime = undefined;
    }
  };

  const showLessonStatus = (now) => {
    const elapsed = (now - gLessonStartTime) / 60000;
    const errors = gLesson.querySelectorAll('.error').length;
    const words = gLesson.querySelectorAll('.space').length + 1;
    const chars = gLesson.children.length;
    const cpm = Math.round(chars / elapsed);
    const wpm = Math.round(words / elapsed);
    const prc = 100 - Math.round(1000 * errors / chars) / 10;
    gStatus.innerText = `${wpm} wpm, ${cpm} cpm, ${prc} %`;

    if (cpm >= MIN_CPM_SPEED && prc >= MIN_PRECISION) {
      moreQuacks();
    } else {
      lessQuacks();
    }
  };

  const moreQuacks = () => {
    QUACK.play();
    gQuackCount++;

    if (gQuackCount >= MIN_WIN_STREAK) {
      gLessonLevel = 2 * (Math.floor(gLessonLevel / 2) + 1); // next even number
      gQuacks.parentNode.classList.add('active');
      gQuackCount = 1;
      setTimeout(setLessonLevel, 500);
    } else {
      setTimeout(showLesson, 500);
    }

    showQuackStatus();
  };

  const lessQuacks = () => {
    gQuackCount = Math.max(1, gQuackCount -1);
    showQuackStatus();
    setTimeout(showLesson, 500);
  };

  const showQuackStatus = () => {
    localStorage.setItem(`${gLayout.value}.quacks`, gQuackCount);
    gQuacks.parentNode.classList.remove('active');
    gQuacks.innerText = Array(gQuackCount).fill('🦆').join('');
  };

  gQuacks.addEventListener('transitionend', showQuackStatus);
  gQuacks.addEventListener('dblclick', moreQuacks); // cheat code!

  // startup
  const init = () => {
    ['layout', 'dict', 'geometry']
      .filter(id => localStorage.getItem(id))
      .forEach(id => {
        document.getElementById(id).value = localStorage.getItem(id);
      });

    const layout = window.location.hash.slice(1);
    if (layout) {
      gLayout.value = layout;
      localStorage.setItem('layout', layout);
    }

    const level  = localStorage.getItem(`${gLayout.value}.level`);
    const quacks = localStorage.getItem(`${gLayout.value}.quacks`);

    gLessonLevel = level  ? Number(level)  : STARTING_LEVEL;
    gQuackCount  = quacks ? Number(quacks) : 1;

    Promise.all([fetchNgrams(), fetchWords(), fetchLayout()])
      .then(setLessonLevel);
  };

  window.addEventListener('hashchange', init);
  init();

  /**
   * Keyboard highlighting & layout emulation
   */

  // required to work around a Chrome bug, see the `keyup` listener below
  const pressedKeys = {};

  // highlight keyboard keys and emulate the selected layout
  gInput.onkeydown = event => {
    pressedKeys[event.code] = true;
    const value = gKeyboard.keyDown(event);

    if (value) {
      goNextChar(value);
    } else {
      return true; // don't intercept special keys or key shortcuts
    }
    return false; // event has been consumed, stop propagation
  };

  gInput.addEventListener('keyup', event => {
    if (pressedKeys[event.code]) { // expected behavior
      gKeyboard.keyUp(event);
      delete pressedKeys[event.code];
    } else {
      /**
       * We got a `keyup` event for a key that did not trigger any `keydown`
       * event first: this is a known bug with "real" dead keys on Chrome.
       * As a workaround, emulate a keydown + keyup. This introduces some lag,
       * which can result in a typo (especially when the "real" dead key is used
       * for an emulated dead key) -- but there's not much else we can do.
       */
      // output.innerText += gKeyboard.keyDown(event);
      goNextChar(event.value);
      setTimeout(() => gKeyboard.keyUp(event), 100);
    }
  });

  /**
   * When pressing a "real" dead key + key sequence, Firefox and Chrome will
   * add the composed character directly to the text input (and nicely trigger
   * an `insertCompositionText` or `insertText` input event, respectively).
   * Not sure wether this is a bug or not -- but this is not the behavior we
   * want for a keyboard layout emulation. The code below works around that.
   */
  gInput.addEventListener('input', event => {
    if (
      event.inputType === 'insertCompositionText' ||
      event.inputType === 'insertText'
    ) {
      event.target.value = event.target.value.slice(0, -event.data.length);
    }
  });
});

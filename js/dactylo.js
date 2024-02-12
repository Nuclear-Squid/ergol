const g30Keys = [
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
  const gLesson   = document.querySelector('#lesson');
  const gInput    = document;

  let gKeyLayout = undefined;
  let gDictionary = undefined;

  let gLessonLevel = 12;
  let gLessonWords = [];
  let gLessonCurrent = undefined;
  let gLessonStartTime = undefined;
  let gPendingError = false;

  const setLayout = () => {
    fetch(`layouts/${gLayout.value}.json`)
      .then(response => response.json())
      .then(layout => {
        gKeyboard.setKeyboardLayout(layout.keymap, layout.deadkeys, gGeometry.value);
        gKeyboard.theme = 'hints';
        gKeyLayout = layout;
        setLessonLevel();
      });
  };

  const setDict = () => {
    fetch(`dicts/${gDict.value}.json`)
      .then(response => response.json())
      .then(data => {
        gDictionary = data.words;
        setLessonLevel();
      });
  };

  gLayout.addEventListener('change', setLayout);
  setLayout();

  gDict.addEventListener('change', setDict);
  setDict();

  gGeometry.addEventListener('change', event => {
    gKeyboard.geometry = gGeometry.value;
  });

  gKeyList.addEventListener('click', event => {
    if (event.target.nodeName.toLowerCase() == 'kbd') {
      setLessonLevel(event.target.dataset.level);
    }
  });

  const setLessonLevel = (level = gLessonLevel) => {
    if (!gKeyLayout || !gDictionary) {
      return;
    }

    const keys = g30Keys.slice(0, level);
    const rawLetters = keys.flatMap(key => gKeyLayout.keymap[key]);

    const odk = gKeyLayout.deadkeys['**'];
    const has1dk = keys.some(key => gKeyLayout.keymap[key].indexOf('**') >= 0);
    const lessonLetters = rawLetters.concat(!has1dk ? [] :
      rawLetters.flatMap(letter => (letter in odk ? [odk[letter]] : [])));

    // XXX we **definitely** need a progress bar here
    gLessonLevel = level;
    gLessonWords = gDictionary.filter(word => {
      for (const letter of word) {
        if (lessonLetters.indexOf(letter) < 0) {
          return false;
        }
      }
      return true;
    });
    console.log(gLessonWords);

    showLesson();
    showKeys();
  };

  const showKeys = () => {
    gKeyList.innerHTML = '';
    let level = 0;
    for (let char of g30Keys.map(key => gKeyLayout.keymap[key][0])) {
      if (char.length > 1) {
        if (char = "**") {
          char = "★";
        } else {
          char = char.slice(1);
        }
      }
      const className = gKeyList.children.length < gLessonLevel ? '' : 'inactive';
      gKeyList.innerHTML +=
        `<kbd class='${className}' data-level="${++level}">${char}</kbd>`;
    }
  };

  const showLesson = () => {
    let lesson_text = '';
    while(lesson_text.length < 120) {
      lesson_text += gLessonWords[gLessonWords.length * Math.random() | 0] + ' ';
    }
    gLesson.innerHTML = '';
    for (const char of lesson_text.slice(0, -1)) {
      gLesson.innerHTML += (char == ' ') ?
        '<span class="space"></span>' : `<span>${char}</span>`;
    }
    gLessonCurrent = gLesson.firstElementChild;
    gPendingError = false;
  };

  const goNextChar = value => {
    if (!gLessonCurrent) {
      return;
    }

    if ((gLessonCurrent.innerText === value) ||
        (gLessonCurrent.innerText === '' && value === ' ')) {
      gLessonCurrent.className += gPendingError ? ' error' : ' done';
      gLessonCurrent = gLessonCurrent.nextSibling;
      gPendingError = false;
    } else {
      gPendingError = true;
    }

    // first char?
    if (!gLessonStartTime) {
      gLessonStartTime = performance.now()
      gStatus.innerText = '🦆';
    }

    // last char?
    if (!gLessonCurrent) {
      const elapsed = (performance.now() - gLessonStartTime) / 60000;
      const errors = gLesson.querySelectorAll('.error').length;
      const words = gLesson.querySelectorAll('.space').length + 1;
      const chars = gLesson.children.length;
      const cpm = Math.round(chars / elapsed);
      const wpm = Math.round(words / elapsed);
      const err = Math.round(1000 * errors / chars) / 10;
      gStatus.innerText = `${wpm} wpm, ${cpm} cpm, ${100 - err} %`;
      gLessonStartTime = undefined;
      setTimeout(showLesson, 500);
    }
  };

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

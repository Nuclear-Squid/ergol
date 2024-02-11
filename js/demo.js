window.addEventListener('DOMContentLoaded', () => {
  'use strict'; // eslint-disable-line

  const keyboard = document.querySelector('x-keyboard');
  const button   = document.querySelector('button');
  const input    = document.querySelector('input');
  const geometry = document.querySelector('select');

  if (!keyboard.layout) {
    console.warn('web components are not supported');
    return; // the web component has not been loaded
  }

  const getGeometry = () => geometry.value.split(' ')[1];

  fetch(keyboard.getAttribute('src'))
    .then(response => response.json())
    .then(data => {
      const shape = geometry.value.split(' ')[1];
      keyboard.setKeyboardLayout(data.keymap, data.deadkeys, getGeometry());
      geometry.value = shape;
      button.hidden = false;
      button.focus();
    });

  geometry.addEventListener('change', event => {
    keyboard.geometry = getGeometry();
  });

  /**
   * Open/Close modal
   */
  const open = () => {
    document.body.classList.add('demo');
    demo.hidden = false;
    input.value = '';
    input.focus();
  }
  const close = () => {
    keyboard.clearStyle()
    document.body.classList.remove('demo');
    demo.hidden = true;
  }
  button.onclick = open;
  demo.onclick = (event) => {
    if (event.target.id === 'demo') {
      close();
    }
  };

  /**
   * Keyboard highlighting & layout emulation
   */

  // required to work around a Chrome bug, see the `keyup` listener below
  const pressedKeys = {};

  // highlight keyboard keys and emulate the selected layout
  input.onkeydown = event => {
    pressedKeys[event.code] = true;
    const value = keyboard.keyDown(event);

    if (value) {
      event.target.value += value;
    } else if (event.code === 'Enter') { // clear text input on <Enter>
      event.target.value = '';
    } else if ((event.code === 'Tab') || (event.code === 'Escape')) {
      setTimeout(close, 100);
    } else {
      return true; // don't intercept special keys or key shortcuts
    }
    return false; // event has been consumed, stop propagation
  };

  input.addEventListener('keyup', event => {
    if (pressedKeys[event.code]) {
      // expected behavior
      keyboard.keyUp(event);
      delete pressedKeys[event.code];
    } else {
      /**
       * We got a `keyup` event for a key that did not trigger any `keydown`
       * event first: this is a known bug with "real" dead keys on Chrome.
       * As a workaround, emulate a keydown + keyup. This introduces some lag,
       * which can result in a typo (especially when the "real" dead key is used
       * for an emulated dead key) -- but there's not much else we can do.
       */
      event.target.value += keyboard.keyDown(event);
      setTimeout(() => keyboard.keyUp(event), 100);
    }
  });

  /**
   * When pressing a "real" dead key + key sequence, Firefox and Chrome will
   * add the composed character directly to the text input (and nicely trigger
   * an `insertCompositionText` or `insertText` input event, respectively).
   * Not sure wether this is a bug or not -- but this is not the behavior we
   * want for a keyboard layout emulation. The code below works around that.
   */
  input.addEventListener('input', event => {
    if (
      event.inputType === 'insertCompositionText' ||
      event.inputType === 'insertText'
    ) {
      event.target.value = event.target.value.slice(0, -event.data.length);
    }
  });
});

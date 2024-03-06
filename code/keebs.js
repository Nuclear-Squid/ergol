/**
 *  <div class="keyboard">
 *    <object data="/img/ergol.svg"></object>
 *    <p>
 *      <span>powered by <a
 *        href="https://github.com/OneDeadKey/x-keyboard">x-keyboard</a></span>
 *      <small>géométrie :</small>
 *      <select>
 *        <option value="dk iso intlBackslash am">       ISO-A </option>
 *        <option value="dk iso intlBackslash" selected> ISO   </option>
 *        <option value="dk ansi">                       ANSI  </option>
 *        <option value="dk ol60 ergo">                  TMx   </option>
 *        <option value="dk ol50 ergo">                  4×6   </option>
 *        <option value="dk ol40 ergo">                  3×6   </option>
 *      </select>
 *    </p>
 *    <dialog>
 *      <input></input>
 *      <x-keyboard></x-keyboard>
 *    </dialog>
 *  </div>
 */

window.addEventListener('DOMContentLoaded', () => {
  'use strict'; // eslint-disable-line

for (const keeb of document.querySelectorAll('.keyboard')) {
    console.log(keeb);

  const dialog   = keeb.querySelector('dialog');
  const keyboard = keeb.querySelector('x-keyboard');
  const preview  = keeb.querySelector('object');
  const input    = keeb.querySelector('input');
  const geometry = keeb.querySelector('select') || document.getElementById('geometry');
  const button   = keeb.querySelector('button');

  const getGeometry = () => geometry.value.split(' ')[1];
  geometry.addEventListener('change', () => {
    keyboard.geometry = getGeometry();
  });

  preview?.addEventListener('load', () => {
    const svg = preview.contentDocument.documentElement;
    const applyGeometry = event => {
      svg.setAttribute('class', geometry.value);
    };
    geometry.selectedIndex = 1;
    applyGeometry();
  });

  fetch(keyboard.getAttribute('src'))
    .then(response => response.json() )
    .then(data => {
      const shape = getGeometry();
      keyboard.setKeyboardLayout(data.keymap, data.deadkeys, shape);
      if (button) button.disabled = false;
    });

  if (!keyboard.layout) {
    console.warn('web components are not supported');
    return; // the web component has not been loaded
  }

  if (!input) {
    return;
  }

  /**
   * Open/Close modal
   */
  if (button) button.onclick = () => {
    dialog?.showModal();
    input.value = '';
    input.focus();
  }
  input.onblur = () => {
    keyboard.clearStyle()
    dialog?.close();
  }

  /**
   * Keyboard highlighting & layout emulation
   */

  // required to work around a Chrome bug, see the `keyup` listener below
  const pressedKeys = {};

  // highlight keyboard keys and emulate the selected layout
  input.onkeydown = event => {
    pressedKeys[event.code] = true;
    const value = keyboard.keyDown(event);

    if (event.code === 'Enter') {
      event.target.value = '';
    } else if (value) { // clear text input on <Enter>
      event.target.value += value;
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
}

});

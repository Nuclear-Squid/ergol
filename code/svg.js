window.addEventListener('DOMContentLoaded', () => {
  'use strict'; // eslint-disable-line

  const keyboard = document.querySelector('.keyboard img');
  const geometry = document.querySelector('.keyboard select');

  fetch(keyboard.getAttribute('src'))
    .then(response => response.text())
    .then(data => {
      keyboard.outerHTML = data;
      geometry.innerHTML = `
        <option value="dk iso intlBackslash am">       ISO-A </option>
        <option value="dk iso intlBackslash" selected> ISO   </option>
        <option value="dk ansi">                       ANSI  </option>
        <option value="dk ol60 ergo">                  TMx   </option>
        <option value="dk ol50 ergo">                  4×6   </option>
        <option value="dk ol40 ergo">                  3×6   </option>
      `;
      const svg = document.querySelector('.keyboard svg');
      geometry.addEventListener('change', event => {
        svg.setAttribute('class', event.target.value);
      });
    });

});

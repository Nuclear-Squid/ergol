import { getSupportedChars, analyzeKeyboardLayout } from './layout-analyzer.js';

window.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('input');
  const keyboard   = document.querySelector('x-keyboard');

  const headingColor = getComputedStyle(document.querySelector('h1')).color;

  let corpusName = '';
  let corpus = {};
  let keyChars = {};
  let impreciseData = false;

  // display a percentage value
  const fmtPercent = (num, p) => `${Math.round(10 ** p * num) / 10 ** p}%`;
  const showPercent = (sel, num, precision) => {
    document.querySelector(sel).innerText = fmtPercent(num, precision);
  };
  const showPercentAll = (sel, nums, precision) => {
    document.querySelector(sel).innerText =
      nums.map(value => fmtPercent(value, precision)).join(' / ');
  };

  const showNGrams = (ngrams) => {
    const sum = dict => Object.entries(dict).reduce((acc, [_, e]) => acc + e, 0);

    showPercent('#sfu-total',        sum(ngrams.sfb),         2);
    showPercent('#sku-total',        sum(ngrams.skb),         2);

    showPercent('#sfu-all',          sum(ngrams.sfb),         2);
    showPercent('#extensions-all',   sum(ngrams.lsb),         2);
    showPercent('#scissors-all',     sum(ngrams.scissor),     2);

    showPercent('#inward-all',       sum(ngrams.inwardRoll),  1);
    showPercent('#outward-all',      sum(ngrams.outwardRoll), 1);
    showPercent('#sku-all',          sum(ngrams.skb),         2);

    showPercent('#sks-all',          sum(ngrams.sks),         1);
    showPercent('#sfs-all',          sum(ngrams.sfs),         1);
    showPercent('#redirect-all',     sum(ngrams.redirect),    1);
    showPercent('#bad-redirect-all', sum(ngrams.badRedirect), 2);

    const achoppements = document.querySelector('#achoppements collapsable-table');
    achoppements.updateTableData('#sfu-bigrams',    ngrams.sfb,         2);
    achoppements.updateTableData('#extended-rolls', ngrams.lsb,         2);
    achoppements.updateTableData('#scissors',       ngrams.scissor,     2);

    const bigrammes = document.querySelector('#bigrammes collapsable-table');
    bigrammes.updateTableData('#sku-bigrams',       ngrams.skb,         2);
    bigrammes.updateTableData('#inward',            ngrams.inwardRoll,  2);
    bigrammes.updateTableData('#outward',           ngrams.outwardRoll, 2);

    const trigrammes = document.querySelector('#trigrammes collapsable-table');
    trigrammes.updateTableData('#sks',              ngrams.sks,         2);
    trigrammes.updateTableData('#sfs',              ngrams.sfs,         2);
    trigrammes.updateTableData('#redirect',         ngrams.redirect,    2);
    trigrammes.updateTableData('#bad-redirect',     ngrams.badRedirect, 2);
  };

  const showReport = () => {
    const report = analyzeKeyboardLayout(keyboard, corpus, keyChars, headingColor);

    document.querySelector('#sfu stats-canvas').renderData({
      values: report.totalSfuSkuPerFinger,
      maxValue: 4,
      precision: 2,
      flipVertically: true,
      detailedValues: true,
    });

    document.querySelector('#load stats-canvas').renderData({
      values: report.loadGroups,
      maxValue: 25,
      precision: 1
    });

    const sumUpBar = bar => bar.good + bar.meh + bar.bad;
    const sumUpBarGroup = group => group.reduce((acc, bar) => acc + sumUpBar(bar), 0);

    showPercentAll('#load small', report.loadGroups.map(sumUpBarGroup), 1);
    showPercent('#unsupported-all', report.totalUnsupportedChars, 3);

    document.querySelector('#imprecise-data').style.display
      = report.impreciseData ? 'block' : 'none';

    document
      .querySelector('#achoppements collapsable-table')
      .updateTableData('#unsupported', report.unsupportedChars, 3);

    showNGrams(report.ngrams);
  };

  // keyboard state: these <select> element IDs match the x-keyboard properties
  // -- but the `layout` property requires a JSON fetch
  const IDs = ['layout', 'geometry', 'corpus'];
  const setProp = (key, value) => {
    if (key === 'layout') {
      if (value) {
        const layoutFolder = document
          .querySelector(`#layout option[value="${value}"]`).dataset.folder;
        fetch(`../keymaps/${layoutFolder}/${value}.json`)
          .then(response => response.json())
          .then(data => {
            const selectedOption = document
              .querySelector('#layout option:checked')
              .textContent.trim() || value;
            inputField.placeholder = `zone de saisie ${selectedOption}`;
            keyboard.setKeyboardLayout(
              data.keymap,
              data.deadkeys,
              data.geometry.replace('ergo', 'iso'),
            );
            data.keymap.Enter = ['\r', '\n'];
            keyChars = getSupportedChars(data.keymap, data.deadkeys);
            showReport();
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
            corpus = data;
            showReport();
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
    const hash = window.location.hash || '/ergol//en+fr';
    const hashState = hash.split('/').slice(1);
    IDs.forEach((key, i) => {
      setProp(key, hashState[i] || '');
      state[key] = hashState[i] || '';
    });
  };
  IDs.forEach(key => {
    document
      .getElementById(key)
      .addEventListener('change', event => {
        updateHashState(key, event.target.value);
      });
  });
  window.addEventListener('hashchange', applyHashState);
  applyHashState();
});

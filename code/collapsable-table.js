class CollapsableTable extends HTMLElement {
  maxLinesCollapsed = 12;

  // Elements built in constructor
  expandButton = undefined;
  maxHeightCollapsed = undefined;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Stupid hack to get the height of a 'tr' element
    const tableRowElement = document.createElement('tr');
    tableRowElement.innerHTML = 'random placeholder text';
    shadow.appendChild(tableRowElement);
    this.maxHeightCollapsed =
      this.maxLinesCollapsed * tableRowElement.offsetHeight;

    const tableIds = this.getAttribute('table-ids').split(' ');

    const spans = tableIds.map(id => `<span id=${id}></span>`).join(' / ');
    const tables = tableIds.map(id => `<table id=${id}></table>`).join('');

    shadow.innerHTML = `
      <style>
      /* Mostly copy-pasted from '/css/heatmap.css', with some ajustments */
      h3 { border-bottom: 1px dotted; }

      #header {
        text-align: right;
        margin-top: -1em;
      }

      #wrapper {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
      }

      small {
        display: block;
        text-align: right;
        margin-top: -1em;
      }

      table {
        display: flex;
        flex-direction: column;
        font-size: small;
        table-layout: fixed;
      }

      th { font-weight: normal; }
      td:nth-child(1) { width: 2em; text-align: center; }
      td:nth-child(2) { width: 4em; text-align: right; }

      button {
        width: 30%;
        margin: auto;
        background-color: #88fa;
        border: 1px solid black;
        border-radius: 15px;
      }
      </style>

      <h3> ${this.id} </h3>
      <small> ${spans} </small>
      <div id='wrapper' style='max-height: ${this.maxHeightCollapsed}px;'> ${tables} </div>
      <button> ⇊ </button>
    `;

    // Setting up the `see more` button
    // Using 'function' to set 'this' to the button (self is the web component)
    const self = this;
    shadow.querySelector('button').addEventListener('click', function () {
      const wrapper = shadow.getElementById('wrapper');
      if (wrapper.style.maxHeight == `${self.maxHeightCollapsed}px`) {
        wrapper.style.maxHeight = `${wrapper.children[0].offsetHeight}px`;
        this.innerText = '⇈';
      } else {
        wrapper.style.maxHeight = `${self.maxHeightCollapsed}px`;
        this.innerText = '⇊';
      }
    });
  }

  updateTableData(id, title, values, precision = 3) {
    const total = this.shadowRoot.querySelector(`small #${id}`);
    const table = this.shadowRoot.querySelector(`#wrapper #${id}`);

    table.innerHTML =
      `<tr><th colspan='2'>${title}</td></tr>` +
      Object.entries(values)
        .filter(([digram, freq]) => freq >= 10 ** -precision)
        .sort(([_, freq1], [__, freq2]) => freq2 - freq1)
        .map(
          ([digram, freq]) =>
            `<tr><td>${digram}</td><td>${freq.toFixed(precision)}</td></tr>`,
        )
        .join('');

    total.innerText =
      Object.values(values)
        .reduce((e, acc) => e + acc, 0)
        .toFixed(precision)
     + '%';

    this.shadowRoot.querySelector('button').style.display =
      table.offsetHeight > this.maxHeightCollapsed ? 'block' : 'none';
  }
}
customElements.define('collapsable-table', CollapsableTable);

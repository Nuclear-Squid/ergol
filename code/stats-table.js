class StatsTable extends HTMLElement {
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

    // Actually build the content of the element (+ remove the stupid tr)
    shadow.innerHTML = `
      <style>
      #wrapper {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
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
        width: 20%;
        height: 1.5em;
        margin: auto;
        background-color: #88fa;
        cursor: pointer;
        clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
      }
      button.showLess {
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
      }
      </style>

      <!-- Using a style attribute on top of the stylesheet, as it is used by
           the button 'click' event-listner -->
      <div id='wrapper' style='max-height: ${this.maxHeightCollapsed}px;'></div>
      <button style='display: none'></button>
    `;

    const wrapper = shadow.getElementById('wrapper');
    wrapper.innerHTML = this.innerHTML;
    this.innerHTML = ''; // Remove original content

    // Setting up the `see more` button
    // Using 'function' to set 'this' to the button (self is the web component)
    const self = this;
    shadow.querySelector('button').addEventListener('click', function () {
      const wrapper = shadow.getElementById('wrapper');
      if (wrapper.style.maxHeight == `${self.maxHeightCollapsed}px`) {
        wrapper.style.maxHeight = `${wrapper.children[0].offsetHeight}px`;
        this.className = 'showLess';
      } else {
        wrapper.style.maxHeight = `${self.maxHeightCollapsed}px`;
        this.className = '';
      }
    });
  }

  updateTableData(tableSelector, values, precision) {
    const table = this.shadowRoot.querySelector(tableSelector);

    table.innerHTML =
      `<tr><th colspan='2'>${table.title}</td></tr>` +
      Object.entries(values)
        .filter(([digram, freq]) => freq >= 10 ** -precision)
        .sort(([_, freq1], [__, freq2]) => freq2 - freq1)
        .map(
          ([digram, freq]) =>
            `<tr><td>${digram}</td><td>${freq.toFixed(precision)}</td></tr>`,
        )
        .join('');

    this.shadowRoot.querySelector('button').style.display =
      table.offsetHeight > this.maxHeightCollapsed ? 'block' : 'none';
  }
}

customElements.define('stats-table', StatsTable);

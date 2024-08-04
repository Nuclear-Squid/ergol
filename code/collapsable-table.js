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

    // Actually build the content of the element (+ remove the stupid tr)
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
      <!-- Using a style attribute on top of the stylesheet, as it is used by
           the button 'click' event-listner -->
      <div id='wrapper' style='max-height: ${this.maxHeightCollapsed}px;'></div>
      <button style='display: none'> show more </button>
    `;

    // If we find a 'small' element, then move it in a '#header' div instead of
    // the '#wrapper' div. A 'slot' is probably better, but I can’t make it work
    const smallElement = this.querySelector('small');
    const wrapper = shadow.getElementById('wrapper');
    if (smallElement) {
      // Placing the 'small' element in a wrapper div, otherwise the 'text-align'
      // and 'margin-top' css properties don’t do anything.
      const smallElementWrapper = document.createElement('div');
      smallElementWrapper.id = 'header';
      smallElementWrapper.appendChild(smallElement.cloneNode(true));

      shadow.insertBefore(smallElementWrapper, wrapper);
      // Remove the 'small' element from this.innerHTML, before moving that to shadow
      smallElement.remove();
    }

    wrapper.innerHTML = this.innerHTML;
    this.innerHTML = ''; // Remove original content

    // Setting up the `see more` button
    // Using 'function' to set 'this' to the button (self is the web component)
    const self = this;
    shadow.querySelector('button').addEventListener('click', function () {
      const wrapper = shadow.getElementById('wrapper');
      if (wrapper.style.maxHeight == `${self.maxHeightCollapsed}px`) {
        wrapper.style.maxHeight = `${wrapper.children[0].offsetHeight}px`;
        this.innerText = 'show less';
      } else {
        wrapper.style.maxHeight = `${self.maxHeightCollapsed}px`;
        this.innerText = 'show more';
      }
    });
  }

  updateTableData(tableSelector, title, values, precision) {
    const table = this.shadowRoot.querySelector(tableSelector);

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

    this.shadowRoot.querySelector('button').style.display =
      table.offsetHeight > this.maxHeightCollapsed ? 'block' : 'none';
  }
}
customElements.define('collapsable-table', CollapsableTable);

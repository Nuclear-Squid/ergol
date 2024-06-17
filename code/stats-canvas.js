class StatsCanvas extends HTMLElement {

  constructor() {
    super();

    this.colors = {
      "good": '#88f',
      "meh" : '#fc3',
      "bad" : '#f96',
    };

    this.totalWidth = 800
    this.columnWidth = this.totalWidth / 11;
    this.columnPadding = 8;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        table {
          font-size: small;
          text-align: center;
        }

        td {
          padding: 0;
          width: ${this.columnWidth}px;
        }

        td#empty {
          padding: 0;
          width: ${this.columnWidth / 2}px;
        }
      </style>
    `;

    const canvas = document.createElement('canvas');
    canvas.width = this.totalWidth;
    canvas.height = 120;

    shadow.appendChild(canvas);
    shadow.appendChild(document.createElement('table'));
  }

  // Values is an array of array of objects with `good`, `meh`, and `bad`
  // fields, all of them are `Numbers`.
  renderData(values, maxValue) {
    const table = this.shadowRoot.querySelector('table');
    const canvas = this.shadowRoot.querySelector('canvas');
    const canvasContext = canvas.getContext('2d');

    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    const nbColumns = values.map(group => group.length).reduce((acc, e) => acc + e, 0);
    const nbSeparators = values.length - 1;
    this.columnWidth = this.totalWidth / (nbColumns + nbSeparators / 2);

    const scale = canvas.height / maxValue;

    const renderBarPart = (groupIndex, columnIndex, column) => {
      let renderedBarHeight = 0;

      for (const [quality, color] of Object.entries(this.colors)) {
        canvasContext.fillStyle = color;
        renderedBarHeight += column[quality];

        const startPosX =
            groupIndex * this.columnWidth / 2
          + columnIndex * this.columnWidth + this.columnPadding / 2;

        const startPosY = canvas.height - renderedBarHeight * scale;
        const width = this.columnWidth - this.columnPadding;
        const height = column[quality] * scale;

        canvasContext.fillRect(startPosX, startPosY, width, height);
      }
    };

    const totalLoad = column => {
      const sum = column.good + column.meh + column.bad;
      return `${sum.toFixed(1)}%`;
    };

    canvasContext.save();
    let absoluteColumnIndex = 0;

    values.forEach((group, groupIndex) => {
      group.forEach(column => renderBarPart(groupIndex, absoluteColumnIndex++, column));
    });

    const tableEntries = values.map(group =>
      group.map(column => `<td>${totalLoad(column)}</td>`).join('')
    ).join(`<td id="empty"></td>`);

    table.innerHTML = `<tr>${tableEntries}</tr>`;

    canvasContext.restore();
  }
}
customElements.define('stats-canvas', StatsCanvas)

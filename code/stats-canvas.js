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

  renderData({
    // An array of array of objects with `good`, `meh`, and `bad` fields
    // (all of them are `Numbers`). Padding is added betweer the inner arrays
    values,
    // Which value should correspond to 100% height in the bar chart
    maxValue,
    // Number of decimals shown in the percentages below the bar chart
    precision,
    // If true: flips the order in which values are shown
    // (`bad goes at the bottom, when it’s at the top normally).
    flipVertically = false,
    // If true: shows the value of each field separately below the bar chart, instead
    // of the total. (Rows filled with 0 are ignored).
    detailedValues = false
  }={}) {
    const table = this.shadowRoot.querySelector('table');
    const canvas = this.shadowRoot.querySelector('canvas');
    const canvasContext = canvas.getContext('2d');

    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    const nbColumns = values.map(group => group.length).reduce((acc, e) => acc + e, 0);
    const nbSeparators = values.length - 1;
    this.columnWidth = this.totalWidth / (nbColumns + nbSeparators / 2);

    const scale = canvas.height / maxValue;

    const renderBarPart = (groupIndex, columnIndex, column, flipVerically) => {
      let renderedBarHeight = 0;

      const colors = Object.entries(this.colors);
      if (flipVertically) colors.reverse();

      for (const [quality, color] of colors) {
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

    const sumUpBar = bar => bar.good + bar.meh + bar.bad;
    const fmtPercent = (num, p) => `${Math.round(10 ** p * num) / 10 ** p}%`;

    canvasContext.save();
    let absoluteColumnIndex = 0;

    values.forEach((group, groupIndex) => {
      group.forEach(column => renderBarPart(groupIndex, absoluteColumnIndex++, column, flipVertically));
    });

    // Takes in an Array of Array of Numbers, outputs a table row
    const renderTableRow = row => {
      const rowContents =
        row.map(group =>
          group.map(item => `<td>${item}</td>`).join('')
        ).join('<td id="empty"></td>')

      return `<tr>${rowContents}</tr>`;
    };

    if (detailedValues) {
      const extractQuality = (values, quality) =>
        values.map(group => group.map(bar => bar[quality]));

      const notAllZeros = row => row.some(group => group.some(item => item != 0));

      const qualities = Object.keys(this.colors);
      if (!flipVertically) qualities.reverse();

      table.innerHTML =
        qualities
          .map(q => extractQuality(values, q))
          .filter(notAllZeros)
          .map(row => row.map(group => group.map(item => fmtPercent(item, precision))))
          .map(renderTableRow)
          .join('');
    }
    else {
      table.innerHTML = renderTableRow(
        values.map(group => group.map(bar => fmtPercent(sumUpBar(bar), precision)))
      );
    }

    canvasContext.restore();
  }
}
customElements.define('stats-canvas', StatsCanvas)

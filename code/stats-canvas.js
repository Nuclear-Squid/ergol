class StatsCanvas extends HTMLElement {

  constructor() {
    super();

    this.colors = {
      "good": '#88f',
      "meh" : '#fc3',
      "bad" : '#f96',
    };

    this.totalWidth = 800
    this.totalHeight = 120
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

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // svg.setAttribute('width', this.totalWidth);
    svg.setAttribute('width', "auto");
    svg.setAttribute('height', this.totalHeight);
    svg.setAttribute('viewBox', `0 0 ${this.totalWidth} ${this.totalHeight}`);

    shadow.appendChild(svg);
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
    const svg = this.shadowRoot.querySelector('svg');

    // Clear SVG
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const nbColumns = values.map(group => group.length).reduce((acc, e) => acc + e, 0);
    const nbSeparators = values.length - 1;
    this.columnWidth = this.totalWidth / (nbColumns + nbSeparators / 2);

    const scale = this.totalHeight / maxValue;

    const renderBarPart = (groupIndex, columnIndex, column, flipVerically) => {
      let renderedBarHeight = 0;

      const colors = Object.entries(this.colors);
      if (flipVertically) colors.reverse();

      for (const [quality, color] of colors) {
        renderedBarHeight += column[quality];

        const startPosX =
            groupIndex * this.columnWidth / 2
          + columnIndex * this.columnWidth + this.columnPadding / 2;

        const startPosY = this.totalHeight - renderedBarHeight * scale;
        const width = this.columnWidth - this.columnPadding;
        const height = column[quality] * scale;

        const barPart = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        barPart.setAttribute('x', startPosX);
        barPart.setAttribute('width', width);
        barPart.setAttribute('y', startPosY);
        barPart.setAttribute('height', height);
        barPart.setAttribute('fill', color);
        const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = quality;
        barPart.appendChild(title);
        svg.appendChild(barPart);
      }
    };

    const sumUpBar = bar => bar.good + bar.meh + bar.bad;
    // Format percentage according to locale; use fixed precision to align numbers
    const fmtPercent = (num, p) => Intl.NumberFormat(
      undefined,
      {
        minimumFractionDigits: p,
        maximumFractionDigits: p,
        style: "unit",
        unit: "percent",
      }
    ).format(num);

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
  }
}
customElements.define('stats-canvas', StatsCanvas)

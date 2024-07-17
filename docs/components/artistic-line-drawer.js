class ArtisticLineDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <div class="container">
        <h1>Artistic Line Drawer</h1>
        <div class="controls">
          <div>
            <label for="numLines">Number of Lines:</label>
            <input type="range" id="numLines" min="1" max="1000" value="100">
          </div>
          <div>
            <label for="maxLineLength">Max Line Length:</label>
            <input type="range" id="maxLineLength" min="1" max="1000" value="50">
          </div>
          <div>
            <label for="maxLineWidth">Max Line Width:</label>
            <input type="range" id="maxLineWidth" min="1" max="100" value="5">
          </div>
          <div>
            <label for="colorScheme">Color Scheme:</label>
            <select id="colorScheme">
              <option value="random">Random</option>
              <option value="monochrome">Monochrome</option>
              <option value="warm">Warm</option>
              <option value="cool">Cool</option>
              <option value="pastel">Pastel</option>
            </select>
          </div>
          <button id="drawButton">Draw</button>
          <button id="downloadButton">Download Image</button>
        </div>
        <canvas id="canvas" width="800" height="800"></canvas>
      </div>
      <style>
        ${this.getStyle()}
      </style>
    `;

    this.canvas = this.shadowRoot.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");

    this.numLinesInput = this.shadowRoot.querySelector("#numLines");
    this.maxLineLengthInput = this.shadowRoot.querySelector("#maxLineLength");
    this.maxLineWidthInput = this.shadowRoot.querySelector("#maxLineWidth");
    this.colorSchemeInput = this.shadowRoot.querySelector("#colorScheme");
    this.drawButton = this.shadowRoot.querySelector("#drawButton");
    this.downloadButton = this.shadowRoot.querySelector("#downloadButton");

    this.drawButton.addEventListener("click", () => this.drawLines());
    this.downloadButton.addEventListener("click", () => this.downloadImage());

    this.numLinesInput.addEventListener("input", () => this.drawLines());
    this.maxLineLengthInput.addEventListener("input", () => this.drawLines());
    this.maxLineWidthInput.addEventListener("input", () => this.drawLines());
    this.colorSchemeInput.addEventListener("input", () => this.drawLines());

    this.drawLines(); // 初期描画
  }

  getStyle() {
    return `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }

      canvas {
        border: 1px solid black;
        margin-top: 20px;
      }

      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .controls div {
        margin: 5px;
      }

      .controls label {
        margin-right: 10px;
      }

      button {
        padding: 10px 20px;
        background-color: #4a90e2;
        border: none;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-top: 10px;
      }

      button:hover {
        background-color: #357ab8;
      }
    `;
  }

  drawLines() {
    const numLines = Number(this.numLinesInput.value);
    const maxLineLength = Number(this.maxLineLengthInput.value);
    const maxLineWidth = Number(this.maxLineWidthInput.value);
    const colorScheme = this.colorSchemeInput.value;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const width = this.canvas.width;
    const height = this.canvas.height;

    for (let i = 0; i < numLines; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = Math.random() * maxLineLength;
      const angle = Math.random() * 2 * Math.PI;
      const lineWidth = Math.random() * maxLineWidth;
      const color = this.getRandomColor(colorScheme);

      const x2 = x + length * Math.cos(angle);
      const y2 = y + length * Math.sin(angle);

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x2, y2);
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      this.ctx.lineCap = "round";
      this.ctx.stroke();
    }
  }

  getRandomColor(scheme) {
    if (scheme === "monochrome") {
      const shade = Math.floor(Math.random() * 256);
      return `rgb(${shade}, ${shade}, ${shade})`;
    } else if (scheme === "warm") {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 128);
      const b = Math.floor(Math.random() * 128);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (scheme === "cool") {
      const r = Math.floor(Math.random() * 128);
      const g = Math.floor(Math.random() * 128);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (scheme === "pastel") {
      const r = Math.floor(Math.random() * 128 + 127);
      const g = Math.floor(Math.random() * 128 + 127);
      const b = Math.floor(Math.random() * 128 + 127);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  downloadImage() {
    const link = document.createElement("a");
    link.download = "artistic-lines.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

customElements.define("artistic-line-drawer", ArtisticLineDrawer);

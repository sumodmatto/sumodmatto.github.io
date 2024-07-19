class GeometricPatternFiller extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
          <div class="container">
            <h1>Geometric Pattern Filler</h1>
            <div class="controls">
              <div>
                <label for="patternType">Pattern Type:</label>
                <select id="patternType">
                  <option value="triangles">Triangles</option>
                  <option value="rectangles">Rectangles</option>
                  <option value="circles">Circles</option>
                </select>
              </div>
              <div>
                <label for="numShapes">Number of Shapes:</label>
                <input type="range" id="numShapes" min="50" max="500" value="200">
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

    this.patternTypeInput = this.shadowRoot.querySelector("#patternType");
    this.numShapesInput = this.shadowRoot.querySelector("#numShapes");
    this.colorSchemeInput = this.shadowRoot.querySelector("#colorScheme");
    this.drawButton = this.shadowRoot.querySelector("#drawButton");
    this.downloadButton = this.shadowRoot.querySelector("#downloadButton");

    this.drawButton.addEventListener("click", () => this.drawPattern());
    this.downloadButton.addEventListener("click", () => this.downloadImage());

    this.numShapesInput.addEventListener("input", () => this.drawPattern());
    this.patternTypeInput.addEventListener("input", () => this.drawPattern());
    this.colorSchemeInput.addEventListener("input", () => this.drawPattern());

    this.drawPattern(); // Draw initial pattern
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
            margin-top: 10px; /* Add margin to separate buttons */
          }
    
          button:hover {
            background-color: #357ab8;
          }
        `;
  }

  drawPattern() {
    const patternType = this.patternTypeInput.value;
    const numShapes = Number(this.numShapesInput.value);
    const colorScheme = this.colorSchemeInput.value;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < numShapes; i++) {
      switch (patternType) {
        case "triangles":
          this.drawTriangle(this.getRandomColor(colorScheme));
          break;
        case "rectangles":
          this.drawRectangle(this.getRandomColor(colorScheme));
          break;
        case "circles":
          this.drawCircle(this.getRandomColor(colorScheme));
          break;
      }
    }
  }

  drawTriangle(color) {
    const { ctx, canvas } = this;
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = Math.random() * canvas.width;
    const y2 = Math.random() * canvas.height;
    const x3 = Math.random() * canvas.width;
    const y3 = Math.random() * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
  }

  drawRectangle(color) {
    const { ctx, canvas } = this;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const width = Math.random() * (canvas.width / 10);
    const height = Math.random() * (canvas.height / 10);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  drawCircle(color) {
    const { ctx, canvas } = this;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * (canvas.width / 20);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
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
    link.download = "geometric-pattern.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

customElements.define("geometric-pattern-filler", GeometricPatternFiller);

class ArtisticShapesDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
          <div class="container">
            <h1>Artistic Shapes Drawer</h1>
            <div class="controls">
              <div>
                <label for="numTriangles">Number of Triangles:</label>
                <input type="range" id="numTriangles" min="1" max="100" value="50">
              </div>
              <div>
                <label for="numRectangles">Number of Rectangles:</label>
                <input type="range" id="numRectangles" min="1" max="100" value="50">
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

    this.numTrianglesInput = this.shadowRoot.querySelector("#numTriangles");
    this.numRectanglesInput = this.shadowRoot.querySelector("#numRectangles");
    this.colorSchemeInput = this.shadowRoot.querySelector("#colorScheme");
    this.drawButton = this.shadowRoot.querySelector("#drawButton");
    this.downloadButton = this.shadowRoot.querySelector("#downloadButton");

    this.drawButton.addEventListener("click", () => this.drawShapes());
    this.downloadButton.addEventListener("click", () => this.downloadImage());

    this.drawShapes(); // Draw initial shapes
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

  drawShapes() {
    const numTriangles = Number(this.numTrianglesInput.value);
    const numRectangles = Number(this.numRectanglesInput.value);
    const colorScheme = this.colorSchemeInput.value;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < numTriangles; i++) {
      this.drawTriangle(this.getRandomColor(colorScheme));
    }

    for (let i = 0; i < numRectangles; i++) {
      this.drawRectangle(this.getRandomColor(colorScheme));
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
    const width = Math.random() * (canvas.width / 5);
    const height = Math.random() * (canvas.height / 5);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
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
    link.download = "artistic-shapes.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

customElements.define("artistic-shapes-drawer", ArtisticShapesDrawer);

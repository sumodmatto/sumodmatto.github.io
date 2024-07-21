class ArchimedeanSpiralDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <div class="container">
        <h1>Artistic Archimedean Spiral Drawer</h1>
        <div class="controls">
          <div class="control-group">
            <label for="numSpirals">Number of Spirals:</label>
            <input type="number" id="numSpirals" min="1" max="10" value="1">
          </div>
          <div class="control-group">
            <label for="colorScheme">Color Scheme:</label>
            <select id="colorScheme">
              <option value="gradient">Gradient</option>
              <option value="rainbow">Rainbow</option>
              <option value="monochrome">Monochrome</option>
            </select>
          </div>
          <div class="control-group">
            <label for="effect">Effect:</label>
            <select id="effect">
              <option value="none">None</option>
              <option value="noise">Noise</option>
              <option value="sin">Sin Wave</option>
              <option value="cos">Cos Wave</option>
            </select>
          </div>
          <div class="control-group">
            <label for="amplitude">Amplitude:</label>
            <input type="range" id="amplitude" min="1" max="20" value="9">
          </div>
          <button id="drawButton">Draw</button>
          <button id="downloadButton">Download Image</button>
        </div>
        <canvas id="canvas"></canvas>
      </div>
      <style>
        ${this.getStyles()}
      </style>
    `;

    this.canvas = this.shadowRoot.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.numSpiralsInput = this.shadowRoot.querySelector("#numSpirals");
    this.colorSchemeInput = this.shadowRoot.querySelector("#colorScheme");
    this.effectInput = this.shadowRoot.querySelector("#effect");
    this.amplitudeInput = this.shadowRoot.querySelector("#amplitude");
    this.drawButton = this.shadowRoot.querySelector("#drawButton");
    this.downloadButton = this.shadowRoot.querySelector("#downloadButton");

    this.drawButton.addEventListener("click", () => this.drawSpirals());
    this.downloadButton.addEventListener("click", () => this.downloadImage());

    this.drawSpirals(); // Initial draw
  }

  getStyles() {
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
        max-width: 100%;
        height: auto;
      }
      .controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        gap: 10px;
      }
      .control-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .controls label {
        margin-bottom: 5px;
      }
      button {
        padding: 10px 20px;
        background-color: #4a90e2;
        border: none;
        border-radius: 4px;
        color: white;
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

  drawSpirals() {
    const numSpirals = Number(this.numSpiralsInput.value);
    const colorScheme = this.colorSchemeInput.value;
    const effect = this.effectInput.value;
    const amplitude = Number(this.amplitudeInput.value);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = Math.min(width, height) / 2 / Math.PI;

    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numSpirals; i++) {
      const initialAngle = ((2 * Math.PI) / numSpirals) * i;
      this.drawSpiral(
        colorScheme,
        effect,
        initialAngle,
        i,
        numSpirals,
        scale,
        amplitude
      );
    }
  }

  drawSpiral(
    colorScheme,
    effect,
    initialAngle,
    index,
    totalSpirals,
    scale,
    amplitude
  ) {
    const a = 1;
    const b = 0.2;
    const numPoints = 1000;
    const theta = Array.from(
      { length: numPoints },
      (_, i) => (i * 8 * Math.PI) / numPoints
    );
    const r = theta.map((t) => a + b * t * scale);

    this.ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      let move = 0;
      if (effect === "sin") {
        move = Math.sin(theta[i] * 4 + Date.now() / 1000.0) * amplitude;
      } else if (effect === "cos") {
        move = Math.cos(theta[i] * 4 + Date.now() / 1000.0) * amplitude;
      } else if (effect === "noise") {
        move = (Math.random() - 0.5) * amplitude;
      }

      let x =
        (r[i] + move) * Math.cos(theta[i] + initialAngle) +
        this.canvas.width / 2;
      let y =
        (r[i] + move) * Math.sin(theta[i] + initialAngle) +
        this.canvas.height / 2;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }

      if (colorScheme === "gradient") {
        this.ctx.strokeStyle = `hsl(${(i / numPoints) * 360}, 100%, 50%)`;
      } else if (colorScheme === "rainbow") {
        this.ctx.strokeStyle = `hsl(${
          (index * 360) / totalSpirals + (i / numPoints) * 360
        }, 100%, 50%)`;
      } else {
        const shade = Math.floor((i / numPoints) * 255);
        this.ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
      }

      this.ctx.stroke();
    }
  }

  downloadImage() {
    const link = document.createElement("a");
    link.download = "artistic-archimedean-spiral.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

customElements.define("archimedean-spiral-drawer", ArchimedeanSpiralDrawer);

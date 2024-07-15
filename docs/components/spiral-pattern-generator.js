class SpiralPatternGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <div class="controls">
          <div>
            <label for="numSpirals">Number of Spirals: </label>
            <input type="range" id="numSpirals" min="1" max="10" value="3">
          </div>
          <div>
            <label for="angleIncrement">Angle Increment: </label>
            <input type="range" id="angleIncrement" min="0.1" max="1" step="0.1" value="0.2">
          </div>
          <div>
            <label for="triangleSize">Triangle Size: </label>
            <input type="range" id="triangleSize" min="1" max="20" value="10">
          </div>
          <button id="toggleColor">Toggle Black and White</button>
          <button id="downloadImage">Download Image</button>
        </div>
        <canvas id="canvas" width="800" height="800"></canvas>
        <style>
          @import url('../css/spiral-pattern-generator.css');
        </style>
      `;

    this.canvas = this.shadowRoot.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.numSpiralsInput = this.shadowRoot.getElementById("numSpirals");
    this.angleIncrementInput = this.shadowRoot.getElementById("angleIncrement");
    this.triangleSizeInput = this.shadowRoot.getElementById("triangleSize");
    this.toggleColorButton = this.shadowRoot.getElementById("toggleColor");
    this.downloadImageButton = this.shadowRoot.getElementById("downloadImage");

    this.isBlackAndWhite = false;

    this.numSpiralsInput.addEventListener("input", () =>
      this.drawDetailedSpiralPattern()
    );
    this.angleIncrementInput.addEventListener("input", () =>
      this.drawDetailedSpiralPattern()
    );
    this.triangleSizeInput.addEventListener("input", () =>
      this.drawDetailedSpiralPattern()
    );
    this.toggleColorButton.addEventListener("click", () =>
      this.toggleColorMode()
    );
    this.downloadImageButton.addEventListener("click", () =>
      this.downloadImage()
    );

    this.drawDetailedSpiralPattern();
  }

  drawDetailedSpiralPattern() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const numSpirals = Number(this.numSpiralsInput.value);
    const maxRadius = Math.min(this.canvas.width, this.canvas.height) / 2;
    const spiralAngleIncrement = (2 * Math.PI) / numSpirals;
    const angleIncrement = Number(this.angleIncrementInput.value);
    const baseTriangleSize = Number(this.triangleSizeInput.value);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let spiral = 0; spiral < numSpirals; spiral++) {
      let angle = spiral * spiralAngleIncrement;
      for (let radius = 0; radius < maxRadius; radius += 2) {
        angle += angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const size = (radius / maxRadius) * baseTriangleSize; // Size increases with radius
        this.drawTriangle(x, y, angle + Math.PI / 2, size);
      }
    }
  }

  drawTriangle(x, y, angle, size) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size);
    this.ctx.lineTo(size, size);
    this.ctx.lineTo(-size, size);
    this.ctx.closePath();
    const color = this.isBlackAndWhite
      ? `hsl(0, 0%, ${((angle * 180) / Math.PI) % 100}%)`
      : `hsl(${(angle * 180) / Math.PI}, 100%, 50%)`;
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.restore();
  }

  toggleColorMode() {
    this.isBlackAndWhite = !this.isBlackAndWhite;
    this.drawDetailedSpiralPattern();
  }

  downloadImage() {
    const link = document.createElement("a");
    link.download = "spiral-pattern.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

customElements.define("spiral-pattern-generator", SpiralPatternGenerator);

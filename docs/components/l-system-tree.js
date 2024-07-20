class LSystemTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <div class="container">
          <h1>L-System Tree Generator</h1>
          <div class="controls">
            <div class="row">
              <div class="control-item">
                <label for="preset">Preset:</label>
                <select id="preset" class="styled-select">
                  <option value="custom">Custom</option>
                  <option value="tree1">Tree 1</option>
                  <option value="tree2">Tree 2</option>
                  <option value="plant1">Plant 1</option>
                  <option value="plant2">Plant 2</option>
                  <option value="kochcurve">Koch Curve</option>
                  <option value="sierpinskitriangle">Sierpinski Triangle</option>
                  <option value="dragoncurve">Dragon Curve</option>
                </select>
              </div>
              <div class="control-item">
                <label for="colorScheme">Color Scheme:</label>
                <select id="colorScheme" class="styled-select">
                  <option value="random">Random</option>
                  <option value="monochrome">Monochrome</option>
                  <option value="warm">Warm</option>
                  <option value="cool">Cool</option>
                  <option value="pastel">Pastel</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="control-item">
                <label for="axiom">Axiom:</label>
                <input type="text" id="axiom" class="styled-input" value="F">
              </div>
              <div class="control-item">
                <label for="rules">Rules (comma-separated):</label>
                <input type="text" id="rules" class="styled-input" value="F:F[+F]F[-F]F">
              </div>
            </div>
            <div class="row">
              <div class="control-item">
                <label for="iterations">Iterations:</label>
                <input type="number" id="iterations" class="styled-input" min="0" max="10" value="4">
              </div>
              <div class="control-item">
                <label for="angle">Angle:</label>
                <input type="number" id="angle" class="styled-input" value="25">
              </div>
            </div>
            <div class="row">
              <button id="generateButton" class="styled-button">Generate</button>
              <button id="downloadButton" class="styled-button">Download Image</button>
            </div>
            <div id="loading" style="display: none;">Processing...</div>
          </div>
          <div class="canvas-container">
            <canvas id="canvas"></canvas>
          </div>
          <style>
            ${this.getStyle()}
          </style>
        </div>
      `;

    this.canvas = this.shadowRoot.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");

    this.presetInput = this.shadowRoot.querySelector("#preset");
    this.axiomInput = this.shadowRoot.querySelector("#axiom");
    this.rulesInput = this.shadowRoot.querySelector("#rules");
    this.iterationsInput = this.shadowRoot.querySelector("#iterations");
    this.angleInput = this.shadowRoot.querySelector("#angle");
    this.colorSchemeInput = this.shadowRoot.querySelector("#colorScheme");
    this.generateButton = this.shadowRoot.querySelector("#generateButton");
    this.downloadButton = this.shadowRoot.querySelector("#downloadButton");
    this.loadingDiv = this.shadowRoot.querySelector("#loading");

    this.presetInput.addEventListener("change", () => this.applyPreset());
    this.generateButton.addEventListener("click", () => this.generateTree());
    this.downloadButton.addEventListener("click", () => this.downloadImage());

    this.setRandomPreset(); // 初期生成
    this.generateTree(); // 初期生成
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
          margin-bottom: 20px;
          width: 100%;
        }
  
        .row {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 10px;
        }
  
        .control-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 0 10px;
        }
  
        .styled-input,
        .styled-select {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          width: 200px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
  
        .styled-input:focus,
        .styled-select:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
          outline: none;
        }
  
        .styled-button {
          padding: 10px 20px;
          background-color: #4a90e2;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin: 10px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
  
        .styled-button:hover {
          background-color: #357ab8;
        }
  
        .canvas-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `;
  }

  setRandomPreset() {
    const presets = [
      {
        name: "tree1",
        axiom: "F",
        rules: { F: "F[+F]F[-F]F" },
        angle: 25,
        iterations: 4,
      },
      {
        name: "tree2",
        axiom: "F",
        rules: { F: "FF-[-F+F+F]+[+F-F-F]" },
        angle: 25,
        iterations: 4,
      },
      {
        name: "plant1",
        axiom: "X",
        rules: { X: "F-[[X]+X]+F[+FX]-X", F: "FF" },
        angle: 25,
        iterations: 5,
      },
      {
        name: "plant2",
        axiom: "X",
        rules: { X: "F+[[X]-X]-F[-FX]+X", F: "FF" },
        angle: 25,
        iterations: 5,
      },
      {
        name: "kochcurve",
        axiom: "F",
        rules: { F: "F+F-F-F+F" },
        angle: 90,
        iterations: 4,
      },
      {
        name: "sierpinskitriangle",
        axiom: "A",
        rules: { A: "B-A-B", B: "A+B+A" },
        angle: 60,
        iterations: 6,
      },
      {
        name: "dragoncurve",
        axiom: "FX",
        rules: { X: "X+YF+", Y: "-FX-Y" },
        angle: 90,
        iterations: 10,
      },
    ];
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    this.presetInput.value = randomPreset.name;
    this.axiomInput.value = randomPreset.axiom;
    this.rulesInput.value = this.formatRules(randomPreset.rules);
    this.angleInput.value = randomPreset.angle;
    this.iterationsInput.value = randomPreset.iterations;
  }

  formatRules(rules) {
    return Object.entries(rules)
      .map(([key, value]) => `${key}:${value}`)
      .join(",");
  }

  applyPreset() {
    const preset = this.presetInput.value;
    if (preset === "custom") {
      return;
    }
    const presets = {
      tree1: {
        axiom: "F",
        rules: { F: "F[+F]F[-F]F" },
        angle: 25,
        iterations: 4,
      },
      tree2: {
        axiom: "F",
        rules: { F: "FF-[-F+F+F]+[+F-F-F]" },
        angle: 25,
        iterations: 4,
      },
      plant1: {
        axiom: "X",
        rules: { X: "F-[[X]+X]+F[+FX]-X", F: "FF" },
        angle: 25,
        iterations: 5,
      },
      plant2: {
        axiom: "X",
        rules: { X: "F+[[X]-X]-F[-FX]+X", F: "FF" },
        angle: 25,
        iterations: 5,
      },
      kochcurve: {
        axiom: "F",
        rules: { F: "F+F-F-F+F" },
        angle: 90,
        iterations: 4,
      },
      sierpinskitriangle: {
        axiom: "A",
        rules: { A: "B-A-B", B: "A+B+A" },
        angle: 60,
        iterations: 6,
      },
      dragoncurve: {
        axiom: "FX",
        rules: { X: "X+YF+", Y: "-FX-Y" },
        angle: 90,
        iterations: 10,
      },
    };
    const selectedPreset = presets[preset];
    this.axiomInput.value = selectedPreset.axiom;
    this.rulesInput.value = this.formatRules(selectedPreset.rules);
    this.angleInput.value = selectedPreset.angle;
    this.iterationsInput.value = selectedPreset.iterations;
  }

  async generateTree() {
    const axiom = this.axiomInput.value;
    const rules = this.parseRules(this.rulesInput.value);
    const iterations = Number(this.iterationsInput.value);
    const angle = Number(this.angleInput.value) * (Math.PI / 180);
    const colorScheme = this.colorSchemeInput.value;

    this.loadingDiv.style.display = "block";
    await this.sleep(10);

    let result = axiom;
    for (let i = 0; i < iterations; i++) {
      result = this.applyRules(result, rules);
    }

    const iterationColors = this.getIterationColors(colorScheme, iterations);

    const [minX, minY, maxX, maxY] = this.getBoundingBox(result, angle);
    const margin = 20;
    const width = maxX - minX + margin * 2;
    const height = maxY - minY + margin * 2;

    this.canvas.width = width;
    this.canvas.height = height;
    this.drawLSystem(result, angle, minX, minY, margin, iterationColors);
    this.loadingDiv.style.display = "none";
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  parseRules(rulesStr) {
    const rules = {};
    rulesStr.split(",").forEach((rule) => {
      const [from, to] = rule.split(":");
      rules[from] = to;
    });
    return rules;
  }

  applyRules(axiom, rules) {
    return axiom
      .split("")
      .map((char) => rules[char] || char)
      .join("");
  }

  getBoundingBox(axiom, angle) {
    let x = 0,
      y = 0,
      currentAngle = -Math.PI / 2;
    let minX = 0,
      minY = 0,
      maxX = 0,
      maxY = 0;
    const stack = [];

    axiom.split("").forEach((char) => {
      switch (char) {
        case "F":
        case "A":
        case "B":
          x += Math.cos(currentAngle) * 10;
          y += Math.sin(currentAngle) * 10;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
          break;
        case "+":
          currentAngle += angle;
          break;
        case "-":
          currentAngle -= angle;
          break;
        case "[":
          stack.push([x, y, currentAngle]);
          break;
        case "]":
          [x, y, currentAngle] = stack.pop();
          break;
      }
    });

    return [minX, minY, maxX, maxY];
  }

  drawLSystem(axiom, angle, minX, minY, margin, iterationColors) {
    let x = -minX + margin;
    let y = -minY + margin;
    let currentAngle = -Math.PI / 2;
    const stack = [];
    let iterationIndex = 0;
    let currentColor = iterationColors[iterationIndex];

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);

    axiom.split("").forEach((char) => {
      switch (char) {
        case "F":
        case "A":
        case "B":
          const newX = x + Math.cos(currentAngle) * 10;
          const newY = y + Math.sin(currentAngle) * 10;
          this.ctx.lineTo(newX, newY);
          x = newX;
          y = newY;
          break;
        case "+":
          currentAngle += angle;
          break;
        case "-":
          currentAngle -= angle;
          break;
        case "[":
          stack.push([x, y, currentAngle]);
          break;
        case "]":
          [x, y, currentAngle] = stack.pop();
          this.ctx.moveTo(x, y);
          break;
      }
      iterationIndex++;
      if (iterationIndex >= iterationColors.length) {
        iterationIndex = 0;
      }
      currentColor = iterationColors[iterationIndex];
      this.ctx.strokeStyle = currentColor;
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    });

    this.ctx.stroke();
  }

  getIterationColors(scheme, iterations) {
    const colors = [];
    for (let i = 0; i < iterations; i++) {
      colors.push(this.getColorScheme(scheme));
    }
    return colors.flat();
  }

  getColorScheme(scheme) {
    if (scheme === "monochrome") {
      const shade = Math.floor(Math.random() * 256);
      return [`rgb(${shade}, ${shade}, ${shade})`];
    } else if (scheme === "warm") {
      return ["rgb(255, 99, 71)", "rgb(255, 140, 0)", "rgb(255, 69, 0)"];
    } else if (scheme === "cool") {
      return ["rgb(0, 191, 255)", "rgb(135, 206, 235)", "rgb(70, 130, 180)"];
    } else if (scheme === "pastel") {
      return ["rgb(255, 182, 193)", "rgb(255, 160, 122)", "rgb(176, 224, 230)"];
    } else {
      return [
        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`,
      ];
    }
  }

  downloadImage() {
    const link = document.createElement("a");
    link.download = "lsystem-tree.png";
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

customElements.define("l-system-tree", LSystemTree);

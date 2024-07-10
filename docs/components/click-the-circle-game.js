class ClickTheCircleGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <div class="game-container">
          <h1>Click the Circle Game</h1>
          <p>Score: <span id="score">0</span></p>
          <p>Time Left: <span id="time-left">30s</span></p>
          <button id="start-button">Start Game</button>
          <div id="circle"></div>
        </div>
        <style>
          .game-container {
            text-align: center;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 80vw;
            height: 80vh;
            position: relative;
          }
  
          #circle {
            background-color: red;
            position: absolute;
            display: none;
            cursor: pointer;
            border-radius: 50%;
          }
  
          button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
          }
        </style>
      `;

    this.score = 0;
    this.timeLeft = 30;
    this.timer = null;
    this.circle = this.shadowRoot.querySelector("#circle");
    this.scoreDisplay = this.shadowRoot.querySelector("#score");
    this.timeLeftDisplay = this.shadowRoot.querySelector("#time-left");
    this.startButton = this.shadowRoot.querySelector("#start-button");

    this.startButton.addEventListener("click", () => this.startGame());
    this.circle.addEventListener("click", () => this.circleClicked());
  }

  startGame() {
    this.score = 0;
    this.timeLeft = 30;
    this.updateScore();
    this.updateTimeLeft();
    this.startButton.disabled = true;
    this.showCircle();
    this.timer = setInterval(() => this.updateGame(), 1000);
  }

  updateGame() {
    if (this.timeLeft > 0) {
      this.timeLeft -= 1;
      this.updateTimeLeft();
      this.showCircle();
    } else {
      clearInterval(this.timer);
      this.endGame();
    }
  }

  endGame() {
    this.circle.style.display = "none";
    this.startButton.disabled = false;
    alert(`Game over! Your final score is ${this.score}.`);
  }

  updateScore() {
    this.scoreDisplay.textContent = this.score;
  }

  updateTimeLeft() {
    this.timeLeftDisplay.textContent = `${this.timeLeft}s`;
  }

  showCircle() {
    const container = this.shadowRoot.querySelector(".game-container");
    const size = Math.floor(Math.random() * 30) + 30; // Random size between 30px and 60px
    const x = Math.random() * (container.clientWidth - size);
    const y = Math.random() * (container.clientHeight - size);
    this.circle.style.width = `${size}px`;
    this.circle.style.height = `${size}px`;
    this.circle.style.left = `${x}px`;
    this.circle.style.top = `${y}px`;
    this.circle.style.display = "block";
  }

  circleClicked() {
    this.score += 1;
    this.updateScore();
    this.circle.style.display = "none";
  }
}

customElements.define("click-the-circle-game", ClickTheCircleGame);

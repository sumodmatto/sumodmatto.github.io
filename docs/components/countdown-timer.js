class CountdownTimer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <div class="countdown-container">
        <h1>Countdown Timer</h1>
        <div class="countdown-inputs">
          <div class="input-row">
            <div class="input-group">
              <label for="year">Year</label>
              <input type="number" id="year" min="2023">
            </div>
            <div class="input-group">
              <label for="month">Month</label>
              <input type="number" id="month" min="1" max="12">
            </div>
            <div class="input-group">
              <label for="day">Day</label>
              <input type="number" id="day" min="1" max="31">
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label for="hour">Hour</label>
              <input type="number" id="hour" min="0" max="23">
            </div>
            <div class="input-group">
              <label for="minute">Minute</label>
              <input type="number" id="minute" min="0" max="59">
            </div>
            <div class="input-group">
              <label for="second">Second</label>
              <input type="number" id="second" min="0" max="59">
            </div>
          </div>
        </div>
        <div id="countdown" class="countdown">
          <div><span id="years"></span> Years</div>
          <div><span id="months"></span> Months</div>
          <div><span id="days"></span> Days</div>
          <div><span id="hours"></span> Hours</div>
          <div><span id="minutes"></span> Minutes</div>
          <div><span id="seconds"></span> Seconds</div>
        </div>
      </div>
      <style>
        ${this.getStyle()}
      </style>
    `;

    this.yearsSpan = this.shadowRoot.querySelector("#years");
    this.monthsSpan = this.shadowRoot.querySelector("#months");
    this.daysSpan = this.shadowRoot.querySelector("#days");
    this.hoursSpan = this.shadowRoot.querySelector("#hours");
    this.minutesSpan = this.shadowRoot.querySelector("#minutes");
    this.secondsSpan = this.shadowRoot.querySelector("#seconds");

    this.inputs = this.shadowRoot.querySelectorAll("input");
    this.inputs.forEach((input) =>
      input.addEventListener("input", () => this.updateCountdown())
    );

    this.setDefaultDate();
    this.startCountdown();
  }

  getStyle() {
    return `
      .countdown-container {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: left; /* Changed from center to left */
        width: 40vw;
      }
  
      .countdown-inputs {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Changed from center to flex-start */
        margin-bottom: 20px;
      }
  
      .input-row {
        display: flex;
        justify-content: flex-start; /* Changed from center to flex-start */
        margin: 10px 0;
      }
  
      .input-group {
        display: flex;
        flex-direction: column;
        margin: 0 10px;
      }
  
      .input-group label {
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 14px;
        color: #333;
        text-align: left; /* Added */
      }
  
      .input-group input {
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: border-color 0.3s ease;
      }
  
      .input-group input:focus {
        border-color: #4a90e2;
        outline: none;
      }
  
      .countdown {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Changed from center to flex-start */
      }
  
      .countdown div {
        margin: 10px;
        font-size: 24px;
        font-weight: bold;
      }
  
      .countdown span {
        font-size: 28px;
        color: #4a90e2;
      }
    `;
  }

  setDefaultDate() {
    const now = new Date();
    const nextYear = new Date(
      now.getFullYear() + 1,
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    this.shadowRoot.querySelector("#year").value = nextYear.getFullYear();
    this.shadowRoot.querySelector("#month").value = nextYear.getMonth() + 1;
    this.shadowRoot.querySelector("#day").value = nextYear.getDate();
    this.shadowRoot.querySelector("#hour").value = nextYear.getHours();
    this.shadowRoot.querySelector("#minute").value = nextYear.getMinutes();
    this.shadowRoot.querySelector("#second").value = nextYear.getSeconds();

    this.updateCountdown();
  }

  startCountdown() {
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const year = parseInt(this.shadowRoot.querySelector("#year").value, 10);
    const month =
      parseInt(this.shadowRoot.querySelector("#month").value, 10) - 1; // Months are zero-indexed in JS Date
    const day = parseInt(this.shadowRoot.querySelector("#day").value, 10);
    const hour = parseInt(this.shadowRoot.querySelector("#hour").value, 10);
    const minute = parseInt(this.shadowRoot.querySelector("#minute").value, 10);
    const second = parseInt(this.shadowRoot.querySelector("#second").value, 10);

    const targetDate = new Date(year, month, day, hour, minute, second);
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      clearInterval(this.interval);
      this.shadowRoot.querySelector("#countdown").innerHTML =
        "<div>Countdown finished!</div>";
      return;
    }

    const years = targetDate.getFullYear() - now.getFullYear();
    const months = years * 12 + targetDate.getMonth() - now.getMonth();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor(difference / 1000);

    this.yearsSpan.textContent = years;
    this.monthsSpan.textContent = months;
    this.daysSpan.textContent = days;
    this.hoursSpan.textContent = hours;
    this.minutesSpan.textContent = minutes;
    this.secondsSpan.textContent = seconds;
  }
}

customElements.define("countdown-timer", CountdownTimer);

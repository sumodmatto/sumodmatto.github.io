class CalculatorApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../css/calculator.css">
        <div class="calculator">
          <div class="display" id="display">0</div>
          <div class="buttons">
            <button class="btn" data-action="clear">C</button>
            <button class="btn" data-action="sign">±</button>
            <button class="btn" data-action="percent">%</button>
            <button class="btn" data-action="operator" data-operator="/">÷</button>
            <button class="btn" data-action="number" data-number="7">7</button>
            <button class="btn" data-action="number" data-number="8">8</button>
            <button class="btn" data-action="number" data-number="9">9</button>
            <button class="btn" data-action="operator" data-operator="*">×</button>
            <button class="btn" data-action="number" data-number="4">4</button>
            <button class="btn" data-action="number" data-number="5">5</button>
            <button class="btn" data-action="number" data-number="6">6</button>
            <button class="btn" data-action="operator" data-operator="-">-</button>
            <button class="btn" data-action="number" data-number="1">1</button>
            <button class="btn" data-action="number" data-number="2">2</button>
            <button class="btn" data-action="number" data-number="3">3</button>
            <button class="btn" data-action="operator" data-operator="+">+</button>
            <button class="btn" data-action="number" data-number="0">0</button>
            <button class="btn" data-action="decimal">.</button>
            <button class="btn" data-action="equal">=</button>
          </div>
        </div>
      `;
  }

  connectedCallback() {
    const display = this.shadowRoot.getElementById("display");
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    const updateDisplay = (value) => {
      display.textContent = value;
    };

    const clearDisplay = () => {
      updateDisplay("0");
      firstOperand = null;
      operator = null;
      shouldResetDisplay = false;
    };

    const inputNumber = (number) => {
      if (shouldResetDisplay) {
        updateDisplay(number);
        shouldResetDisplay = false;
      } else {
        updateDisplay(
          display.textContent === "0" ? number : display.textContent + number
        );
      }
    };

    const inputDecimal = () => {
      if (shouldResetDisplay) {
        updateDisplay("0.");
        shouldResetDisplay = false;
      } else if (!display.textContent.includes(".")) {
        updateDisplay(display.textContent + ".");
      }
    };

    const handleOperator = (nextOperator) => {
      const inputValue = parseFloat(display.textContent);

      if (firstOperand === null) {
        firstOperand = inputValue;
      } else if (operator) {
        const result = performCalculation(firstOperand, inputValue, operator);
        updateDisplay(result);
        firstOperand = result;
      }

      operator = nextOperator;
      shouldResetDisplay = true;
    };

    const performCalculation = (firstOperand, secondOperand, operator) => {
      switch (operator) {
        case "+":
          return firstOperand + secondOperand;
        case "-":
          return firstOperand - secondOperand;
        case "*":
          return firstOperand * secondOperand;
        case "/":
          return firstOperand / secondOperand;
        default:
          return secondOperand;
      }
    };

    const calculate = () => {
      if (operator && !shouldResetDisplay) {
        const secondOperand = parseFloat(display.textContent);
        const result = performCalculation(
          firstOperand,
          secondOperand,
          operator
        );
        updateDisplay(result);
        firstOperand = null;
        operator = null;
      }
    };

    this.shadowRoot
      .querySelector(".buttons")
      .addEventListener("click", (event) => {
        const { target } = event;

        if (!target.matches("button")) return;

        const action = target.dataset.action;
        const buttonContent = target.textContent;

        switch (action) {
          case "clear":
            clearDisplay();
            break;
          case "sign":
            updateDisplay(display.textContent * -1);
            break;
          case "percent":
            updateDisplay(display.textContent / 100);
            break;
          case "decimal":
            inputDecimal();
            break;
          case "number":
            inputNumber(buttonContent);
            break;
          case "operator":
            handleOperator(target.dataset.operator);
            break;
          case "equal":
            calculate();
            break;
          default:
            break;
        }
      });

    clearDisplay();
  }
}

customElements.define("calculator-app", CalculatorApp);

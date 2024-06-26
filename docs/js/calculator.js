document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
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
      const result = performCalculation(firstOperand, secondOperand, operator);
      updateDisplay(result);
      firstOperand = null;
      operator = null;
    }
  };

  document.querySelector(".buttons").addEventListener("click", (event) => {
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
});

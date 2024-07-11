class PasswordGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <div class="generator-container">
        <h1>Password Generator</h1>
        <label>
          Length: <input type="number" id="length" value="12" min="4" max="32" />
        </label>
        <div class="checkbox-group">
          <label><input type="checkbox" id="uppercase" checked /> Include Uppercase</label>
          <label><input type="checkbox" id="numbers" checked /> Include Numbers</label>
          <label><input type="checkbox" id="symbols" checked /> Include Symbols</label>
        </div>
        <button id="generate-button">Generate Password</button>
        <ul class="password-list" id="password-list"></ul>
      </div>
      <style>
        ${this.getStyles()}
      </style>
    `;

    this.lengthInput = this.shadowRoot.querySelector("#length");
    this.uppercaseCheckbox = this.shadowRoot.querySelector("#uppercase");
    this.numbersCheckbox = this.shadowRoot.querySelector("#numbers");
    this.symbolsCheckbox = this.shadowRoot.querySelector("#symbols");
    this.generateButton = this.shadowRoot.querySelector("#generate-button");
    this.passwordList = this.shadowRoot.querySelector("#password-list");

    this.generateButton.addEventListener("click", () =>
      this.generatePasswords()
    );
  }

  getStyles() {
    return `
      .generator-container {
        text-align: center;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 80vw;
        max-width: 600px;
      }

      .generator-container input[type="number"] {
        width: 80px;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }

      .generator-container label {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
      }

      .generator-container .checkbox-group {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
      }

      .generator-container .checkbox-group label {
        display: flex;
        align-items: center;
      }

      .generator-container .checkbox-group input[type="checkbox"] {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }

      .generator-container button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background-color: #4a90e2;
        color: white;
        transition: background-color 0.3s;
      }

      .generator-container button:hover {
        background-color: #357ab8;
      }

      .password-list {
        margin-top: 20px;
        list-style-type: none;
        padding: 0;
      }

      .password-list li {
        background-color: #f9f9f9;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: monospace;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .password-list li .copy-icon {
        cursor: pointer;
        margin-left: 10px;
        font-size: 16px;
        color: #4a90e2;
        transition: color 0.3s;
      }

      .password-list li .copy-icon:hover {
        color: #357ab8;
      }

      .tooltip {
        visibility: hidden;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
      }

      .password-list li.show-tooltip .tooltip {
        visibility: visible;
        opacity: 1;
      }
    `;
  }

  generatePasswords() {
    const length = parseInt(this.lengthInput.value);
    const includeUppercase = this.uppercaseCheckbox.checked;
    const includeNumbers = this.numbersCheckbox.checked;
    const includeSymbols = this.symbolsCheckbox.checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charSet = lowercaseChars;
    if (includeUppercase) charSet += uppercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    const passwords = Array.from({ length: 6 }, () =>
      this.generatePassword(length, charSet)
    );
    this.displayPasswords(passwords);
  }

  generatePassword(length, charSet) {
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
    return password;
  }

  displayPasswords(passwords) {
    this.passwordList.innerHTML = "";
    passwords.forEach((password) => {
      const li = document.createElement("li");
      li.textContent = password;

      const copyIcon = document.createElement("span");
      copyIcon.innerHTML = "&#128203;"; // Clipboard icon
      copyIcon.classList.add("copy-icon");
      copyIcon.addEventListener("click", () =>
        this.copyToClipboard(password, li)
      );

      const tooltip = document.createElement("span");
      tooltip.textContent = "Copied!";
      tooltip.classList.add("tooltip");

      li.appendChild(copyIcon);
      li.appendChild(tooltip);
      this.passwordList.appendChild(li);
    });
  }

  copyToClipboard(password, listItem) {
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const tooltip = listItem.querySelector(".tooltip");
    listItem.classList.add("show-tooltip");
    setTimeout(() => {
      listItem.classList.remove("show-tooltip");
    }, 1000);
  }
}

customElements.define("password-generator", PasswordGenerator);

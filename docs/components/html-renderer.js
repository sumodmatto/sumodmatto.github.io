// components/html-renderer.js
class HtmlRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }
  
          textarea {
            width: 100%;
            height: 300px;
            margin-bottom: 10px;
            font-size: 16px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            font-family: "Roboto", sans-serif;
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
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
  
          button:hover {
            background-color: #357ab8;
          }
  
          #html-output {
            margin-top: 20px;
            width: 100%;
            min-height: 300px;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow-x: auto;
          }
        </style>
        <div class="container">
          <textarea id="html-input" placeholder="Enter your HTML code here..."></textarea>
          <button id="render-button">Render HTML</button>
          <div id="html-output"></div>
        </div>
      `;

    this.renderButton = this.shadowRoot.getElementById("render-button");
    this.htmlInput = this.shadowRoot.getElementById("html-input");
    this.htmlOutput = this.shadowRoot.getElementById("html-output");

    this.renderButton.addEventListener("click", () => this.renderHtml());
  }

  renderHtml() {
    const htmlContent = this.htmlInput.value;
    this.htmlOutput.innerHTML = htmlContent;
  }
}

customElements.define("html-renderer", HtmlRenderer);

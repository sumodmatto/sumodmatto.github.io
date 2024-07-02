class AppList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <h1>App List</h1>
        <ul class="app-list">
          <li><a href="calculator.html">Calculator</a></li>
          <li><a href="qrcode.html">QR Code Generator</a></li>
          <li><a href="notepad.html">Notepad</a></li>
          <li><a href="kanban.html">Kanban</a></li>
          <li><a href="clocks.html">Kanban</a></li>
        </ul>
      `;
  }
}

customElements.define("app-list", AppList);

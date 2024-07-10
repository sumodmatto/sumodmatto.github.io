class AppList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <h1>App List</h1>
        <ul class="app-list">
          <li><a href="calculator.html">Calculator</a></li>
          <li><a href="qrcode.html">QR Code Generator</a></li>
          <li><a href="notepad.html">Notepad</a></li>
          <li><a href="kanban.html">Kanban</a></li>
          <li><a href="clocks.html">Clocks</a></li>
          <li><a href="mermaid.html">Mermaid Renderer</a></li>
          <li><a href="html-renderer.html">HTML Renderer</a></li>
          <li><a href="click-the-circle-game.html">Click The Circle Game</a></li>
        </ul>
      `;
  }
}

customElements.define("app-list", AppList);

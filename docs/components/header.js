class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
          <nav>
            <ul>
              <li><a href="/index.html">Home</a></li>
              <li><a href="/blog/index.html">Blog</a></li>
              <li><a href="/app/index.html">App</a></li>
              <li><a href="/contact/index.html">Contact</a></li>
            </ul>
          </nav>
        </header>
      `;
  }
}

customElements.define("app-header", AppHeader);

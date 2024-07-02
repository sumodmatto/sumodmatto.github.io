class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
          <p>&copy; 2024 Sumodmatto. All rights reserved.</p>
        </footer>
      `;
  }
}

customElements.define("app-footer", AppFooter);

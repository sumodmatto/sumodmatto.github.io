class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
      `;
  }
}

customElements.define("app-footer", AppFooter);

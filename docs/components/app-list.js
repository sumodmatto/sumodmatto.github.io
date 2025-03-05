class AppList extends HTMLElement {
  connectedCallback() {
    const apps = [
      { href: 'calculator.html', name: 'Calculator' },
      { href: 'qrcode.html', name: 'QR Code Generator' },
      { href: 'notepad.html', name: 'Notepad' },
      { href: 'kanban.html', name: 'Kanban' },
      { href: 'clocks.html', name: 'Clocks' },
      { href: 'mermaid.html', name: 'Mermaid Renderer' },
      { href: 'html-renderer.html', name: 'HTML Renderer' },
      { href: 'click-the-circle-game.html', name: 'Click The Circle Game' },
      { href: 'password-generator.html', name: 'Password Generator' },
      { href: 'prompt-generator.html', name: 'Prompt Generator' },
      { href: 'countdown-timer.html', name: 'Countdown Timer' },
      { href: 'emoji-selector.html', name: 'Emoji Selector' },
      { href: 'spiral-pattern-generator.html', name: 'Spiral Pattern Generator' },
      { href: 'artistic-shapes-drawer.html', name: 'Artistic Shapes Drawer' },
      { href: 'artistic-line-drawer.html', name: 'Artistic Line Drawer' },
      { href: 'geometric-pattern-filler.html', name: 'Geometric Pattern Filler' },
      { href: 'l-system-tree.html', name: 'L System Tree' },
      { href: 'archimedean-spiral-drawer.html', name: 'Archimedean Spiral Drawer' },
    ];

    const appListItems = apps
      .map((app) => `<li><a href="${app.href}">${app.name}</a></li>`)
      .join('');

    this.innerHTML = `
      <div class="app-list-container">
        <h1>App List</h1>
        <ul class="app-list">
          ${appListItems}
        </ul>
      </div>
    `;
  }
}

customElements.define('app-list', AppList);

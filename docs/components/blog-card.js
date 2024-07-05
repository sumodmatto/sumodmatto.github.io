// blog-card.js
class BlogCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .blog-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 350px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .blog-card h2 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }

        .blog-card p {
          font-size: 0.9em;
          color: #666;
          margin-bottom: 20px;
        }
      </style>
      <div class="blog-card">
        <h2></h2>
        <p></p>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector("h2").innerText = this.getAttribute("title");
    this.shadowRoot.querySelector(
      "p"
    ).innerText = `Posted on: ${this.getAttribute("date")}`;
    this.shadowRoot
      .querySelector(".blog-card")
      .addEventListener("click", () => {
        window.location.href = this.getAttribute("link");
      });
  }
}

customElements.define("blog-card", BlogCard);

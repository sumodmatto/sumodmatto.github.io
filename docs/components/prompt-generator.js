class PromptGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
          <div class="container">
            <div class="sidebar">
              <h2>Prompt Menu</h2>
              <ul class="prompt-list">
                <li data-template="email">Email Template</li>
                <li data-template="report">Report Template</li>
                <li data-template="blogPost">Blog Post Idea Generator</li>
                <li data-template="socialMedia">Social Media Post Generator</li>
                <li data-template="creativeWriting">Creative Writing Starter</li>
                <li data-template="marketingCopy">Marketing Copy</li>
                <li data-template="healthAdvice">Health & Wellness Advice</li>
                <li data-template="eventPlanning">Event Planning Checklist</li>
                <li data-template="educationContent">Educational Content Creator</li>
                <li data-template="technicalDoc">Technical Documentation</li>
                <li data-template="customerService">Customer Service Response</li>
                <li data-template="productReview">Product Review</li>
              </ul>
            </div>
            <div class="main-content">
              <h1>Prompt Generator</h1>
              <div class="modal" id="modal">
                <div id="modal-content"></div>
                <button id="generate">Generate Prompt</button>
              </div>
              <div id="output"></div>
              <button id="copy-prompt" style="display: none; margin-top: 20px;">Copy to Clipboard</button>
            </div>
          </div>
          <style>
            @import url('../css/prompt-generator.css');
          </style>
        `;

    this.templates = {
      email: {
        prompt:
          "Dear [Name],\n\nI hope this message finds you well. I wanted to discuss [Topic/Subject]. Looking forward to your response.\n\nBest regards,\n[Your Name]",
        instruction:
          "Write an email to [Name] about [Topic/Subject]. Please respond in Japanese.",
      },
      report: {
        prompt:
          "## Title: [Report Title]\n\n### Summary: [Brief Summary]\n\n### Details: [Detailed Information]\n\n### Conclusion: [Conclusion]",
        instruction:
          "Create a report titled [Report Title] that includes a summary, detailed information, and a conclusion. Please write the report in Japanese.",
      },
      blogPost: {
        prompt:
          "## Blog Post Ideas\n\nGenerate a list of blog post ideas related to **[Topic/Keyword]**.",
        instruction:
          "List blog post ideas on [Topic/Keyword]. Please write the ideas in Japanese.",
      },
      socialMedia: {
        prompt:
          "## Social Media Posts\n\nCreate five engaging social media posts about **[Topic/Product/Event]**.",
        instruction:
          "Draft five engaging social media posts about [Topic/Product/Event]. Please write the posts in Japanese.",
      },
      creativeWriting: {
        prompt:
          "## Creative Writing Starter\n\nWrite the opening paragraph of a **[Genre]** story about **[Main Character and Setting]**.",
        instruction:
          "Write the opening paragraph of a [Genre] story featuring [Main Character and Setting]. Please write the paragraph in Japanese.",
      },
      marketingCopy: {
        prompt:
          "## Marketing Copy\n\nWrite a compelling marketing copy for **[Product/Service]**, highlighting its benefits and unique selling points.",
        instruction:
          "Create a marketing copy for [Product/Service], focusing on its benefits and unique selling points. Please write the copy in Japanese.",
      },
      healthAdvice: {
        prompt:
          "## Health & Wellness Advice\n\nProvide a 30-day workout plan to help me achieve **[Specific Fitness Goal]**.",
        instruction:
          "Develop a 30-day workout plan to achieve [Specific Fitness Goal]. Please write the plan in Japanese.",
      },
      eventPlanning: {
        prompt:
          "## Event Planning Checklist\n\nCreate a comprehensive checklist for planning a **[Type of Event]**, including **[Specific Details]**.",
        instruction:
          "Make a checklist for planning a [Type of Event], including [Specific Details]. Please write the checklist in Japanese.",
      },
      educationContent: {
        prompt:
          "## Educational Content\n\nDevelop a lesson plan for teaching **[Subject]** to **[Target Audience]**, including key topics and activities.",
        instruction:
          "Create a lesson plan for teaching [Subject] to [Target Audience], detailing key topics and activities. Please write the plan in Japanese.",
      },
      technicalDoc: {
        prompt:
          "## Technical Documentation\n\nWrite detailed technical documentation for **[Software/Tool]**, covering installation, usage, and troubleshooting.",
        instruction:
          "Write technical documentation for [Software/Tool], including installation, usage, and troubleshooting. Please write the documentation in Japanese.",
      },
      customerService: {
        prompt:
          "## Customer Service Response\n\nDear **[Customer Name]**, I'm sorry to hear about your experience with **[specific issue]**. We take such matters seriously and are committed to resolving this promptly. Our team is currently working on **[specific action]**. We appreciate your patience and will update you within **[time frame]**. Thank you for bringing this to our attention. Best regards, **[Your Name]**.",
        instruction:
          "Write a response to a customer about [specific issue], explaining the steps being taken and thanking them for their patience. Please write the response in Japanese.",
      },
      productReview: {
        prompt:
          "## Product Review\n\nWrite a detailed review of **[Product Name]**, highlighting its pros, cons, and overall performance. Include specific features and personal experiences.",
        instruction:
          "Write a detailed review of [Product Name], covering its pros, cons, and overall performance. Please write the review in Japanese.",
      },
    };

    this.shadowRoot
      .querySelector(".prompt-list")
      .addEventListener("click", (e) => this.openModal(e));
    this.shadowRoot
      .querySelector("#generate")
      .addEventListener("click", () => this.generatePrompt());
    this.shadowRoot
      .querySelector("#copy-prompt")
      .addEventListener("click", () => this.copyToClipboard());
  }

  openModal(e) {
    const templateName = e.target.getAttribute("data-template");
    if (templateName) {
      this.currentTemplate = this.templates[templateName];
      const dynamicFields = this.currentTemplate.prompt
        .match(/\[([^\]]+)\]/g)
        .map((field) => field.slice(1, -1));
      const modalContent = this.shadowRoot.querySelector("#modal-content");
      modalContent.innerHTML = dynamicFields
        .map(
          (field) =>
            `<label>${field}: <input type="text" data-field="${field}" /></label>`
        )
        .join("");
      this.shadowRoot.querySelector("#modal").classList.add("active");
    }
  }

  generatePrompt() {
    const inputs = this.shadowRoot.querySelectorAll("#modal-content input");
    let prompt = this.currentTemplate.prompt;
    inputs.forEach((input) => {
      const field = input.getAttribute("data-field");
      const value = input.value;
      prompt = prompt.replace(`[${field}]`, value);
    });
    this.shadowRoot.querySelector("#output").innerHTML = `${prompt
      .split("\n")
      .join("\n")}\n\n## Instruction\n\n${this.currentTemplate.instruction}`;
    this.shadowRoot.querySelector("#modal").classList.remove("active");
    this.shadowRoot.querySelector("#copy-prompt").style.display = "block";
  }

  copyToClipboard() {
    const promptText = this.shadowRoot.querySelector("#output").innerText;
    navigator.clipboard.writeText(promptText).then(() => {
      const copyButton = this.shadowRoot.querySelector("#copy-prompt");
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy to Clipboard";
      }, 2000);
    });
  }
}

customElements.define("prompt-generator", PromptGenerator);

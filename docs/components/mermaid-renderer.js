document.addEventListener("DOMContentLoaded", () => {
  const mermaidInput = document.getElementById("mermaid-input");
  const mermaidOutput = document.getElementById("mermaid-output");
  const renderButton = document.getElementById("render-button");

  renderButton.addEventListener("click", () => {
    const code = mermaidInput.value;
    renderMermaidDiagram(code);
  });

  function renderMermaidDiagram(code) {
    mermaidOutput.innerHTML = ""; // Clear previous content
    try {
      mermaid.mermaidAPI.render("graphDiv", code, (svgCode) => {
        mermaidOutput.innerHTML = svgCode;
      });
    } catch (error) {
      mermaidOutput.innerHTML = `<div class="error">${error.message}</div>`;
    }
  }

  // Render an initial diagram
  const initialCode = `erDiagram
    SystemConfig {
      int id PK
      varchar key UK
      varchar value
      text note
      int updatedEmployeeId
      datetime createdAt
      datetime updatedAt
    }`;
  mermaidInput.value = initialCode;
  renderMermaidDiagram(initialCode);
});

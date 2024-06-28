function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  elements.forEach((el) => {
    const file = el.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then((response) => response.text())
        .then((data) => {
          el.innerHTML = data;
          el.removeAttribute("data-include");
          includeHTML(); // 再帰的に呼び出すことで、入れ子のインクルードも処理する
        })
        .catch((error) => console.error("Error loading include file:", error));
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);

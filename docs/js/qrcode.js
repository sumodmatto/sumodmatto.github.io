document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("qrcode-form");
  const qrcodeContainer = document.getElementById("qrcode");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = document.getElementById("text").value;
    const size = document.getElementById("size").value;
    const errorCorrection = document.getElementById("errorCorrection").value;

    // Clear any existing QR code
    qrcodeContainer.innerHTML = "";

    // Generate the QR code
    new QRCode(qrcodeContainer, {
      text: text,
      width: parseInt(size),
      height: parseInt(size),
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel[errorCorrection],
    });
  });
});

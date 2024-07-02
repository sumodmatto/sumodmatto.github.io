document.addEventListener("DOMContentLoaded", () => {
  const clocks = document.querySelectorAll(".clock");
  const toggleButton = document.getElementById("toggle-display");
  let isAnalog = true;

  toggleButton.addEventListener("click", () => {
    isAnalog = !isAnalog;
    clocks.forEach((clock) => {
      const cityName = clock.getAttribute("data-city");
      clock.innerHTML = `<div class="city-name">${cityName}</div>`;
      if (isAnalog) {
        clock.classList.remove("digital");
        createAnalogClock(clock);
      } else {
        clock.classList.add("digital");
        createDigitalClock(clock);
      }
    });
  });

  function createAnalogClock(clock) {
    const clockFace = document.createElement("div");
    clockFace.classList.add("clock-face");

    const hourHand = document.createElement("div");
    hourHand.classList.add("hand", "hour");
    const minuteHand = document.createElement("div");
    minuteHand.classList.add("hand", "minute");
    const secondHand = document.createElement("div");
    secondHand.classList.add("hand", "second");

    clockFace.appendChild(hourHand);
    clockFace.appendChild(minuteHand);
    clockFace.appendChild(secondHand);

    clock.insertBefore(clockFace, clock.querySelector(".city-name"));

    let previousSecondDegrees = 0;

    function updateClock() {
      const timezone = clock.getAttribute("data-timezone");
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: timezone })
      );
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondDegrees = (seconds / 60) * 360 - 90;
      const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 - 90;
      const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30 - 90;

      if (Math.abs(secondDegrees - previousSecondDegrees) > 180) {
        secondHand.style.transition = "none";
      } else {
        secondHand.style.transition = "transform 0.5s ease-in-out";
      }

      secondHand.style.transform = `rotate(${secondDegrees}deg)`;
      minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;

      previousSecondDegrees = secondDegrees;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  function createDigitalClock(clock) {
    const digitalDisplay = document.createElement("div");
    digitalDisplay.classList.add("digital-display");
    clock.insertBefore(digitalDisplay, clock.querySelector(".city-name"));

    function updateClock() {
      const timezone = clock.getAttribute("data-timezone");
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: timezone })
      );
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      digitalDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  clocks.forEach((clock) => {
    const cityName = clock.getAttribute("data-city");
    clock.innerHTML = `<div class="city-name">${cityName}</div>`;
    if (isAnalog) {
      createAnalogClock(clock);
    } else {
      createDigitalClock(clock);
    }
  });
});

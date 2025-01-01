const form = document.getElementById("input");
const minuterie = document.getElementById("display-minuterie");
const hr = document.getElementById("hr");

// Countdown
const countDown = (minuteToSecond) => {
  let dateObj = new Date(minuteToSecond * 1000); // To milliseconds
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let seconds = dateObj.getSeconds();

  let format = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  minuterie.textContent = `${format}`;
};

// Submit
const handleSubmit = (e) => {
  e.preventDefault();

  const value = +e.target.minute.value;

  if (!value || value <= 0) {
    form.reset();
    return alert("Please enter (Minute) to countdown!");
  }

  // Undisplay form
  form.style.display = "none";
  hr.style.display = "none";
  form.reset();

  let minuteToSecond = value * 60;
  countDown(minuteToSecond);

  // Timer
  const timer = setInterval(() => {
    minuteToSecond--;

    if (minuteToSecond === 10) {
      minuterie.style.color = "orange";
    }

    if (minuteToSecond === 0) {
      clearInterval(timer);
      form.style.display = "block";
      hr.style.display = "block";
      minuterie.style.color = "";
    }

    countDown(minuteToSecond);
  }, 1000);
};

// Event listeners
form.addEventListener("submit", handleSubmit);
form.addEventListener("input", (e) => {
  if (+e.target.value < 1) {
    e.target.value = "";
    countDown(0 * 60);
    return;
  }

  countDown(+e.target.value * 60);
});

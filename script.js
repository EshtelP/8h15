let currentInput = "";
let activeField = null;

function openPicker(fieldId) {
  activeField = fieldId;
  currentInput = "";
  updateDisplay();
  document.getElementById("keypad").classList.remove("hidden");
}

function press(num) {
  if (currentInput.length >= 4) return;

  // auto-add 0 for impossible first digits (3–9)
  if (currentInput.length === 0 && num >= 3) {
    currentInput = "0" + num;
  } else {
    currentInput += num;
  }

  updateDisplay();
}

function updateDisplay() {
  let formatted = currentInput.padEnd(4, "_");
  let display = formatted.slice(0, 2) + ":" + formatted.slice(2, 4);
  document.getElementById("display").innerText = display;
}

function clearTime() {
  currentInput = "";
  updateDisplay();
}

function confirm() {
  if (currentInput.length !== 4) return;

  let time = currentInput.slice(0, 2) + ":" + currentInput.slice(2, 4);
  document.getElementById(activeField).value = time;

  document.getElementById("keypad").classList.add("hidden");

  calculate();
}

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTime(minutes) {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  return `${h}h${m.toString().padStart(2, "0")}`;
}

function calculate() {
  const start = document.getElementById("start").value;
  const breakStart = document.getElementById("breakStart").value;
  const breakEnd = document.getElementById("breakEnd").value;

  if (!start || !breakStart || !breakEnd) return;

  const morningWork = toMinutes(breakStart) - toMinutes(start);
  const remaining = (8 * 60 + 15) - morningWork;
  const endTime = toMinutes(breakEnd) + remaining;

  const result = document.getElementById("result");
  result.innerHTML =
    '8h15 reached at <span class="time-gradient">' +
    toTime(endTime) +
    "</span>";

  result.classList.remove("show");
  setTimeout(() => result.classList.add("show"), 30);
}

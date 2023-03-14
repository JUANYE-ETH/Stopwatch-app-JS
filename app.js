// HTML elements we need
const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const lapBtn = document.querySelector('.lap');
const resetBtn = document.querySelector('.reset');
const lapsList = document.querySelector('.laps');

// Set our initial values
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Format our time as hh:mm:ss
function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update the display with the elapsed time
function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

// Start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    }, 10);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Add a lap
function addLap() {
    const lapTime = elapsedTime;
    const formattedTime = formatTime(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${formattedTime}`;
    lapsList.appendChild(lapItem);
}

// Reset the timer
function resetTimer() {
    stopTimer();
    startTime = 0;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

// Add event listeners to the buttons
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'Start') {
        startTimer();
        startBtn.textContent = 'Stop';
    } else {
        stopTimer();
        startBtn.textContent = 'Start';
    }
});

lapBtn.addEventListener('click', () => {
    if (timerInterval) {
        addLap();
}
});

resetBtn.addEventListener('click', resetTimer);
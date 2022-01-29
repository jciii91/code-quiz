var timerEl = document.getElementById('timer');

function countdown() {
    var timeLeft = 75;

    var countdownInterval = setInterval(function() {
        if (timeLeft >= 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
        clearInterval(countdownInterval);
            alert("Time's up.")
        }
    },1000);
}

countdown();
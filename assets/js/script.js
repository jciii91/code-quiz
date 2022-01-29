var timerEl = document.getElementById('timer');

function countdown() {
    var timeLeft = 75;

    var countdownInterval = setInterval(function() {
        if (timeLeft >= 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
        clearInterval(countdownInterval);
        }
    },1000);
}

countdown();
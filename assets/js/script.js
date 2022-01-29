var openingText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
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

function fisherYatesShuffler(theArray) {
    shuffledArray = theArray;
    for (let i = shuffledArray.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = shuffledArray[i]
        shuffledArray[i] = shuffledArray[j]
        shuffledArray[j] = k
    }
    return shuffledArray;
}

function Quiz() {
    countdown();
    quizArray = fisherYatesShuffler(quizQuestions);
    $("#content-row").remove();
    $("#start-quiz").remove();
    $("#header-row").text(quizArray[0].question);
    for (let i=0;i<quizArray[0].answers.length;i++) {
        $("main").append("<div id=\"button-container\" class=\"row d-flex justify-content-center m-2\"><button class=\"btn\">" + quizArray[0].answers[i] + "</button></div>")
    }
}

$("#high-scores").on("click", function() {
    console.log("High Scores");
});

$("#start-quiz").on("click", function() {
    Quiz();
});

$("#content-row").text(openingText);
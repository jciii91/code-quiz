var openingText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
var timeLeft = 75;
var quizArray = fisherYatesShuffler(quizQuestions);
var counter = quizArray.length-1;
var timerEl = document.getElementById('timer');

function countdown() {

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

function loadQuestion(quizQuestion) {
    $("main").empty();
    $("main").append("<h2 id=\"header-row\" class=\"row col-lg-12 d-flex justify-content-center\">" + quizQuestion.question + "</h2>");
    for (let i=0;i<quizQuestion.answers.length;i++) {
        $("main").append("<div id=\"button-container\" class=\"row d-flex justify-content-center m-2\"><button class=\"btn answer-button\">" + quizQuestion.answers[i] + "</button></div>")
    }
}

function Quiz() {
    countdown();
    loadQuestion(quizArray[counter]);
}

$("#high-scores").on("click", function() {
    console.log("High Scores");
});

$("#start-quiz").on("click", function() {
    Quiz();
});

$("main").on("click",".answer-button",function () {
    if (this.textContent == quizArray[counter].correctAnswer) {
        counter--;
        loadQuestion(quizArray[counter]);
    } 
    else 
    {
        timeLeft -= 10;
        counter--;
        loadQuestion(quizArray[counter]);
    }
})

$("#content-row").text(openingText);
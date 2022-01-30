var openingText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
var timeLeft = 75;
var quizArray = fisherYatesShuffler(quizQuestions);
var counter = quizArray.length-1;
var score = 0;
var timerEl = document.getElementById('timer');

function countdown() {

    var countdownInterval = setInterval(function() {
        if (timeLeft >= 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval(countdownInterval);
            itIsOver();
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
    answersArray = fisherYatesShuffler(quizQuestion.answers)
    for (let i=0;i<answersArray.length;i++) {
        $("main").append("<div id=\"button-container\" class=\"row d-flex justify-content-center m-2\"><button class=\"btn answer-button\">" + answersArray[i] + "</button></div>")
    }
}

function Quiz() {
    countdown();
    loadQuestion(quizArray[counter]);
}

function itIsOver() {
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    score += timeLeft; 
    $("main").empty();
    $("main").append("<h2 id=\"header-row\" class=\"row col-lg-12 d-flex justify-content-center\">All done!</h2>");
    $("main").append("<p class=\"row col-lg-12 d-flex justify-content-center\">Your final score is " + score + "</p>");
    $("main").append("<div id=\"submission-container\" class=\"row col-lg-12 d-flex justify-content-center\"></div>");
    $("#submission-container").append("<div id=\"score-submission\" class=\"row d-flex align-items-center w-50\"></div>");
    $("#score-submission").append("<p class=\"col-lg-5 d-flex justify-content-end\"><span>Please enter your name: </span></p><input type=\"text\" id=\"username\" class=\"form-control col-lg-5\"><button id=\"submit-button\" class=\"btn m-1\">Submit</button></div>");
}

$("#high-scores").on("click", function() {
    console.log("High Scores");
});

$("#start-quiz").on("click", function() {
    Quiz();
});

$("main").on("click",".answer-button",function () {
    if (this.textContent == quizArray[counter].correctAnswer) 
    {
        counter--;
        score++;
        if (counter > 0 && timeLeft > 0) {
            loadQuestion(quizArray[counter]);
            $("main").append("<div class=\"row col-lg-12 d-flex justify-content-center\"><div class=\"w-50 border-top border-dark d-flex justify-content-center\"><p class=\"p-1\">The correct answer for the previous question is \"" + quizArray[counter+1].correctAnswer + "\"</p></div></div>");
        }
        else
        {
            itIsOver();
        }
    } 
    else 
    {
        timeLeft -= 10;
        counter--;
        if (counter > 0 && timeLeft > 0) 
        {
            loadQuestion(quizArray[counter]);
            $("main").append("<div class=\"row col-lg-12 d-flex justify-content-center\"><div class=\"w-50 border-top border-dark d-flex justify-content-center\"><p class=\"p-1\">The correct answer for the previous question is \"" + quizArray[counter+1].correctAnswer + "\"</p></div></div>");
        }
        else
        {
            itIsOver();
        }
    }
})

$("main").on("click", "#submit-button", function() {
    var playerObj = {
        name: $("#username").val(),
        score: score
    };
    var highScores = localStorage.getItem("myScores");
    if (highScores != null) {
        parsedScores = JSON.parse(highScores);
        if (parsedScores.length < 10) {
            parsedScores.push(playerObj);
            localStorage.setItem("myScores",JSON.stringify(parsedScores));
        } else {
            var replaceIndex = -1;
            for (var i = 0;i<parsedScores.length;i++) {
                if (parsedScores[i].score < playerObj.score) {
                    replaceIndex = i;
                }
            }
            if (replaceIndex > -1) {
                parsedScores[i] = playerObj;
                localStorage.setItem("myScores",JSON.stringify(parsedScores));
            }
        }
    } else {
        highScores = [playerObj];
        localStorage.setItem("myScores",JSON.stringify(highScores));
    }
});

$("#content-row").text(openingText);
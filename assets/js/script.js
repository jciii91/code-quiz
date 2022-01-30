//global variables
var openingText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
var timeLeft = 75;
var quizArray = fisherYatesShuffler(quizQuestions);
var counter = quizArray.length-1;
var score = 0;
var timerEl = document.getElementById('timer');

//timer function
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

//shuffler so that questions and answers don't always appear in the same order
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

//gets next question to display
function loadQuestion(quizQuestion) {
    $("main").empty();
    $("main").append("<h2 id=\"header-row\" class=\"row col-lg-12 d-flex justify-content-center\">" + quizQuestion.question + "</h2>");
    answersArray = fisherYatesShuffler(quizQuestion.answers)
    for (let i=0;i<answersArray.length;i++) {
        $("main").append("<div id=\"button-container\" class=\"row d-flex justify-content-center m-2\"><button class=\"btn answer-button\">" + answersArray[i] + "</button></div>")
    }
}

//initiates the quiz, starts the timer
function Quiz() {
    timeLeft = 75;
    quizArray = fisherYatesShuffler(quizQuestions);
    counter = quizArray.length-1;
    score = 0;
    countdown();
    loadQuestion(quizArray[counter]);
}

//after quiz concludes display text input to take user's name
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

//function to show scores either post name submission or when user clicks on View High Scores
function showScores() {
    $("main").empty();
    $("main").append("<div id=\"header-row\" class=\"row\"></div>");
    $("#header-row").append("<div id=\"header-row-columns\" class=\"col-lg-12 d-flex justify-content-center\"></div>");
    $("#header-row-columns").append("<h2>High Scores</h2>");

    $("main").append("<div id=\"scores-container\" class=\"row d-flex justify-content-center\"></div>");
    $("#scores-container").append("<div id=\"scores-table\" class=\"w-25 d-flex justify-content-center\"></div>");
    $("#scores-table").append("<div id=\"names-column\" class=\"col-lg-6 d-flex justify-content-start\"></div>");
    $("#names-column").append("<p>Names</p>");
    $("#scores-table").append("<div id=\"scores-column\" class=\"col-lg-6 d-flex justify-content-end\"></div>");
    $("#scores-column").append("<p>Scores</p>");

    scores = JSON.parse(localStorage.getItem("myScores"));
    if (scores != null) {
        //sorts high scores from highest to lowest
        scores.sort(function(a,b) {
            return b.score - a.score;
        });
        for (var i = 0;i<scores.length;i++) {
            $("main").append("<div id=\"scores-container" + i + "\" class=\"row d-flex justify-content-center\"></div>");
            $("#scores-container" + i).append("<div id=\"scores-table" + i + "\" class=\"w-25 d-flex justify-content-center\"></div>");
            $("#scores-table" + i).append("<div id=\"name" + i + "\" class=\"col-lg-6 d-flex justify-content-start\"></div>");
            $("#name" + i).append("<p>" + scores[i].name + "</p>");
            $("#scores-table" + i).append("<div id=\"score" + i + "\" class=\"col-lg-6 d-flex justify-content-end\"></div>");
            $("#score" + i).append("<p>" + scores[i].score + "</p>");
        }
    }

    //buttons to clear scores or return to starting page
    $("main").append("<div id=\"button-container\" class=\"row d-flex justify-content-center\"></div>");
    $("#button-container").append("<div id=\"buttons\" class=\"w-25 d-flex justify-content-center\"></div>");
    $("#buttons").append("<button id=\"clear-button\" class=\"btn m-1\">Clear Scores</button>");
    $("#buttons").append("<button id=\"return-button\" class=\"btn m-1\">Return</button>");
}

//listener to view scores
$("#high-scores").on("click", function() {
    showScores();
});

//listener to begin quiz
$("main").on("click", "#start-quiz", function() {
    Quiz();
});

//listener to determine which answer was selected
$("main").on("click",".answer-button",function () {
    //correct answer adds to score, checks if time is left
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
            timeLeft = 0;
            itIsOver();
        }
    }
    //if the answer is incorrect, takes away time remaining and checks if time is left
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

//listener for submission of name post-quiz
$("main").on("click", "#submit-button", function() {
    //does not accept empty strings
    if ($("#username").val() == "") {
        return;
    }
    var playerObj = {
        name: $("#username").val(),
        score: score
    };
    var highScores = localStorage.getItem("myScores");
    //if no previous scores are stored, create an array to hold them
    if (highScores != null) {
        parsedScores = JSON.parse(highScores);
        if (parsedScores.length < 10) {
            parsedScores.push(playerObj);
            localStorage.setItem("myScores",JSON.stringify(parsedScores));
        //if previous are found, check if new score is better than any of them
        } else {
            var replaceIndex = -1;
            for (var i = 0;i<parsedScores.length;i++) {
                if (parsedScores[i].score < playerObj.score) {
                    replaceIndex = i;
                }
            }
            //if new score beats a top 10 score then add it to the list, remove lowest score
            if (replaceIndex > -1) {
                parsedScores.push(playerObj);
                parsedScores.sort(function(a,b) {
                    return b.score - a.score;
                });
                parsedScores.pop();
                localStorage.setItem("myScores",JSON.stringify(parsedScores));
            }
        }
    } else {
        highScores = [playerObj];
        localStorage.setItem("myScores",JSON.stringify(highScores));
    }
    showScores();
});

//listener for clearing the scores from localStorage
$("main").on("click", "#clear-button", function() {
    localStorage.removeItem("myScores");
    $("main").empty();
    $("main").append("<h2 id=\"header-row\" class=\"row col-lg-12 d-flex justify-content-center\">Coding Quiz Challenge</h2><p id=\"content-row\" class=\"row col-lg-12 d-flex justify-content-center\"></p><div id=\"button-container\" class=\"row d-flex justify-content-center\"><button id=\"start-quiz\" class=\"btn\">Start Quiz</button></div>");
    $("#content-row").text(openingText);
});

//listener for returning to starting screen
$("main").on("click", "#return-button", function() {
    $("main").empty();
    $("main").append("<h2 id=\"header-row\" class=\"row col-lg-12 d-flex justify-content-center\">Coding Quiz Challenge</h2><p id=\"content-row\" class=\"row col-lg-12 d-flex justify-content-center\"></p><div id=\"button-container\" class=\"row d-flex justify-content-center\"><button id=\"start-quiz\" class=\"btn\">Start Quiz</button></div>");
    $("#content-row").text(openingText);
});

$("#content-row").text(openingText);
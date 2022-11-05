var QUESTIONS = [
  {
    question: "Commonly used data types do not include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an If / else statement is enclosed with ___.",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store ___.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all the above",
    ],
    answer: "all the above",
  },
  {
    question:
      "String values must be enclosed within ___ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
];
//variables
var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#start_button");
var introPage = document.querySelector("#intro_page");

var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial = document.querySelector("#initial");

var submitBtn = document.querySelector("#submit_btn");
var highScorePage = document.querySelector("#highscore_page");
var scoreRecord = document.querySelector("#score_record");
var scoreCheck = document.querySelector("#score_check");
var finish = document.querySelector("#finish");

var backBtn = document.querySelector("#back_btn");
var clearBtn = document.querySelector("#clear_btn");

var timeLeft = document.getElementById("timer");

var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

//timer
function countdown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeLeft.textContent = "Time left: " + secondsLeft + " s";

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timeLeft.textContent = "Time is up!";
      finish.textContent = "Time is up!";
      gameOver();
    } else if (questionCount >= QUESTIONS.length + 1) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

//when I click the start button
function startQuiz() {
  introPage.style.display = "none";
  questionPage.style.display = "block";
  questionNumber = 0;
  countdown();
  showQuestion(questionNumber);
}
//then the question and answer options show up
function showQuestion(n) {
  askQuestion.textContent = QUESTIONS[n].question;
  answerBtn1.textContent = QUESTIONS[n].choices[0];
  answerBtn2.textContent = QUESTIONS[n].choices[1];
  answerBtn3.textContent = QUESTIONS[n].choices[2];
  answerBtn4.textContent = QUESTIONS[n].choices[3];
  questionNumber = n;
}

//when I answer a question
//it shows if it was correct or wrong
function checkAnswer(event) {
  event.preventDefault();
  checkLine.style.display = "block";
  setTimeout(function () {
    checkLine.style.display = "none";
  }, 1000);

  if (QUESTIONS[questionNumber].answer == event.target.value) {
    checkLine.textContent = "Correct!";
    totalScore = totalScore + 1;
  } else {
    secondsLeft = secondsLeft - 10;
    checkLine.textContent =
      "Wrong! The correct answer is " + QUESTIONS[questionNumber].answer + " .";
  }
  //next question
  if (questionNumber < QUESTIONS.length - 1) {
    showQuestion(questionNumber + 1);
  } else {
    gameOver();
  }
  questionCount++;
}
//when all questions are answered or the timer reaches 0
//then it show my final score
function gameOver() {
  questionPage.style.display = "none";
  scoreBoard.style.display = "block";
  console.log(scoreBoard);
  finalScore.textContent = "Your final score is :" + totalScore;
  //reset timer
  timeLeft.style.display = "none";
}

function getScore() {
  var currentList = localStorage.getItem("ScoreList");
  if (currentList !== null) {
    freshList = JSON.parse(currentList);
    return freshList;
  } else {
    freshList = [];
  }
  return freshList;
}

//display data on final score page
function renderScore() {
  scoreRecord.innerHTML = "";
  scoreRecord.style.display = "block";
  var highScores = sort();
  var topFive = highScores.slice(0, 5);
  for (var i = 0; i < topFive.length; i++) {
    var item = topFive[i];
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
  }
}

function sort() {
  var unsortedList = getScore();
  if (getScore == null) {
    return;
  } else {
    unsortedList.sort(function (a, b) {
      return b.score - a.score;
    });
    return unsortedList;
  }
}

//local storage
function addItem(n) {
  var addedList = getScore();
  addedList.push(n);
  localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

function saveScore() {
  var scoreItem = {
    user: userInitial.value,
    score: totalScore,
  };
  addItem(scoreItem);
  renderScore();
}

//add eventlisteners on buttons
startBtn.addEventListener("click", startQuiz);
//console.log(startBtn);
reactButtons.forEach(function (click) {
  click.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  scoreBoard.style.display = "none";
  introPage.style.display = "none";
  highScorePage.style.display = "block";
  questionPage.style.display = "none";
  saveScore();
});

scoreCheck.addEventListener("click", function (event) {
  event.preventDefault();
  scoreBoard.style.display = "none";
  introPage.style.display = "none";
  highScorePage.style.display = "block";
  questionPage.style.display = "none";
  renderScore();
});

backBtn.addEventListener("click", function (event) {
  event.preventDefault();
  scoreBoard.style.display = "none";
  introPage.style.display = "block";
  highScorePage.style.display = "none";
  questionPage.style.display = "none";
  location.reload();
});

clearBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  renderScore();
});

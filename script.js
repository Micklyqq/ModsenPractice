"use strict";
const questions = [
  {
    question: "What is the capital of France?",
    options: ["New York", "London", "Paris", "Dublin"],
    answer: "Paris",
    multipleAnswers: false,
  },
  {
    question: "Which of these characters are friends with Harry Potter?",
    options: [
      "Ron Weasley",
      "Draco Malfoy",
      "Hermione Granger",
      "Lord Voldemort",
    ],
    answer: ["Ron Weasley", "Hermione Granger"],
    multipleAnswers: true,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Volga"],
    answer: "Nile",
    multipleAnswers: false,
  },
  {
    question: "How many chromosomes are in the human genome? ",
    options: ["42", "44", "46", "47"],
    answer: "46",
    multipleAnswers: false,
  },
];
let currentQuestionNumber = Number(
  document.querySelector(".currentQuestionNumber").firstElementChild.textContent
);
let correctAnwer = 0;
let wronAnswer = 0;
let block = false;
let severalAnswersBlock = false;
let countPickQuesion = 0;
Timer();

document.querySelector(".nextQuestion").onclick = questionSelector;
document.querySelector(".answerOne").onclick = questionValidation;
document.querySelector(".answerTwo").onclick = questionValidation;
document.querySelector(".answerThree").onclick = questionValidation;
document.querySelector(".answerFour").onclick = questionValidation;

function questionSelector() {
  if (questions[currentQuestionNumber].multipleAnswers == true) {
    multiselectModal();
  }
  if (block == false) {
    alert("Answer the question!");
    return;
  }
  currentQuestionNumber++;
  document.querySelector(
    ".currentQuestionNumber"
  ).firstElementChild.textContent = currentQuestionNumber;
  document.querySelector(".currentQuestion").textContent =
    questions[currentQuestionNumber - 1].question;

  document.querySelector(".answerOne").textContent =
    questions[currentQuestionNumber - 1].options[0];
  document.querySelector(".answerTwo").textContent =
    questions[currentQuestionNumber - 1].options[1];
  document.querySelector(".answerThree").textContent =
    questions[currentQuestionNumber - 1].options[2];
  document.querySelector(".answerFour").textContent =
    questions[currentQuestionNumber - 1].options[3];

  if (currentQuestionNumber == 4) {
    document.querySelector(".nextQuestion").textContent = "Finish Quiz";
    document.querySelector(".nextQuestion").onclick = endQuiz;
  }
  if (block == true) {
    document.querySelector(".answerOne").style.background = "#2d376a";
    document.querySelector(".answerTwo").style.background = "#2d376a";
    document.querySelector(".answerThree").style.background = "#2d376a";
    document.querySelector(".answerFour").style.background = "#2d376a";
    block = false;
  }
}

function questionValidation() {
  if (
    questions[currentQuestionNumber - 1].multipleAnswers == true &&
    block == false
  ) {
    for (let elem of questions[currentQuestionNumber - 1].answer) {
      if (this.textContent == elem) {
        this.style.background = "green";
        severalAnswersBlock = true;
        countPickQuesion++;
      }
    }
    if (
      countPickQuesion == questions[currentQuestionNumber - 1].answer.length
    ) {
      block = true;
      correctAnwer++;
    }
    if (severalAnswersBlock == false) {
      wronAnswer++;
      this.style.background = "red";
      block = true;
    }
    severalAnswersBlock = false;
  } else if (questions[currentQuestionNumber - 1].multipleAnswers == false) {
    if (
      this.textContent == questions[currentQuestionNumber - 1].answer &&
      block == false
    ) {
      correctAnwer++;
      this.style.background = "green";
      block = true;
    }
    if (
      this.textContent != questions[currentQuestionNumber - 1].answer &&
      block == false
    ) {
      wronAnswer++;
      this.style.background = "red";
      block = true;
    }
  }
}
function endQuiz() {
  document.body.firstElementChild.innerHTML =
    document.body.querySelector(".quizResults").innerHTML;
  document.querySelector(".correctAnswers").firstElementChild.textContent =
    String(correctAnwer);
  document.querySelector(".wrongAnswers").firstElementChild.textContent =
    String(wronAnswer);
  document.querySelector(".restartButton").onclick = function () {
    location.reload();
  };
}

function modalTimeOut() {
  document.body.firstElementChild.innerHTML =
    document.getElementById("timeOutModal").innerHTML;
  document.getElementById("timeOutModal").removeAttribute("hidden");
  document.body.querySelector(".showResultsButton").onclick = endQuiz;
  document.querySelector(".restartButton").onclick = function () {
    location.reload();
  };
}

function multiselectModal() {
  document.getElementById("multiselectModal").removeAttribute("hidden");
  document.querySelector(".understandIt").onclick = function () {
    document.getElementById("multiselectModal").setAttribute("hidden", "true");
  };
}

function Timer() {
  let minutes = 5;
  let seconds = 0;
  let block = false;

  let timerId = setTimeout(function countdown() {
    if (seconds == 0 && minutes != 0) {
      minutes--;
      seconds = 59;
    }
    if (minutes == 0 && seconds == 0 && block == true) {
      clearTimeout(timerId);
      modalTimeOut();
    }
    if (seconds == 0 && minutes == 0) {
      seconds = 59;
      block = true;
    }
    if (seconds < 10) {
      document.querySelector(".minutes").textContent = minutes;
      document.querySelector(".seconds").textContent = "0" + `${seconds}`;
    } else {
      document.querySelector(".minutes").textContent = minutes;
      document.querySelector(".seconds").textContent = seconds;
    }
    seconds--;
    timerId = setTimeout(countdown, 1000);
  }, 1000);
}

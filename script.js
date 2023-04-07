"use strict"
const questions =[
    {
  
        question: "What is the capital of France?",
        options: ["New York","London","Paris","Dublin"],
        answer:"Paris"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto","Ottawa","Vancouver","Dublin"],
        answer:"Ottawa"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Nile","Amazon","Yangtze","Volga"],
        answer:"Nile"
    },
    {
        question: "How many chromosomes are in the human genome? ",
        options: ["42","44","46","47"],
        answer:"46"
    },  
] 
let currentQuestionNumber = Number(document.querySelector(".currentQuestionNumber").firstElementChild.textContent);
let correctAnwer = 0;
let wronAnswer = 0;
let block = false;
document.querySelector(".nextQuestion").onclick = questionSelector;
document.querySelector(".answerOne").onclick = questionValidation;
document.querySelector(".answerTwo").onclick = questionValidation;
document.querySelector(".answerThree").onclick = questionValidation;
document.querySelector(".answerFour").onclick = questionValidation;

function questionSelector(){
    if(block == false){
        alert("Answer the question!");
        return;
    }
    currentQuestionNumber++;
    document.querySelector(".currentQuestionNumber").firstElementChild.textContent = currentQuestionNumber;
    document.querySelector(".currentQuestion").textContent = questions[currentQuestionNumber-1].question;

    document.querySelector(".answerOne").textContent = questions[currentQuestionNumber-1].options[0];
    document.querySelector(".answerTwo").textContent= questions[currentQuestionNumber-1].options[1];
    document.querySelector(".answerThree").textContent= questions[currentQuestionNumber-1].options[2];
    document.querySelector(".answerFour").textContent= questions[currentQuestionNumber-1].options[3];

    

        if(currentQuestionNumber ==4){
        document.querySelector(".nextQuestion").textContent = "Finish Quiz";
        document.querySelector(".nextQuestion").onclick = endQuiz;
        }
        if(block == true){
            document.querySelector(".answerOne").style.background = "#2d376a";
            document.querySelector(".answerTwo").style.background = "#2d376a";
            document.querySelector(".answerThree").style.background = "#2d376a";
            document.querySelector(".answerFour").style.background = "#2d376a";
            block = false;
        }
}

function questionValidation(){
   if(this.textContent == questions[currentQuestionNumber-1].answer && block == false){
    correctAnwer++
    this.style.background = "green";
    block = true;
   }
   if(this.textContent != questions[currentQuestionNumber-1].answer && block == false){
    wronAnswer++;
    this.style.background = "red";
    block = true;
   }
}
function endQuiz(){
document.body.firstElementChild.innerHTML = document.body.querySelector(".quizResults").innerHTML;
document.querySelector(".correctAnswers").firstElementChild.textContent = String(correctAnwer);
document.querySelector(".wrongAnswers").firstElementChild.textContent = String(wronAnswer);
document.querySelector(".restartButton").onclick = function(){

}
}








// Quiz constants
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const form = document.getElementById("score");

//Questions:
let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Correct",
        choiceB : "Wrong",
        choiceC : "Wrong",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "Wrong",
        choiceB : "Wrong",
        choiceC : "Correct",
        correct : "C"
    }
];

// Quiz and Countdown variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
let TIMER;

//Initial start page to remove buttons
function startPage () {
  document.getElementById('A').hidden = true;
  document.getElementById('B').hidden = true;
  document.getElementById('C').hidden = true;
  document.getElementById('score').hidden = true;
}


//Display question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<h1>"+ q.question +"</h1>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;

    check.innerHTML="";
};

//Start --> Display first question and start timer
function startQuiz(){
    renderQuestion();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
    document.getElementById('A').hidden = false;
    document.getElementById('B').hidden = false;
    document.getElementById('C').hidden = false;
};

//Countdown
function renderCounter(){
    if(count >= 0){
        counter.innerHTML = count;
        count--;
    }else{
        if(runningQuestion > lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
        };
    };
};

//Correct answer conditions
function answerIsCorrect(){
  document.getElementById(runningQuestion);
  document.getElementById("check").innerHTML = "Correct!!";
};

//Wrong answer conditions
function answerIsWrong(){
  document.getElementById(runningQuestion);
  document.getElementById("check").innerHTML = "Wrong!!";
  count-=5;
};

//Check answer loop function; loop to progress questions after click event and remove elements at end.
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        answerIsCorrect();
    }else{
        answerIsWrong();
    };

    if(runningQuestion < lastQuestion){
        runningQuestion++;
        setTimeout(renderQuestion, 500);
    }else{
      document.getElementById("A").disabled = true;
      document.getElementById("B").disabled = true;
      document.getElementById("C").disabled = true;
      function removeQuiz(){
        quiz.remove();
      }
      document.getElementById('score').hidden = false;
      finalScore();
      setTimeout(removeQuiz,1000);
      startBtn.remove();
    };
};

//Render final score in the form element
function finalScore () {
  clearInterval(TIMER);
  document.getElementById('timeText').innerHTML = count;
};

//Restart quiz function to reload page
function restartQuiz() {
  location.reload();
};

//Start Quiz --> start button
startBtn.addEventListener("click",startQuiz);

//Restart Quiz --> retry button
retryBtn.addEventListener("click",restartQuiz);

//Clear page on load
window.addEventListener('load',startPage);


//Saving scores to local storage and sorting highscores to choose top 3
const initials = document.getElementById('initials');
const saveScoreBtn = document.getElementById('submitBtn');
const finalScoreText = document.getElementById('timeText');


const saveHighScore = (event) => {
    const score = {
        scoreTime: finalScoreText.textContent,
        name: initials.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.scoreTime - a.scoreTime);
    localStorage.setItem('highScores', JSON.stringify(highScores));
};

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores);

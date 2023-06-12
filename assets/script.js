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
        question : "Inside which HTML element do we put the JavaScript?",
        choiceA : "< " + "js" + " >",
        choiceB : "< " + "script" + " >",
        choiceC : "< " + "javascript" + " >",
        correct : "B"
    },{
        question : "Where is the correct place to insert a JavaScript?",
        choiceA : "The < head > section",
        choiceB : "The < body > section",
        choiceC : "The < footer > section",
        correct : "B"
    },{
        question : "The external JavaScript file must contain the < script > tag.",
        choiceA : "True",
        choiceB : "False",
        choiceC : "Just subtract 5 :'(",
        correct : "B"
    },{
        question : "How do you write 'string' in an alert box?",
        choiceA : "alert();",
        choiceB : "alertBox();",
        choiceC : "prompt();",
        correct : "A"
    },{
        question : "How do you create a function in JavaScript?",
        choiceA : "function = myFunction();",
        choiceB : "function myFunction()",
        choiceC : "function myFunction() {}",
        correct : "C"
    },{
        question : "How do you call a function named 'myFunction'?",
        choiceA : "call myFunction()",
        choiceB : "function myFunction()",
        choiceC : "myFunction()",
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
  document.getElementById('quiz').hidden = true;
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
    document.getElementById('quiz').hidden = false;
    document.getElementById('startBtn').hidden=true;
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

//Saving scores to local storage and sorting highscores
const initials = document.getElementById('initials');
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

//Rendering highscores from the local storage and displaying in the popover
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//Dislay 1st place
document.getElementById("firstInitial").textContent = highScores[0].name;
document.getElementById("firstScore").textContent = highScores[0].scoreTime;

//Display 2nd place
document.getElementById("secondInitial").textContent = highScores[1].name;
document.getElementById("secondScore").textContent = highScores[1].scoreTime;

//Display 3rd place
document.getElementById("thirdInitial").textContent = highScores[2].name;
document.getElementById("thirdScore").textContent = highScores[2].scoreTime;

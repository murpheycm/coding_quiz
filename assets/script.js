// //Timer Element
//     var timerEl = document.getElementById('countdown');
    // var gameOverMsg = document.getElementById('gameOverMsg');

    // var message ='GAME OVER ';
    // var words = message.split(' ');

//     function countdown() {
//         var timeLeft = 2;
//         var timeInterval = setInterval (function () {
//             if(timeLeft > 1){
//             timerEl.textContent = timeLeft + " seconds";
//             timeLeft--;
//             } else if(timeLeft === 1){
//                 timerEl.textContent = timeLeft + " second";
//                 timeLeft--;
//             } else {
//                 timerEl.textContent = '';
//                 clearInterval(timeInterval);
//                 displayMessage();
//             }
//         },1000);
//         startBtn.addEventListener("click", countdown);
//       }

// //Game Over Message
    // function displayMessage() {
    //     var wordCount = 0;
    //     var msgInterval = setInterval(function () {
    //     // If there are no more words left in the message
    //     if (words[wordCount] === undefined) {
    //         clearInterval(msgInterval);
    //     } else {
    //         // Display one word of the message
    //         gameOverMsg.textContent = words[wordCount];
    //         wordCount++;
    //     }
    //     }, 1000);
    //   };
    
//     startBtn.addEventListener("click", countdown);






// Question Elements

// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");


// create our questions
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





// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 60;
let TIMER;


// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

startBtn.addEventListener("click",startQuiz);





// start quiz
function startQuiz(){
    renderQuestion();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
};

// counter render
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
        }
    }
};


// checkAnwer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        answerIsCorrect();
    }else{
        // var adjCount = count-5;
        // adjCount--;
        answerIsWrong();
    };

    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        location.reload();
    };
};

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion);
    document.getElementById("check").innerHTML = "Correct!!";
};

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion);
    document.getElementById("check").innerHTML = "Wrong!!";
};


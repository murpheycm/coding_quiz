//Timer Element

    var timerEl = document.getElementById('countdown');
    var mainEl = document.getElementById('main');

    var message ='GAME OVER';
    var words = message.split(' ');

    function countdown() {
        var timeLeft = 60;
        var timeInterval = setInterval (function () {
            if(timeLeft > 1){
            timerEl.textContent = timeLeft + " seconds";
            timeLeft--;
            } else if(timeLeft === 1){
                timerEl.textContent = timeLeft + " second";
                timeLeft--;
            } else {
                timerEl.textContent = '';
                clearInterval(timeInterval);
                displayMessage();
            }
        },1000);
    }

//Game Over Message
    function displayMessage() {
        var wordCount = 0;
        var msgInterval = setInterval(function () {
        // If there are no more words left in the message
        if (words[wordCount] === undefined) {
            clearInterval(msgInterval);
        } else {
            // Display one word of the message
            mainEl.textContent = words[wordCount];
            wordCount++;
        }
        }, 1000);
    }
    
    startBtn.addEventListener("click", countdown);
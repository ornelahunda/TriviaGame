// Declare two arrays:
// One to hold questions and one to hold answers
var questionArray = ["Computers process data into information by working exclusively with:",
    "A string of eight 0s and 1s is called a:",
    "What type of connection is DSL"];

var answerArray = [["Multimedia", "Words", "Characters", "Numbers"],
["Megabyte", "Byte", "Kilobyte", "Gigabyte"],
["Network","Wirelesss", "Slow", "Broadband"]];

// Create two variables that are going to hold the correct answers 
// and the image related to the answer.
var correctAnswers = [];
var imageArray = [];

var timeCounter = 30;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time;

// start button 

$("body").on("click", ".start-button", function(event){
	// event.preventDefault(); 
	generateHTML();
	timer();

});

// answering function

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); 
function reset() {
    counter = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    timeCounter = 30;
    generateHTML();
    timer();
}


function timer() { 
   time = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (timeCounter === 0) {
			clearInterval(time);
			generateLossDueToTimeOut();
		}
		if (timeCounter > 0) {
			counter--;
		}
		$(".timer").html(timeCounter);
	}

}
function unansweredQuestions() {
	unanswered++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function win() {
	correct++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function loss() {
	incorrect++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function end() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

// Declare two arrays:
// One to hold questions and one to hold answers
var questionArray =[
 "Who developed the Difference Engine and Analytical Engine, two punched-card controlled general purpose calculators?",
    "Who co-invented the TCP/IP Internet protocol in 1973?",
    "Who developed PHP?",
    "Who is chairman, CEO and founder of America Online?",
    "Who is the inventor of the C++ programming language?",
    "Who was the father of Hypertext",
    "Who created the Mosaic Browser and was co-founder of Netscape Communications?"];


var answerArray = [
["Konrad Zuse", "Charles Babbage", "Alan Turing", "George Boole"],
["Bjarne Stroustrup", "Rasmus Lerdorf", "Sabeer Bhatia", "Vint Cerf"],
["Phil Zimmermann","Linus Torvalds", "Rasmus Lerdorf", "Larry Wall"],
["Larry Ellison", "Jerry Jang", "Steve Case", "Jeff Bezos"],
["Charles Goldfarb","Bjarne Stroustrup","Ray Tomlinson","Phil Zimmermann"],
["Larry Wall","Dough Englebart","Linus Torvalds","Ted Nelson"],
["Dennis Ritchie", "Paul Alen","Marc Andreessen", "Doug Englebart"]
];

// Create two variables that are going to hold the correct answers 
// and the image related to the answer.
var correctAnswer = ["B. Charles Babbage",
                      "D. Vint Cerf",
                      "C. Rasmus Lerdorf",
                      "C. Steve Case",
                      "B. Bjarne Stroustrup",
                      "D. Ted Nelson",
                      "C. Marc Andreessen",
                    ];
var imageArray = ["<img class='center-block img-right' src='assets/images/babbage.jpeg'>",
"<img class='center-block img-right' src='assets/images/cerf.jpeg'>",
"<img class='center-block img-right' src='assets/images/rasmus.jpg'>",
"<img class='center-block img-right' src='assets/images/case.jpg'>",
"<img class='center-block img-right' src='assets/images/bjarne.jpg'>",
"<img class='center-block img-right' src='assets/images/ted.jpd'>",
"<img class='center-block img-right' src='assets/images/marc.jpg'>"];


// This variables will hold the html 
var start;
var change;
var end;

// seconds counter, variable to count questions, variables to count answers, selected answer
var timeCounter = 30;

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time;
var selectedAnswer;
var questionNr=0;

//Starting game function.

$(document).ready(function () {

function startHtml() {
start=$("<p class='text-center main-button-container'><a class='btn btn-primary btn-lg start-button' href='#' role='button'>Start </a></p>");
var pTag =$("<p class='text center'>");
pTag.text("this is a jquery ptag");
	$(".mainArea").html(start);
}
startHtml();

//This function will generate the html content after clicking on start button, and also starting the timer


$("body").on("click", ".start-button", function(event){
  
    changeHtml();
	timer();

});


// answering function

$("body").on("click", ".answer", function(event){


	selectedAnswer = $(this).text();
	console.log(selectedAnswer);
	console.log(correctAnswer[questionNr]);
	if(selectedAnswer === correctAnswer[questionNr]) {
	

		clearInterval(time);
		win();
		
	}
	else {
		
		clearInterval(time);
		loss();
	}
});


$("body").on("click", ".reset-button", function(event){
	reset();
}); 

});

// creating different functions which we need to utilize in our main function above

function reset() {
    timeCounter = 30;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    questionNr = 0;
  changeHtml();
    timer();
}

// Function timer is needed to set a time for each question and reseting time 
// accorting to the game functionality.
function timer() {  
   time = setInterval(seconds, 1000);
	function seconds() {
		if (timeCounter === 0) {
			clearInterval(time);
			unansweredQuestions();
		}
		if (timeCounter > 0) {
			timeCounter--;
		}
		$(".timer").html(timeCounter);
	}

}


// When user does not answer
function unansweredQuestions() {
	unanswered++;
   change = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " +correctAnswer[questionNr] + "</p>" + "<img class='center-block img-wrong' src='assets/images/ximage.jpg'>";
	$(".mainArea").html(change);
	setTimeout(end, 3000); 
}
// When user does guesses correctly
function win() {
	correct++;
	change = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswer[questionNr] + "</p>" + imageArray[questionNr];
	$(".mainArea").html(change);
	setTimeout(end, 3000); 
}
//// When user does guess is wrong
function loss() {
	incorrect++;
	change = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswer[questionNr] + "</p>" + "<img class='center-block img-wrong' src='assets/images/ximage.jpg'>";
	$(".mainArea").html(change); 
	setTimeout(end, 3000); 
}

// Html for different questions
function changeHtml() {
var i=0;
	change ="<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionNr] + "</p><p class='first-answer answer'> A. " + answerArray[questionNr][i]+ "</p><p class='answer'>B. "+answerArray[questionNr][i+1]+"</p><p class='answer'>C. "+answerArray[questionNr][i+2]+"</p><p class='answer'>D. "+answerArray[questionNr][i+3]+"</p>";
	$(".mainArea").html(change);
}


function end() {
	if (questionNr < 7) {
	questionNr++;
	changeHtml();
	timeCounter = 30;
	timer();
	}
	else {
		endHtml();
	}
}

// displays the results
function endHtml() {
	end = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>Your results:" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" + "<p>Wrong Answers: " + incorrect + "</p>" + "<p>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(end);
}
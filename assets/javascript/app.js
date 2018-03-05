// Declare two arrays:
// One to hold questions and one to hold answers
var questionArray =[
 "Who developed the Difference Engine and Analytical Engine, two punched-card controlled general purpose calculators?",
    "Who co-invented the TCP/IP Internet protocol with Vint Cerf in 1973?",
    "Who developed PHP?",
    "Who is chairman, CEO and founder of America Online?",
    "Who is the inventor of the C++ programming language?",
    "Who was the father of Hypertext",
    "Who created the Mosaic Browser and was co-founder of Netscape Communications?"
];

var answerArray = [
["Konrad Zuse", "Charles Babbage", "Alan Turing", "George Boole"],
["Bjarne Stroustrup", "Rasmus Lerdorf", "Sabeer Bhatia", "Vint Cerf"],
["Phil Zimmermann","Linus Torvalds", "Rasmus Lerdorf", "Larry Wall"],
["Larry Ellison", "Jerry Jang", "Steve Case", "jeff Bezos"],
["Charles Goldfarb","Bjarne Stroustrup","Ray Tomlinson","Phil Zimmermann"],
["Larry Wall","Dough Englebart","Linus Torvalds","Ted Nelson"],
["Dennis Ritchie", "Paul Alen","Marc Andreessen", "Doug Englebart"]
];

// Create two variables that are going to hold the correct answers 
// and the image related to the answer.
var correctAnswers = ["B.Charles Babbage",
                      "D.Vint Cerf",
                      "C.Rasmus Lerdorf",
                      "C.Steve Case",
                      "B.Bjarne Stroustrup",
                      "D.Ted Nelson",
                      "C.Marc Andreessen",
                    ];
var imageArray = ["<img class='center-block img-right' src='img/babbage.jpeg'>",
"<img class='center-block img-right' src='cerf.jpeg'>",
"<img class='center-block img-right' src='rasmus.jpg'>",
"<img class='center-block img-right' src='case.jpg'>",
"<img class='center-block img-right' src='bjarne.jpg'>",
"<img class='center-block img-right' src='ted.jpd'>",
"<img class='center-block img-right' src='marc.jpg'>"];


// This variables will hold the html 
var startHtml;
var changeHtml;

// seconds counter, variable to count questions, variables to count answers, selected answer
var timeCounter = 30;

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time;
var selectedAnswer;
var questionNr=0;

//Starting game function.

$(document).ready(function() {

function startHtml() {
start= "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(start);
}
startHtml();

//This function will generate the html content after clicking on start button.

$("body").on("click", ".start-button", function(event){
  
    changeHtml();
	timer();

});


// answering function

$("body").on("click", ".answer", function(event){

	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionNr]) {
	

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
    questionCounter = 0;
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

function unansweredQuestions() {
	unanswered++;
    questionsHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " +correctAnswer[questionNr] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(questionsHtml);
	setTimeout(end, 4000); 
}

function win() {
	correct++;
	questionsHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswer[questionNr] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(questionsHtml);
	setTimeout(end, 4000); 
}

function loss() {
	incorrect++;
	questionsHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(questionsHtml);
	setTimeout(end, 4000); 
}

function changeHtml() {
	questionsHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionsArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(questionsHtml);
}
function end() {
	if (questionCounter < 7) {
	questionCounter++;
	changeHtml();
	counter = 30;
	timer();
	}
	else {
		endHtml();
	}
}
function endHtml() {
	questionsHtml = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(questionsHtml);
}
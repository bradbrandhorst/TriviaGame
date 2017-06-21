$(document).ready(function(){
	//Game object
var triviaGame = {

//Array to hold questions and answers
	qAndA:[{
		question: "What country does coffee originally come from?",
			ans1: "Colombia",
			ans2: "Ethiopia",
			ans3: "Java",
			ans4: "Kenya",
			imgUrl: "./assets/images/Ethiopia.png"},
	   {
	   	question: "According to legend, coffee was discovered by Kaldi after observing which animals eating the fruit?",
			ans1: "Tigers",
			ans2: "Birds",
			ans3: "Goats",
			ans4: "Giraffes",
			imgUrl: "./assets/images/Goats.jpg"},
		{
	   	question: "Which European leader helped to spread coffee around the world during their reign of empire?",
			ans1: "Ferdinand",
			ans2: "Elizabeth I",
			ans3: "Julius Caeser",
			ans4: "Louis XIV",
			imgUrl: "./assets/images/LouisXIV.png"},
	   {
	   	question: "Coffee is the 2nd most traded commodity in the world besides what?",
			ans1: "Crude Oil",
			ans2: "Corn",
			ans3: "Pork Bellies",
			ans4: "Sugar",
			imgUrl: "./assets/images/Oil.png"},
		{
		question: "The New York commodity price of coffee is approximately this amount per lb. currently?",
		    ans1: "$5.09",
		    ans2: "$3.33",
		    ans3: "$1.20",
		    ans4: "$12.52",
			imgUrl: "./assets/images/120.jpg"}],

	correctAnswers: ['Ethiopia', 'Goats', 'Louis XIV', 'Crude Oil', '$1.20'],

	//array to hold correct answers
	userAnswers: [],

	
	//some needed
	questionCount: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,
	
	beginGame: function(){
		if(triviaGame.questionCount == triviaGame.qAndA.length){

			triviaGame.gameFinished();
			triviaGame.timer = 30;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 30;
				$('#time').html(triviaGame.timer); //??
			}

			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('button.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('button.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('button.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('button.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},
//Count down timer 
	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){

			triviaGame.oufOfTime();
			triviaGame.playMusic.pause();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
		
			triviaGame.answersCorrect();
			triviaGame.playMusic.play();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
			triviaGame.playMusic.pause();
		}

	},
//If answer is correct
	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
	},
//if answer is incorrect
	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},
//If timer runs out
	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		triviaGame.userAnswers.push(""); 
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);

		triviaGame.questionCount++;	

	},
//Restart function
	restart: function(){

		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("30");

		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},
//Game Ends - Resets the DOM
	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 30;
	}
};



//Game begins on click of the start button 
	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);

	});
//click event for answer
	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});
//clcik event to restart 
	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});


});
var gamePattern = [];
var playerClickedPattern = [];
var gameInPlay = false;
var level = 0;


var buttonColors = ["red", "blue", "green", "yellow"];


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("div#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  playerClickedPattern = [];
}

function startOver() {
  gameInPlay = false
  gamePattern = [];
  playerClickedPattern = [];
  level = 0;
  $("body").addClass("game-over")
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 300);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === playerClickedPattern[currentLevel]) {
    if (gamePattern.length === playerClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound('wrong');
    startOver();
  };
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$(".btn").on("click", function() {

  var playerChosenColor = $(this).attr("id");
  playerClickedPattern.push(playerChosenColor);

  animatePress(playerChosenColor);
  playSound(playerChosenColor);

  checkAnswer(playerClickedPattern.length - 1);
});


$(document).on("keypress", function() {
  if (gameInPlay === false) {
    nextSequence();
    gameInPlay = true;
  }

})

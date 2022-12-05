const buttonArr = ["red", "blue", "green", "yellow"];
var GamePattren = [];
var UserClickPattren = [];

var level = 0;
let bool = false;
$(document).keydown(function () {
  if (!bool) {
    $("#level-title").text("level " + level);
    nextSequence();
    bool = true;
  }
});

$(".btn").click(function () {
  const UserChosenColor = $(this).attr("id");

  UserClickPattren.push(UserChosenColor);

  PlaySound(UserChosenColor);
  animatePress(UserChosenColor);

  checkAnswer(UserClickPattren.length - 1);
});

function checkAnswer(currlevel) {
  if (GamePattren[currlevel] == UserClickPattren[currlevel]) {
    console.log("success");
    if (UserClickPattren.length === GamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    var worng = new Audio("sounds/worng.mp3")
    worng.play();
    startOver();
    console.log("boo!!!");
  }
}


function startOver(){
  level = 0;
  bool = false;
  GamePattren = [];
}

function nextSequence() {
  UserClickPattren = [];
  level++;
  $("#level-title").text("level " + level);

  const randomNum = Math.floor(Math.random() * 4);
  const randomColor = buttonArr[randomNum];
  GamePattren.push(randomColor);
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  PlaySound(randomColor);
}

function PlaySound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currColor) {
  $("#" + currColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currColor).removeClass("pressed");
  }, 100);
}

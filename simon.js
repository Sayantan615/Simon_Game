const buttonArr = ["red", "blue", "green", "yellow"];
let GamePattren = [];
let UserClickPattren = [];
let level = 0;
let GameStatus = false;

const gameCall = () => {
  if (!GameStatus) {
    $("#level-title").text("level " + level);
    console.log("Game Start called");
    nextSequence();
    GameStatus = true;
  }
};

const newGame = () => {
  if (GameStatus) {
    startOver();
  }
  GameStatus = false;
};

$(document).on("click", gameCall);
$(document).keydown(gameCall);
$("#new-game").click(newGame);

$(".btn").click(function () {
  if (GameStatus) {
    const UserChosenColor = $(this).attr("id");

    UserClickPattren.push(UserChosenColor);

    PlaySound(UserChosenColor);
    animatePress(UserChosenColor);

    checkAnswer(UserClickPattren.length - 1);
  }
});

function checkAnswer(currlevel) {
  if (GamePattren[currlevel] == UserClickPattren[currlevel]) {
    if (UserClickPattren.length === GamePattren.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press New Game to Restart");

    // var worng = new Audio("sounds/worng.mp3");
    // worng.play();
    startOver();
  }
}

function startOver() {
  level = 0;
  GamePattren = [];
}

function nextSequence() {
  console.log("Next Sequence");
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


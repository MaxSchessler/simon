var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

/*
$(document).keypress(() => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
*/

$(".btn").click((event) => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    return;
  }

  const userChosenColour = $(event.currentTarget).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log("playing sounds now");

  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
checkAnswer = (currentLevel) => {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    new Audio("sounds/wrong.mp3").play();
    $("#level-title").text("Game over! Better luck next time.");
    $("body").addClass("game-over");

    // Wait for 5 seconds before redirecting
    setTimeout(() => {
      $("body").removeClass("game-over");

      // Redirect to the YouTube link after 5 seconds
      const youtubeUrl = "https://www.youtube.com/watch?v=5ZlOt5xjd1E&autoplay=1";
      window.location.href = youtubeUrl;
    }, 2000); // 5000 milliseconds = 5 seconds
  }
};

nextSequence = () => {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;

  // check if new level is over 5
  if (level > 10) {
    winGame();
    return;
  }

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
};

const playSound = (name) => {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};

const winGame = () => {
  startOver();

  $("#level-title").text("You win! Press any key to go again.");
};

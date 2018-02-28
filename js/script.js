// Pomodoro webapp functionality
// M Allen: Freelance Web Developer - 2017

// Default values
var breakValue = 5;
var sessionValue = 25;
var runFlag = false;
var sessionFlag = true;
var countDownCounter = 1500;

// Update timer
function updateTimer() {
  var countDownMins = Math.floor(countDownCounter/60);
  var countDownSecs = countDownCounter%60;
  if (countDownSecs < 10) {
    countDownSecs = "0" + countDownSecs;
  }
  $("#timerCount").html(countDownMins+ ":" + countDownSecs);
}

// Update control value display
function updateContralValues() {
  $("#breakValue").html(breakValue + ":00");
  $("#sessionValue").html(sessionValue + ":00");
  updateTimer();
}

// Enable functionality when document has loaded
$(document).ready(function() {
  // Break period reduce time
  $("#breakMinus").on("click", function(){
    if (breakValue > 1) {
      breakValue -= 1;
      if (!sessionFlag) {
        countDownCounter -= 60;
      }
    }
    updateContralValues();
  });
  // Break period increase time
  $("#breakPlus").on("click", function(){
    breakValue += 1;
    if (!sessionFlag) {
      countDownCounter += 60;
    }
    updateContralValues();
  });
  // Session period reduce time
  $("#sessionMinus").on("click", function(){
    if (sessionValue > 1) {
      sessionValue -= 1;
      if (sessionFlag) {
        countDownCounter -= 60;
      }
    }
    updateContralValues();
  });
  // Session period increase time
  $("#sessionPlus").on("click", function(){
    sessionValue += 1;
    if (sessionFlag) {
      countDownCounter += 60;
    }
    updateContralValues();
  });
  // Start/stop timer
  $("#timerDisplay").on("click", function(){
    // Toggle run state
    runFlag = !runFlag;
  });
  // Countdown loop
  setInterval(function() {
    if (runFlag && countDownCounter > 0) {
      countDownCounter -= 1;
      updateTimer();
      // Change timer background as end approaches
      if (countDownCounter == 59) {
        if (sessionFlag) {
          $("#timerDisplay").css("background-color", "#32CD32");
        } else {
          $("#timerDisplay").css("background-color", "#2C3E50");
        }
      }
    }
    if (countDownCounter == 0) {
      runFlag = !runFlag;
      sessionFlag = !sessionFlag;
      var audio = $("#bells")[0];
      audio.play();
      if (sessionFlag) {
        countDownCounter = sessionValue * 60;
        updateTimer();
      } else {
        countDownCounter = breakValue * 60;
        runFlag = !runFlag;
      }
    }
  }, 1000);
});

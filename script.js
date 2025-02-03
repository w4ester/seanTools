// Lesson 1: My Visual Timer and Me
let timer;
function startVisualTimer() {
  let totalTime = 300; // 5 minutes in seconds
  let timeLeft = totalTime;
  document.getElementById("timerDisplay").textContent = formatTime(timeLeft);
  document.getElementById("progress").style.width = "100%";
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      document.getElementById("reflection1").textContent = "Time's up! Great job! Did you see how the timer helped you focus?";
    } else {
      document.getElementById("timerDisplay").textContent = formatTime(timeLeft);
      let progressWidth = (timeLeft / totalTime) * 100;
      document.getElementById("progress").style.width = progressWidth + "%";
      if (timeLeft === 30) {
        alert("Only 30 seconds left! Finish up your drawing or writing!");
      }
    }
  }, 1000);
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return min + ":" + (sec < 10 ? "0" : "") + sec;
}

// Lesson 2: My Personal Timer Race
let raceTimer;
let raceTime = 10;
let clicks = 0;
function startRace() {
  clicks = 0;
  document.getElementById("clickCount").textContent = clicks;
  document.getElementById("clickButton").disabled = false;
  document.getElementById("raceTimerDisplay").textContent = raceTime;
  clearInterval(raceTimer);
  raceTimer = setInterval(() => {
    raceTime--;
    document.getElementById("raceTimerDisplay").textContent = raceTime;
    if (raceTime <= 0) {
      clearInterval(raceTimer);
      document.getElementById("clickButton").disabled = true;
      document.getElementById("raceReflection").textContent = "Great job! You clicked " + clicks + " times!";
      raceTime = 10;
    }
  }, 1000);
}

function recordClick() {
  clicks++;
  document.getElementById("clickCount").textContent = clicks;
}

// Lesson 3: My Countdown for Changing Activities
let countdownTimer;
function startCountdown() {
  let countdownTime = 120;
  document.getElementById("countdownDisplay").textContent = formatTime(countdownTime);
  clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    countdownTime--;
    if (countdownTime < 0) {
      clearInterval(countdownTimer);
      document.getElementById("activityMessage").textContent = "Time's up! Now, it's time for your next fun activity!";
    } else {
      document.getElementById("countdownDisplay").textContent = formatTime(countdownTime);
    }
  }, 1000);
}

// Lesson 5: I Choose When to Start
let chooseTimer;
function chooseStart() {
  document.getElementById("chooseTimerDisplay").textContent = "Your timer is on!";
  let chooseTime = 60;
  clearInterval(chooseTimer);
  chooseTimer = setInterval(() => {
    chooseTime--;
    if (chooseTime < 0) {
      clearInterval(chooseTimer);
      document.getElementById("chooseReflection").textContent = "Great job! You managed your time all by yourself!";
    } else {
      document.getElementById("chooseTimerDisplay").textContent = "Time left: " + chooseTime + " seconds";
    }
  }, 1000);
}

// Lesson 6: My Self-Check for Quiet Transitions
function selfCheck() {
  let c1 = document.getElementById("check1").checked;
  let c2 = document.getElementById("check2").checked;
  let c3 = document.getElementById("check3").checked;
  if (c1 && c2 && c3) {
    document.getElementById("selfCheckReflection").textContent = "Awesome! You did all your self-checks!";
  } else {
    document.getElementById("selfCheckReflection").textContent = "Try again! Check all the boxes to be sure.";
  }
}

// Lesson 7: My Quiet Walk Challenge
function finishQuietWalk() {
  document.getElementById("quietWalkReflection").textContent = "Great job on your quiet walk! Keep being calm and steady!";
}

// Lesson 8: Creating My Own Reminder
function setReminder() {
  let reminderText = document.getElementById("reminderInput").value;
  if (reminderText.trim() !== "") {
    document.getElementById("myReminder").textContent = "Your reminder: " + reminderText;
  } else {
    document.getElementById("myReminder").textContent = "Please type your reminder!";
  }
}
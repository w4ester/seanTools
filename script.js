// Global variables for timers and clicks
let timer, raceTimer, countdownTimer, chooseTimer;
let clicks = 0;

// Helper function to format time (in seconds) to "m:ss"
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return min + ":" + (sec < 10 ? "0" : "") + sec;
}

// --------------------------
// Audio Management (Placeholder)
// --------------------------
const AudioManager = {
  sounds: {
    start: new Audio('assets/sounds/start.mp3'),
    warning: new Audio('assets/sounds/warning.mp3'),
    complete: new Audio('assets/sounds/complete.mp3')
  },
  isEnabled: function() {
    return localStorage.getItem('audioEnabled') !== 'false';
  },
  play: function(soundName) {
    if (this.isEnabled() && this.sounds[soundName]) {
      this.sounds[soundName].play().catch(err => {
        console.log(`Audio ${soundName} failed to play:`, err);
      });
    }
  },
  preloadAll: function() {
    Object.values(this.sounds).forEach(audio => {
      audio.load();
    });
  }
};

// Preload audio
AudioManager.preloadAll();

// --------------------------
// Timer Settings Helper
// --------------------------
function getTimerDuration(timerId) {
  const settings = JSON.parse(localStorage.getItem("timerSettings") || "{}");
  return (
    settings[timerId] ||
    {
      visualTimer: 300,
      raceTimer: 10,
      countdownTimer: 120,
      chooseTimer: 60,
    }[timerId]
  );
}

// --------------------------
// Lesson 1: Visual Timer
// --------------------------
function startVisualTimer() {
  AudioManager.play('start');
  let totalTime = getTimerDuration('visualTimer');
  let timeLeft = totalTime;
  const timerContainer = document.querySelector('.timer-container');
  
  // Reset timer state
  timerContainer.classList.remove('timer-warning', 'timer-complete');
  document.getElementById("timerDisplay").textContent = formatTime(timeLeft);
  document.getElementById("progress").style.width = "100%";
  clearInterval(timer);
  
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      AudioManager.play('complete');
      timerContainer.classList.add('timer-complete');
      document.getElementById("reflection1").textContent = "Time's up! Great job! Did you see how the timer helped you focus?";
      document.getElementById("progress").style.width = "100%";
    } else {
      document.getElementById("timerDisplay").textContent = formatTime(timeLeft);
      let progressWidth = (timeLeft / totalTime) * 100;
      document.getElementById("progress").style.width = progressWidth + "%";
      
      // Warning at 30 seconds remaining
      if (timeLeft === 30) {
        AudioManager.play('warning');
        timerContainer.classList.add('timer-warning');
        document.getElementById("reflection1").textContent = "Almost done! 30 seconds left to finish up!";
      }
    }
  }, 1000);
}

// --------------------------
// Lesson 2: Personal Timer Race
// --------------------------
function startRace() {
  clicks = 0;
  let raceTime = getTimerDuration("raceTimer");
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
      document.getElementById("raceReflection").textContent =
        "Great job! You clicked " + clicks + " times!";
      raceTime = getTimerDuration("raceTimer");
    }
  }, 1000);
}

function recordClick() {
  clicks++;
  document.getElementById("clickCount").textContent = clicks;
}

// --------------------------
// Lesson 3: Countdown for Changing Activities
// --------------------------
function startCountdown() {
  let countdownTime = getTimerDuration("countdownTimer");
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

// --------------------------
// Lesson 5: I Choose When to Start
// --------------------------
function chooseStart() {
  let chooseTime = getTimerDuration("chooseTimer");
  document.getElementById("chooseTimerDisplay").textContent = "Your timer is on!";
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

// --------------------------
// Lesson 6: Self-Check for Quiet Transitions
// --------------------------
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

// --------------------------
// Lesson 7: Quiet Walk Challenge
// --------------------------
function finishQuietWalk() {
  document.getElementById("quietWalkReflection").textContent = "Great job on your quiet walk! Keep being calm and steady!";
}

// --------------------------
// Lesson 8: Creating My Own Reminder
// --------------------------
function setReminder() {
  let reminderText = document.getElementById("reminderInput").value;
  if (reminderText.trim() !== "") {
    document.getElementById("myReminder").textContent = "Your reminder: " + reminderText;
  } else {
    document.getElementById("myReminder").textContent = "Please type your reminder!";
  }
}

// --------------------------
// Spelling Challenge Section (New Section)
// --------------------------
let spellingWords = [];
let currentWord = "";
let currentIndex = 0;

function loadSpellingWords() {
  const fileInput = document.getElementById("wordFile");
  if (fileInput.files.length === 0) {
    alert("Please select a file containing spelling words.");
    return;
  }
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    // Split file by new lines and filter out empty lines.
    spellingWords = e.target.result
      .split(/\r?\n/)
      .map(word => word.trim())
      .filter(word => word !== "");
    if (spellingWords.length > 0) {
      document.getElementById("spellingGame").style.display = "block";
      loadNextWord();
    } else {
      alert("No words found in the file.");
    }
  };
  reader.readAsText(file);
}

function loadNextWord() {
  if (spellingWords.length === 0) {
    document.getElementById("currentWordDisplay").textContent = "No more words!";
    return;
  }
  // Get the next word (or randomize if you prefer)
  currentWord = spellingWords.shift().toUpperCase();
  currentIndex = 0;
  document.getElementById("currentWordDisplay").textContent = "Spell: " + currentWord;
  document.getElementById("spellingMessage").textContent = "";
  renderLetterButtons();
}

function renderLetterButtons() {
  const container = document.getElementById("letterButtons");
  container.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "letter-button";
    btn.onclick = () => checkLetter(letter, btn);
    container.appendChild(btn);
  }
}

function checkLetter(letter, btn) {
  if (letter === currentWord[currentIndex]) {
    btn.classList.add("correct");
    currentIndex++;
    if (currentIndex === currentWord.length) {
      document.getElementById("spellingMessage").textContent = "Correct! Great job!";
      triggerConfetti();
      disableLetterButtons(true);
      setTimeout(() => {
        disableLetterButtons(false);
        loadNextWord();
      }, 2000);
    }
  } else {
    document.getElementById("spellingMessage").textContent = "Incorrect letter. Try again!";
  }
}

function disableLetterButtons(disable) {
  const buttons = document.querySelectorAll(".letter-button");
  buttons.forEach(btn => {
    btn.disabled = disable;
  });
}

// --------------------------
// Confetti Trigger Function
// --------------------------
function triggerConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}

// --------------------------
// Login Function
// --------------------------
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username && password) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    localStorage.setItem("currentUser", username);
  } else {
    alert("Please enter username and password");
  }
}

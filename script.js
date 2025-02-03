// Load timer settings from admin panel
function getTimerDuration(timerId) {
    const settings = JSON.parse(localStorage.getItem('timerSettings') || '{}');
    return settings[timerId] || {
        'visualTimer': 300,
        'raceTimer': 10,
        'countdownTimer': 120,
        'chooseTimer': 60
    }[timerId];
}

// Check for stop signal from admin
setInterval(() => {
    if (localStorage.getItem('stopTimers')) {
        clearInterval(timer);
        clearInterval(raceTimer);
        clearInterval(countdownTimer);
        clearInterval(chooseTimer);
        alert('Timer stopped by teacher');
        localStorage.removeItem('stopTimers');
    }
}, 1000);

let timer, raceTimer, countdownTimer, chooseTimer;
let clicks = 0;

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return min + ":" + (sec < 10 ? "0" : "") + sec;
}

function startVisualTimer() {
    let totalTime = getTimerDuration('visualTimer');
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

function startRace() {
    clicks = 0;
    let raceTime = getTimerDuration('raceTimer');
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
            raceTime = getTimerDuration('raceTimer');
        }
    }, 1000);
}

function recordClick() {
    clicks++;
    document.getElementById("clickCount").textContent = clicks;
}

function startCountdown() {
    let countdownTime = getTimerDuration('countdownTimer');
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

function chooseStart() {
    let chooseTime = getTimerDuration('chooseTimer');
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

function finishQuietWalk() {
    document.getElementById("quietWalkReflection").textContent = "Great job on your quiet walk! Keep being calm and steady!";
}

function setReminder() {
    let reminderText = document.getElementById("reminderInput").value;
    if (reminderText.trim() !== "") {
        document.getElementById("myReminder").textContent = "Your reminder: " + reminderText;
    } else {
        document.getElementById("myReminder").textContent = "Please type your reminder!";
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        localStorage.setItem('currentUser', username);
    } else {
        alert('Please enter username and password');
    }
}
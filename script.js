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
    }
}, 1000);

// Original timer functions modified to use admin settings
function startVisualTimer() {
    let totalTime = getTimerDuration('visualTimer');
    let timeLeft = totalTime;
    // ... rest of the function
}

function startRace() {
    let raceTime = getTimerDuration('raceTimer');
    // ... rest of the function
}

// Add login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo login (replace with proper authentication)
    if (username && password) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert('Please enter username and password');
    }
}
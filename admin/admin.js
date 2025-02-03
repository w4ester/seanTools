// Admin authentication
function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === 'admin' && password === 'admin123') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadTimerSettings();
    } else {
        alert('Invalid credentials');
    }
}

// Timer settings management
function updateTimer(lessonId, duration) {
    const settings = JSON.parse(localStorage.getItem('timerSettings') || '{}');
    settings[lessonId] = parseInt(duration);
    localStorage.setItem('timerSettings', JSON.stringify(settings));
    alert(`Timer for ${lessonId} updated to ${duration} seconds`);
}

function loadTimerSettings() {
    const settings = JSON.parse(localStorage.getItem('timerSettings') || '{}');
    Object.entries(settings).forEach(([id, duration]) => {
        const input = document.getElementById(id);
        if (input) input.value = duration;
    });
}

function stopAllTimers() {
    // Send message to main page to stop timers
    localStorage.setItem('stopTimers', 'true');
    alert('All timers stopped');
    setTimeout(() => localStorage.removeItem('stopTimers'), 1000);
}
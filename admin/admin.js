// Admin control functions
const adminControls = {
    // Timer controls
    stopAllTimers() {
        clearInterval(timer);
        clearInterval(raceTimer);
        clearInterval(countdownTimer);
        clearInterval(chooseTimer);
    },
    
    // Update timer durations
    updateTimerDuration(lessonId, duration) {
        timerSettings[lessonId] = duration;
        localStorage.setItem('timerSettings', JSON.stringify(timerSettings));
    },
    
    // Student progress tracking
    viewStudentProgress(studentId) {
        return JSON.parse(localStorage.getItem(`student_${studentId}_progress`) || '{}');
    },
    
    // Race game settings
    updateRaceSettings(duration, targetClicks) {
        raceSettings.duration = duration;
        raceSettings.targetClicks = targetClicks;
        localStorage.setItem('raceSettings', JSON.stringify(raceSettings));
    }
};

// Initial settings
const timerSettings = {
    visualTimer: 300,
    raceTimer: 10,
    countdownTimer: 120,
    chooseTimer: 60
};
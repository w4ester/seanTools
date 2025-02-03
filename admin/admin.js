/**
 * ADMIN DASHBOARD CONTROLS
 * ==============================
 * Provides complete control over:
 * 1. Timer Settings
 * 2. Audio Feedback
 * 3. Student Progress Tracking
 * 4. Emergency Controls
 */

let adminSession = {
    startTime: null,
    checkSession: function() {
        if (!this.startTime) return false;
        const elapsed = Date.now() - this.startTime;
        return elapsed < AdminConfig.SESSION_DURATION;
    },
    start: function() {
        this.startTime = Date.now();
        localStorage.setItem('adminSessionStart', this.startTime);
    },
    end: function() {
        // Clear session data
        this.startTime = null;
        localStorage.removeItem('adminSessionStart');
        
        // Reset UI state
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('adminPanel').style.display = 'none';
        
        // Clear sensitive form data
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';

        // Clear any custom settings indicators
        document.querySelectorAll('.custom-setting').forEach(el => {
            el.classList.remove('custom-setting');
        });

        // Redirect to login page if not already there
        if (window.location.pathname !== '/seanTools/admin/admin.html') {
            window.location.href = '/seanTools/admin/admin.html';
        }
    }
};

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (AdminConfig.verifyCredentials(username, password)) {
        adminSession.start();
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        loadDashboard();
    } else {
        alert('Invalid credentials');
    }
}

function loadDashboard() {
    // First load default timer values from config
    Object.entries(AdminConfig.DEFAULT_TIMERS).forEach(([timerId, value]) => {
        const input = document.getElementById(timerId);
        if (input) input.value = value;
    });

    // Then load any custom settings that override defaults
    loadTimerSettings();
    
    // Load student data
    loadStudentList();
    loadProgressData();

    // Update UI state
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}



function loadStudentList() {
    const students = AdminConfig.getStudents();
    const studentList = document.getElementById('studentList');
    if (!studentList) return;

    studentList.innerHTML = Object.entries(students)
        .map(([username, data]) => `
            <div class="student-item">
                <strong>${data.displayName}</strong> (${username})
                <button onclick="viewStudentDetails('${username}')">View Details</button>
                <button onclick="removeStudent('${username}')" class="danger">Remove</button>
            </div>
        `).join('');
}

function addStudent() {
    const username = document.getElementById('newStudentUsername').value;
    const displayName = document.getElementById('newStudentDisplayName').value;
    const password = document.getElementById('newStudentPassword').value;

    if (!username || !displayName || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        AdminConfig.createStudent(username, displayName, password);
        loadStudentList();
        // Clear form
        document.getElementById('newStudentUsername').value = '';
        document.getElementById('newStudentDisplayName').value = '';
        document.getElementById('newStudentPassword').value = '';
    } catch (error) {
        alert(error.message);
    }
}

function removeStudent(username) {
    if (!confirm(`Are you sure you want to remove ${username}?`)) return;
    
    try {
        AdminConfig.removeStudent(username);
        loadStudentList();
    } catch (error) {
        alert(error.message);
    }
}

/**
 * TIMER SETTINGS MANAGEMENT
 * ==============================
 * Controls for educators to:
 * - Adjust timer durations per activity
 * - Enable/disable features
 * - Monitor student usage
 */

function updateTimer(lessonId, duration) {
    const settings = JSON.parse(localStorage.getItem('timerSettings') || '{}');
    settings[lessonId] = parseInt(duration);
    localStorage.setItem('timerSettings', JSON.stringify(settings));
    alert(`Timer for ${lessonId} updated to ${duration} seconds`);
}

function loadTimerSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('timerSettings') || '{}');
        Object.entries(settings).forEach(([id, duration]) => {
            const input = document.getElementById(id);
            if (input) {
                input.value = duration;
                // Add visual feedback that setting is custom
                input.parentElement.classList.add('custom-setting');
            }
        });
    } catch (error) {
        console.error('Error loading timer settings:', error);
        // Fallback to defaults if there's an error
        Object.entries(AdminConfig.DEFAULT_TIMERS).forEach(([timerId, value]) => {
            const input = document.getElementById(timerId);
            if (input) input.value = value;
        });
    }
}

function toggleAudioFeedback(enabled) {
    localStorage.setItem('audioEnabled', enabled);
    alert(`Audio feedback ${enabled ? 'enabled' : 'disabled'}`);
}

function loadProgressData() {
    const progress = AdminConfig.getAllProgress();
    const progressDisplay = document.getElementById('progressDisplay');
    if (!progressDisplay) return;

    progressDisplay.innerHTML = Object.entries(progress)
        .map(([username, data]) => {
            const student = AdminConfig.getStudents()[username];
            if (!student) return '';

            const activities = Object.entries(data)
                .map(([activity, results]) => {
                    const latest = results[results.length - 1];
                    return `
                        <div class="activity-progress">
                            <strong>${activity}:</strong> 
                            Latest: ${latest.result}
                            (${new Date(latest.timestamp).toLocaleString()})
                        </div>
                    `;
                }).join('');

            return `
                <div class="student-progress">
                    <h3>${student.displayName}'s Progress</h3>
                    ${activities || '<p>No activities completed yet</p>'}
                </div>
            `;
        }).join('<hr>');
}

/**
 * EMERGENCY CONTROLS
 * ==============================
 * Allows immediate stop of all activities
 * Use during transitions or emergencies
 */
function stopAllTimers() {
    // Send message to main page to stop timers
    localStorage.setItem('stopTimers', 'true');
    alert('All timers stopped');
    setTimeout(() => localStorage.removeItem('stopTimers'), 1000);
}

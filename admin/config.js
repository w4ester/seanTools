/**
 * ADMIN CONFIGURATION
 * ==============================
 * Secure storage for admin settings and defaults
 * Note: In a production environment, these would be server-side
 */

const AdminConfig = {
    // Session management
    SESSION_DURATION: 30 * 60 * 1000, // 30 minutes in milliseconds
    
    // Default timer settings (in seconds)
    DEFAULT_TIMERS: {
        'visualTimer': 300,    // 5 minutes
        'raceTimer': 10,       // 10 seconds
        'countdownTimer': 120, // 2 minutes
        'chooseTimer': 60      // 1 minute
    },

    // Admin credentials (should be moved to server-side in production)
    verifyCredentials: function(username, password) {
        // Demo credentials - in production, use proper authentication
        const validCredentials = {
            username: 'admin',
            // In production, store hashed passwords only
            passwordHash: 'admin123'
        };
        
        return username === validCredentials.username && 
               password === validCredentials.passwordHash;
    },

    // Student management
    createStudent: function(username, displayName, password) {
        const students = this.getStudents();
        if (students[username]) {
            throw new Error('Student already exists');
        }

        students[username] = {
            displayName: displayName,
            password: password, // In production, use hashed passwords
            created: new Date().toISOString(),
            progress: {}
        };

        localStorage.setItem('students', JSON.stringify(students));
        return true;
    },

    getStudents: function() {
        return JSON.parse(localStorage.getItem('students') || '{}');
    },

    removeStudent: function(username) {
        const students = this.getStudents();
        if (!students[username]) {
            throw new Error('Student not found');
        }

        delete students[username];
        localStorage.setItem('students', JSON.stringify(students));
        
        // Clean up student progress
        localStorage.removeItem(`student_${username}_progress`);
        return true;
    },

    // Progress tracking
    getStudentProgress: function(username) {
        const student = this.getStudents()[username];
        if (!student) return null;

        return JSON.parse(
            localStorage.getItem(`student_${username}_progress`) || '{}'
        );
    },

    getAllProgress: function() {
        const students = this.getStudents();
        return Object.keys(students).reduce((progress, username) => {
            progress[username] = this.getStudentProgress(username);
            return progress;
        }, {});
    }
};

// Prevent unauthorized modification of config
Object.freeze(AdminConfig);

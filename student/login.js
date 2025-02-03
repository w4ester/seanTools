class StudentManager {
    constructor() {
        this.currentStudent = null;
        this.displayName = null;
        this.progress = {};
    }

    login(username, password) {
        const students = JSON.parse(localStorage.getItem('students') || '{}');
        if (students[username] && students[username].password === password) {
            this.currentStudent = username;
            this.displayName = students[username].displayName;
            this.loadProgress();
            this.updateWelcomeMessage();
            return true;
        }
        return false;
    }

    loadProgress() {
        this.progress = JSON.parse(
            localStorage.getItem(`student_${this.currentStudent}_progress`) || '{}'
        );
    }

    updateWelcomeMessage() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            const welcome = document.createElement('div');
            welcome.className = 'welcome-banner';
            welcome.innerHTML = `
                <h2>Welcome back, ${this.displayName}! 👋</h2>
                <p>Ready to practice your skills?</p>
            `;
            mainContent.insertBefore(welcome, mainContent.firstChild);
        }
    }

    saveProgress(activity, result) {
        if (!this.currentStudent) return;
        
        if (!this.progress[activity]) {
            this.progress[activity] = [];
        }
        
        const entry = {
            timestamp: new Date().toISOString(),
            result: result
        };
        
        this.progress[activity].push(entry);
        localStorage.setItem(
            `student_${this.currentStudent}_progress`, 
            JSON.stringify(this.progress)
        );

        // Check if this is a personal best
        const personalBest = this.getPersonalBest(activity);
        if (personalBest === result) {
            this.celebrateNewBest(activity, result);
        }
    }

    getPersonalBest(activity) {
        if (!this.progress[activity]) return null;
        return Math.max(...this.progress[activity].map(p => p.result));
    }

    celebrateNewBest(activity, result) {
        const celebration = document.createElement('div');
        celebration.className = 'celebration-popup';
        celebration.innerHTML = `
            <h3>🎉 New Personal Best! 🎉</h3>
            <p>Amazing job on ${activity}!</p>
            <p>Your new best: ${result}</p>
        `;
        document.body.appendChild(celebration);
        
        // Remove celebration after animation
        setTimeout(() => {
            celebration.classList.add('fade-out');
            setTimeout(() => celebration.remove(), 500);
        }, 3000);
    }

    logout() {
        this.currentStudent = null;
        this.displayName = null;
        this.progress = {};
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('mainContent').style.display = 'none';
        // Remove welcome banner if it exists
        const welcome = document.querySelector('.welcome-banner');
        if (welcome) welcome.remove();
    }
}

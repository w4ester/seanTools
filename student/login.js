class StudentManager {
    constructor() {
        this.currentStudent = null;
    }

    login(username, password) {
        // Simple demo authentication
        const students = JSON.parse(localStorage.getItem('students') || '{}');
        if (students[username] && students[username].password === password) {
            this.currentStudent = username;
            this.loadProgress();
            return true;
        }
        return false;
    }

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem(`student_${this.currentStudent}_progress`) || '{}');
        this.progress = progress;
    }

    saveProgress(activity, result) {
        if (!this.currentStudent) return;
        
        if (!this.progress[activity]) {
            this.progress[activity] = [];
        }
        this.progress[activity].push({
            timestamp: new Date().toISOString(),
            result: result
        });
        
        localStorage.setItem(`student_${this.currentStudent}_progress`, 
            JSON.stringify(this.progress));
    }

    getPersonalBest(activity) {
        if (!this.progress[activity]) return null;
        return Math.max(...this.progress[activity].map(p => p.result));
    }
}
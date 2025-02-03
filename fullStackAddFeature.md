# Adding Features to Timer & Transition Tools

## File Structure & Relationships

```
/admin
├── admin.html      # Teacher dashboard interface
├── admin.js        # Dashboard functionality
├── admin-style.css # Admin-specific styles
└── config.js       # Configuration and defaults

/student
└── login.js        # Student authentication & progress

/assets             # Shared resources
├── sounds/         # Audio feedback
├── images/         # Visual elements
└── icons/          # UI icons

style.css           # Main styles
script.js           # Core functionality
index.html          # Main student interface
```

## Example: How Timer Features Work

### 1. HTML Structure (admin.html)
```html
<section class="control-section">
    <h2>Timer Controls</h2>
    <div class="timer-settings">
        <div class="timer-control">
            <label>Visual Timer (seconds):</label>
            <input type="number" id="visualTimer" min="30" max="600">
            <button onclick="updateTimer('visualTimer', document.getElementById('visualTimer').value)">
                Update
            </button>
        </div>
    </div>
</section>
```

### 2. CSS Styling (admin-style.css)
```css
.timer-control {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 4px;
}

.timer-control.custom-setting {
    background: #E8F5E9;
    border: 1px solid #4CAF50;
}
```

### 3. JavaScript Function (admin.js)
```javascript
function updateTimer(lessonId, duration) {
    const settings = JSON.parse(localStorage.getItem('timerSettings') || '{}');
    settings[lessonId] = parseInt(duration);
    localStorage.setItem('timerSettings', JSON.stringify(settings));
}
```

### 4. Configuration (config.js)
```javascript
const AdminConfig = {
    DEFAULT_TIMERS: {
        'visualTimer': 300,    // 5 minutes
        'raceTimer': 10,       // 10 seconds
        'countdownTimer': 120  // 2 minutes
    }
};
```

## Adding a New Feature

1. **Define Configuration**
   - Add defaults to AdminConfig in config.js
   - Use consistent naming conventions
   - Document new settings

2. **Add Admin Controls**
   - Create new section in admin.html
   - Use existing CSS classes for consistency
   - Follow established HTML structure

3. **Implement Functionality**
   - Add functions to admin.js for settings
   - Update script.js for student features
   - Use existing localStorage patterns

4. **Add Visual Elements**
   - Place images in /assets/images/
   - Update style.css for new elements
   - Maintain consistent styling

## Example: Adding a New Timer

1. **Update Config (config.js)**
```javascript
DEFAULT_TIMERS: {
    ...existing timers...,
    'newTimer': 60  // 1 minute default
}
```

2. **Add Controls (admin.html)**
```html
<div class="timer-control">
    <label>New Timer (seconds):</label>
    <input type="number" id="newTimer" min="30" max="300">
    <button onclick="updateTimer('newTimer', document.getElementById('newTimer').value)">
        Update
    </button>
</div>
```

3. **Add Student Interface (index.html)**
```html
<div class="lesson" id="newLesson">
    <h2>New Timer Activity</h2>
    <div class="timer-container">
        <div class="timer-icon"></div>
        <div id="newTimerDisplay"></div>
        <div id="progressBar"><div id="progress"></div></div>
    </div>
    <button onclick="startNewTimer()">Start Timer</button>
</div>
```

4. **Add Functionality (script.js)**
```javascript
function startNewTimer() {
    let timeLeft = getTimerDuration('newTimer');
    // Use existing timer patterns...
}
```

## Best Practices

1. **Use Existing Patterns**
   - Follow established naming conventions
   - Reuse existing CSS classes
   - Maintain consistent structure

2. **Storage Keys**
   - timerSettings: Timer durations
   - audioEnabled: Sound settings
   - students: User accounts
   - student_${username}_progress: Individual progress

3. **Variable Naming**
   - Use camelCase for IDs and functions
   - Be descriptive and consistent
   - Follow existing patterns

4. **Testing Steps**
   - Verify admin controls work
   - Test student interface
   - Check progress tracking
   - Validate storage/retrieval

## Common Elements

1. **Timer Display**
   - Use timer-container class
   - Include progress bar
   - Add audio feedback

2. **Student Progress**
   - Track in localStorage
   - Show in admin dashboard
   - Include timestamps

3. **Settings**
   - Add to admin panel
   - Include sensible defaults
   - Provide value constraints

Remember: Always check existing code for patterns and variables before adding new ones to maintain consistency and prevent duplication.

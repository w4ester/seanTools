# Assets Directory Structure

This directory contains all media assets for the student learning platform:

```
assets/
├── sounds/         # Audio effects and instructions
│   ├── start.mp3   # Timer start sound
│   ├── warning.mp3 # 30-second warning
│   └── complete.mp3# Completion sound
│
├── images/         # Visual elements and achievements
│   ├── timer/      # Timer-related visuals
│   ├── achievements/# Badges and rewards
│   └── activities/ # Activity-specific graphics
│
└── icons/          # Interface and navigation icons
    ├── nav/        # Navigation elements
    ├── status/     # Status indicators
    └── controls/   # Audio/video controls
```

## Asset Guidelines

1. File Formats
- Sounds: MP3/OGG for broad compatibility
- Images: PNG for visual elements
- Icons: SVG for scalability

2. Naming Convention
- Use lowercase
- Hyphen for spaces
- Descriptive names
- Include size in filename if relevant

3. Size Guidelines
- Icons: 32x32px minimum
- Images: 64x64px minimum
- Maximum file sizes:
  * PNG: 100KB
  * SVG: 10KB
  * MP3: 500KB

4. Accessibility
- Alt text for all images
- Transcripts for audio
- High contrast ratios
- Clear, simple designs

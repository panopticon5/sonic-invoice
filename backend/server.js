const express = require('express');
const cors = require('cors');
const errorHandler = require('./errorMiddleware');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data based on popular songs of 2024
const songs = [
  { id: 1, name: "Flowers", author: "Miley Cyrus", progress: 0.15 },
  { id: 2, name: "Anti-Hero", author: "Taylor Swift", progress: 0.27 },
  { id: 3, name: "As It Was", author: "Harry Styles", progress: 0.12 },
  { id: 4, name: "Heat Waves", author: "Glass Animals", progress: 0.38 },
  { id: 5, name: "Unholy", author: "Sam Smith ft. Kim Petras", progress: 0.03 },
  { id: 6, name: "Calm Down", author: "Rema & Selena Gomez", progress: 0.10 },
  { id: 7, name: "Bad Habit", author: "Steve Lacy", progress: 0.35 },
  { id: 8, name: "I'm Good (Blue)", author: "David Guetta & Bebe Rexha", progress: 0.58 },
  { id: 9, name: "Lavender Haze", author: "Taylor Swift", progress: 0.41 },
  { id: 10, name: "Creepin'", author: "Metro Boomin, The Weeknd, 21 Savage", progress: 0.32 }
];

// Simulate progress updates
setInterval(() => {
  songs.forEach(song => {
    // Randomly increase progress (simulating calculation progress)
    const increment = Math.random() * 0.05;
    song.progress = Math.min(1, song.progress + increment);
  });
}, 20000); // Update every 20 seconds

// Routes
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🎵 Sonic Invoice Server running on http://localhost:${PORT}`);
  console.log(`📊 Songs endpoint: http://localhost:${PORT}/api/songs`);
});
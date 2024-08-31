const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Mock user data
const users = [
  { id: 1, username: 'teacher1', password: 'password123', role: 'teacher' },
  { id: 2, username: 'student1', password: 'password123', role: 'student' },
];

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

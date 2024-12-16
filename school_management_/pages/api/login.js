// pages/api/login.js

const users = [
  { id: 1, username: 'teacher1', password: 'password123', role: 'teacher' },
  { id: 2, username: 'student1', password: 'password123', role: 'student' },
];

export default function handler(req, res) {
  try {
    if (req.method === 'POST') {
      console.log('Request body:', req.body); // Log the request body

      const { username, password } = req.body;
      console.log(`Received username: ${username}, password: ${password}`); // Log the received credentials

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        res.status(200).json({
          id: user.id,
          username: user.username,
          role: user.role,
        });
        console.log(`User ${user.username} logged in`); // Log successful login
      } else {
        console.log(`Invalid credentials for username: ${username}`); // Log invalid credentials
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in login handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
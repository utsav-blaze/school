import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Create a new student
app.post('/api/students', async (req, res) => {
  const { studentId, name, attendance, examMarks, fees } = req.body;
  try {
    const student = new Student({ studentId, name, attendance, examMarks, fees });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
app.get('/api/students', async (_, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a student by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a student
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use(bodyParser.json());
app.use(cors());

// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Mock user data
const users = [
  { id: 1, username: 'teacher1', password: 'password123', role: 'teacher' },
  { id: 2, username: 'student1', password: 'password123', role: 'student' },
];



// API endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  console.log(`Received login request for username: ${username}`);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    console.log(`User ${user.username} logged in`);
  } else {
    console.log(`Invalid credentials for username: ${username}`);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Removed duplicate app.listen
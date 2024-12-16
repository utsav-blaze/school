import express from 'express';
import Student from '../models/studentSchema.js';

const router = express.Router();

// Middleware for authentication and authorization
const authenticate = (req, res, next) => {
  // Implement your authentication logic here
  // For example, check if the user is logged in
  next();
};

const authorizeTeacher = (req, res, next) => {
  // Implement your authorization logic here
  // For example, check if the user is a teacher
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Get all students (for teachers)
router.get('/', authenticate, authorizeTeacher, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a student by ID (for students and teachers)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new student (for teachers)
router.post('/', authenticate, authorizeTeacher, async (req, res) => {
  const { studentId, name, attendance, examMarks, fees } = req.body;
  try {
    const student = new Student({ studentId, name, attendance, examMarks, fees });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a student (for teachers)
router.put('/:id', authenticate, authorizeTeacher, async (req, res) => {
  try {
    const { attendance, examMarks, fees } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (attendance) {
      student.attendance.push(attendance);
    }
    if (examMarks) {
      student.examMarks.push(examMarks);
    }
    if (fees) {
      student.fees = fees;
    }

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student (for teachers)
router.delete('/:id', authenticate, authorizeTeacher, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
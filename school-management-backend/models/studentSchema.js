import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  attendance: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ['Present', 'Absent'], required: true }
    }
  ],
  examMarks: [
    {
      subject: { type: String, required: true },
      marks: { type: Number, required: true }
    }
  ],
  fees: {
    total: { type: Number, required: true },
    paid: { type: Number, required: true },
    due: { type: Number, required: true }
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
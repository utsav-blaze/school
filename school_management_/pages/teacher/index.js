import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const TeacherPage = () => {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [examSubject, setExamSubject] = useState('');
  const [examMarks, setExamMarks] = useState('');
  const [feesTotal, setFeesTotal] = useState('');
  const [feesPaid, setFeesPaid] = useState('');

  useEffect(() => {
    // Fetch all students data
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students data:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddAttendance = async () => {
    try {
      await axios.put(`/api/students/${studentId}`, {
        attendance: { date: attendanceDate, status: attendanceStatus },
      });
      alert('Attendance added successfully');
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  const handleAddExamMarks = async () => {
    try {
      await axios.put(`/api/students/${studentId}`, {
        examMarks: { subject: examSubject, marks: examMarks },
      });
      alert('Exam marks added successfully');
    } catch (error) {
      console.error('Error adding exam marks:', error);
    }
  };

  const handleAddFees = async () => {
    try {
      await axios.put(`/api/students/${studentId}`, {
        fees: { total: feesTotal, paid: feesPaid, due: feesTotal - feesPaid },
      });
      alert('Fees added successfully');
    } catch (error) {
      console.error('Error adding fees:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl id="studentId">
          <FormLabel>Student ID</FormLabel>
          <Input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </FormControl>

        <HStack spacing={4}>
          <FormControl id="attendanceDate">
            <FormLabel>Attendance Date</FormLabel>
            <Input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </FormControl>
          <FormControl id="attendanceStatus">
            <FormLabel>Attendance Status</FormLabel>
            <Input
              type="text"
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleAddAttendance}>Add Attendance</Button>
        </HStack>

        <HStack spacing={4}>
          <FormControl id="examSubject">
            <FormLabel>Exam Subject</FormLabel>
            <Input
              type="text"
              value={examSubject}
              onChange={(e) => setExamSubject(e.target.value)}
            />
          </FormControl>
          <FormControl id="examMarks">
            <FormLabel>Exam Marks</FormLabel>
            <Input
              type="number"
              value={examMarks}
              onChange={(e) => setExamMarks(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleAddExamMarks}>Add Exam Marks</Button>
        </HStack>

        <HStack spacing={4}>
          <FormControl id="feesTotal">
            <FormLabel>Fees Total</FormLabel>
            <Input
              type="number"
              value={feesTotal}
              onChange={(e) => setFeesTotal(e.target.value)}
            />
          </FormControl>
          <FormControl id="feesPaid">
            <FormLabel>Fees Paid</FormLabel>
            <Input
              type="number"
              value={feesPaid}
              onChange={(e) => setFeesPaid(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleAddFees}>Add Fees</Button>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student ID</Th>
              <Th>Name</Th>
              <Th>Attendance</Th>
              <Th>Exam Marks</Th>
              <Th>Fees</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student._id}>
                <Td>{student.studentId}</Td>
                <Td>{student.name}</Td>
                <Td>
                  {student.attendance.map((entry, index) => (
                    <div key={index}>
                      {entry.date}: {entry.status}
                    </div>
                  ))}
                </Td>
                <Td>
                  {student.examMarks.map((mark, index) => (
                    <div key={index}>
                      {mark.subject}: {mark.marks}
                    </div>
                  ))}
                </Td>
                <Td>
                  Total: {student.fees.total} <br />
                  Paid: {student.fees.paid} <br />
                  Due: {student.fees.due}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default TeacherPage;
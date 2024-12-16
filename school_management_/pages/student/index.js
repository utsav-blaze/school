import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import Sidebar from '../../components/layout/sidebar';
import SectionBox from '../../components/layout/sectionBox';

function Student() {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student data
    const fetchStudent = async () => {
      try {
        const response = await axios.get('/api/students/your-student-id');
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <Box minHeight="100vh" bg={bg} color={color}>
      <Sidebar
        links={[
          { id: 'exam-marks', label: 'Exam Marks' },
          { id: 'attendance', label: 'Attendance' },
          { id: 'fees', label: 'Fees' },
        ]}
      />
      <Box ml="250px" p={4}>
        <Flex
          as="nav"
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('black', 'white')}
          padding={4}
          boxShadow="md"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xl" fontWeight="bold">
            Student Dashboard
          </Text>
          <IconButton
            aria-label="Toggle color mode"
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
          />
        </Flex>
        <VStack spacing={8} p={8} align="start">
          <SectionBox id="exam-marks" title="Exam Marks">
            {!student ? (
              <div>Loading...</div>
            ) : (
              <>
                <ul>
                  {student.examMarks.map((mark, index) => (
                    <li key={index}>
                      {mark.subject}: {mark.marks}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SectionBox>
          <SectionBox id="attendance" title="Attendance">
            {!student ? (
              <div>Loading...</div>
            ) : (
              <ul>
                {student.attendance.map((entry, index) => (
                  <li key={index}>
                    {entry.date}: {entry.status}
                  </li>
                ))}
              </ul>
            )}
          </SectionBox>
          <SectionBox id="fees" title="Fees">
            {!student ? (
              <div>Loading...</div>
            ) : (
              <>
                <p>Total: {student.fees.total}</p>
                <p>Paid: {student.fees.paid}</p>
                <p>Due: {student.fees.due}</p>
              </>
            )}
          </SectionBox>
        </VStack>
      </Box>
    </Box>
  );
}

export default Student;
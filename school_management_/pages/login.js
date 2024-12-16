import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Login successful:', response.data);
      // Redirect to a different page based on user role
      if (response.data.role === 'teacher') {
        router.push('/teacher');
      } else if (response.data.role === 'student') {
        router.push('/student');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.50"
      p={4}
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
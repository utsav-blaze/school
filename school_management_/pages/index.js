import { useSession } from 'next-auth/react';
import LoginForm from '../components/auth/LoginForm';
import StudentLayout from '../components/layout/StudentLayout';
import TeacherLayout from '../components/layout/TeacherLayout';

const HomePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <LoginForm />;
  }

  if (session.user.role === 'teacher') {
    return <TeacherLayout />;
  }

  if (session.user.role === 'student') {
    return <StudentLayout />;
  }

  return <p>Unauthorized</p>;
};

export default HomePage;

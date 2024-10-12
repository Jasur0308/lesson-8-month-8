import React from 'react';
import { SubmitHandler } from 'react-hook-form'; 
import { useLoginMutation } from '../../api/authApi';
import { useNotification } from '../../hooks/useNotification';
import AuthForm from './AuthForm';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const notify = useNotification();

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data).unwrap();
      notify('Login successful!', 'success');
    } catch (error: any) {
      notify('Login failed! Please check your credentials.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back!</h1>
        <AuthForm onSubmit={handleLogin} title="Login" />
      </div>
    </div>
  );
};

export default Login;
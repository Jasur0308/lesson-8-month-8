import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface AuthFormProps {
  onSubmit: SubmitHandler<LoginFormInputs>;
  title: string;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, title }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          })}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? 'border-red-500' : ''
          }`}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>
      
      <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition">
        Login
      </button>
    </form>
  );
};

export default AuthForm;
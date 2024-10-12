import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRegisterMutation } from '../../api/authApi';
import { useNotification } from '../../hooks/useNotification';

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const notify = useNotification();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: {
          firstname: data.firstName,
          lastname: data.lastName,
        },
        avatar: data.avatar,
      }).unwrap();
      notify('Registration successful!', 'success');

    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Registration failed! Please try again.';
      notify(errorMessage, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8 space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <div className="input-group">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: 'First name is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          id="lastName"
          {...register('lastName', { required: 'Last name is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}
      </div>

      <div className="input-group">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
      </div>

      <div className="input-group">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar URL</label>
        <input
          type="url"
          id="avatar"
          {...register('avatar', { 
            required: 'Avatar URL is required',
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Invalid URL'
            }
          })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.avatar && <span className="text-red-600 text-sm">{errors.avatar.message}</span>}
      </div>
      
      <button 
        type="submit" 
        className={`w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`} 
        disabled={isLoading}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
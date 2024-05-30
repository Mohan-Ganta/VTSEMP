import * as React from 'react';
import { register } from '../api';

export default function Register({ setAuthState, setUser }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignUpHandle = async () => {
    if (email && password) {
      try {
        await register(email, password);
        setAuthState('login');  
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-full">
        <div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
          <h1 className='text-5xl font-semibold'>Register</h1>
          <p className='font-medium text-lg text-gray-500 mt-4'>Welcome! Please enter your details.</p>
          <div className='mt-8'>
            <div className='flex flex-col'>
              <label className='text-lg font-medium'>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="Enter your email"
              />
            </div>
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium'>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
              <button
                onClick={onSignUpHandle}
                className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
                Register
              </button>
            </div>
            <div className='mt-8 flex justify-center items-center'>
              <p className='font-medium text-base'>Already have an account?</p>
              <a href="/login" className='ml-2  text-violet-500'>Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

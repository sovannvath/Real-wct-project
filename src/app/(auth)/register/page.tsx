// app/auth/register/page.tsx
import React from 'react';
import RegisterForm from '@/components/register/register'; // import your RegisterForm component
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
        <RegisterForm />
        <p className="text-sm">
          Having an account  ?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      
    </div>
  );
};

export default RegisterPage;

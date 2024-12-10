// app/auth/login/page.tsx
import React from 'react';
import LoginForm from '@/components/login/Login'; // import the LoginForm component
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <LoginForm />
      <div className="mt-4 text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

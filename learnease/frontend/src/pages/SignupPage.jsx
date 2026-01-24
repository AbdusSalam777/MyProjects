import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#070229]">
      <SignUp
        path="/signup"      // 🔹 tells Clerk this is your local route
        routing="path"      // 🔹 ensures local React routing is used
        appearance={{
          baseTheme: 'dark',
          variables: {
            colorBackground: '#070229',  // dark background
            colorText: '#ffffff',         // text color
            colorPrimary: '#4f46e5',     // button primary color
            colorPrimaryText: '#ffffff', // button text color
          },
          elements: {
            formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;

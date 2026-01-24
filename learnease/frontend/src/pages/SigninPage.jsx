import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#070229]">
      <SignIn
        appearance={{
          baseTheme: "dark", // dark mode
          variables: {
            colorBackground:"#f5f5f5", 
            colorText: "#000000",        // text color
            colorPrimary: "#4f46e5",     // button primary color
            colorPrimaryText: "#ffffff", // button text
          },
          elements: {
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;

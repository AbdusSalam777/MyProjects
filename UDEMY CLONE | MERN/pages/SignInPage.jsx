import React from "react";
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}

export default SignInPage;

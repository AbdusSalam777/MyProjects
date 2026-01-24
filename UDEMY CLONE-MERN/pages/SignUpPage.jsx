import React from "react";
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="inline-block">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </div>
  );
}

export default SignUpPage;

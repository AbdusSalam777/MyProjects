import { SignUp } from "@clerk/clerk-react";
import Navbar from "../components/navbar";

function Register() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-90px)]">
        <div>
          <SignUp path="/register" routing="path" signInUrl="/login" />
        </div>
      </div>
    </>
  );
}

export default Register;

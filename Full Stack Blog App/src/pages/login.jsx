import { SignIn } from "@clerk/clerk-react";
import Navbar from "../components/navbar";

function Login() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-90px)]">
        <div>
          <SignIn
            path="/login"
            routing="path"
            signUpUrl="/register"
          />
        </div>
      </div>
    </>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginBody({ loginemail, setloginemail }) {
  const navigate = useNavigate();
  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [isLoading, setIsLoading] = useState({ login: false, register: false });

  const setmailsign = (e) => setregisteremail(e.target.value);
  const setpasssign = (e) => setregisterpassword(e.target.value);
  const setmaillogin = (e) => setloginemail(e.target.value);
  const setpasslogin = (e) => setloginpassword(e.target.value);

  async function RegisterUser() {
    setIsLoading(prev => ({...prev, register: true}));
    try {
      const response = await fetch("http://localhost:3000/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registeremail,
          password: registerpassword,
        }),
      });
      const data = await response.json();
      alert(data.message || "Sign-up complete ✅");
      setregisteremail("");
      setregisterpassword("");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(prev => ({...prev, register: false}));
    }
  }

  async function LoginUser() {
    setIsLoading(prev => ({...prev, login: true}));
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: loginemail,
          password: loginpassword,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.message === "Login Successful") {
        alert("Login successful ✅");
        navigate("/");
      } else {
        alert("❌ " + (data.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(prev => ({...prev, login: false}));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6">
      {/* Using CSS Grid for equal height columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 w-full max-w-6xl items-stretch">
        {/* Sign Up - now using grid for consistent height */}
        <div className="bg-gray-800/80 backdrop-blur-sm text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-amber-400/30 flex flex-col hover:scale-105 ease-in">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-amber-400 mr-3 rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              Create Account
            </h2>
          </div>
          
          <div className="space-y-5 flex-grow">
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={registeremail}
                onChange={setmailsign}
                placeholder="your@email.com"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={registerpassword}
                onChange={setpasssign}
                placeholder="••••••••"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <button
            onClick={RegisterUser}
            disabled={isLoading.register}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mt-6"
          >
            {isLoading.register ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Sign Up"}
          </button>
        </div>

        {/* Divider for mobile */}
        <div className="lg:hidden flex items-center justify-center col-span-full">
          <div className="h-px bg-gray-600 w-full my-4"></div>
          <span className="mx-4 text-gray-400 text-sm">OR</span>
          <div className="h-px bg-gray-600 w-full my-4"></div>
        </div>

        {/* Login - grid column */}
        <div className="bg-gray-800/80 backdrop-blur-sm text-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-amber-400/30 flex flex-col hover:scale-105 ease-in">
          <div className="flex items-center mb-6">
            <div className="h-10 w-1 bg-amber-400 mr-3 rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500 ">
              Welcome Back
            </h2>
          </div>
          
          <div className="space-y-5 flex-grow">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={loginemail}
                onChange={setmaillogin}
                placeholder="your@email.com"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={loginpassword}
                onChange={setpasslogin}
                placeholder="••••••••"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={LoginUser}
              disabled={isLoading.login}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {isLoading.login ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Login"}
            </button>
            
            <div className="text-center text-sm text-gray-400 mt-3">
              Forgot password? <a href="#" className="text-amber-400 hover:underline">Click here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBody;
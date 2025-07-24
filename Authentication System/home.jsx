import {useNavigate} from "react-router-dom";
function Home() {
  const navigate = useNavigate();

    async function logout(){

        const res = await fetch("http://localhost:3000/logout",{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json();
        if(data.message==="Logged out"){
           navigate("/login");
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-4">🎉 Welcome to the Home Page</h1>
      <p className="text-lg text-gray-300 mb-2">
        You are successfully authenticated.
      </p>
      <p className="text-md text-gray-400 mb-6">Enjoy exploring the app!</p>

      <button
      onClick={logout}
       className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
        Logout
      </button>
    </div>
  );
}
export default Home;

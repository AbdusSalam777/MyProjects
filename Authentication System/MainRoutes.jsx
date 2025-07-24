// MainRoutes.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "./register.jsx";
import Login from "./login.jsx";
import Home from "./home.jsx";

function MainRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const res = await fetch("http://localhost:3000/verify", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.status) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }
    verify();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default MainRoutes;

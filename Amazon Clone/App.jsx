import "./index.css";
import Nav from "./nav.jsx";
import Card from "./card.jsx";
import Cart from "./cart.jsx";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // States
  const [data, setdata] = useState([]);
  const [cartCount, setcartCount] = useState(0);
  const [cartdata, setcartdata] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      const newUserId = crypto.randomUUID(); // Generates a unique ID
      localStorage.setItem("userId", newUserId);
      console.log("🆕 New User ID generated:", newUserId);
    } else {
      console.log("✅ Existing User ID:", localStorage.getItem("userId"));
    }
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("https://amazon-backend-1up3.onrender.com/get-data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setdata(result);
      })
      .catch((error) => {
        console.log("Error getting data from backend ❌", error);
      });
  }, []);

  useEffect(() => {
    setcartCount(cartdata.length);
  }, [cartdata]);

  return (
    <BrowserRouter>
      <Nav cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Card
              data={data}
              setcartCount={setcartdata}
              cartCount={cartCount}
              cartdata={cartdata}
              setcartdata={setcartdata}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartdata={cartdata}
              setcartdata={setcartdata}
              cartCount={cartCount}
              setcartCount={setcartCount}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Nav from "./nav.jsx";
import Card from "./card.jsx";
import {useEffect, useState } from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./cart.jsx";
import NavCart from "./cartnav.jsx";
import Login from "./login.jsx";
import ProtectedRoute  from "./protectedroute.jsx";
import Footer from "./footer.jsx";

function App(){
  const [data, setdata] = useState([]);
  const [cart, updateCart] = useState(0);
  const [cartCount , setcartCount] =useState(0);
  const [query,setquery] = useState("");
  const [cartdata, setcartdata] = useState([]);
  const [loginemail, setloginemail] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dummyjson.com/products");
      const json_res = await response.json();
      setdata(json_res.products);
    }

    fetchData();
  }, []);

  const filtereData = data.filter((item)=>{
    return item.title.toLowerCase().includes(query.toLowerCase())
  })

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<><Login loginemail={loginemail} setloginemail={setloginemail} />
         <Footer/>
        </>} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
              <Nav cart={cart} setquery={setquery}/>
              <Card data={filtereData} cart={cart} updateCart={updateCart} />
              </>
              <Footer/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <>
              <NavCart setcartCount={setcartCount} cartCount={cartCount} />
              <Cart setcartCount={setcartCount} loginemail={loginemail} />
              <Footer/>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

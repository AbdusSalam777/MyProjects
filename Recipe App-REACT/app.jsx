import Nav from "./nav.jsx";
import Card from "./card.jsx";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipe from "./recipe.jsx";

function App() {
  const [meals, setmeals] = useState([]);

  return (
    <BrowserRouter>
      <Nav setmeals={setmeals} />

      <Routes>
        <Route path="/" element={<Card meals={meals} />}></Route>
        <Route path="/recipe/:id" element={<Recipe/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

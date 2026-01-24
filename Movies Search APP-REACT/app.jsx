import Nav from "./nav.jsx"
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {

  return (
    <Nav/>
  );
}

export default App;

//d947e28c28d7b1bf640853894b4bae44  API_KEY
//https://api.themoviedb.org/3/search/movie?api_key=d947e28c28d7b1bf640853894b4bae44&query=avengers  REQUEST_URL
//https://image.tmdb.org/t/p/w500/ IMAGE_URL
//https://api.themoviedb.org/3/trending/movie/week?api_key=d947e28c28d7b1bf640853894b4bae44 TRENDING_URL

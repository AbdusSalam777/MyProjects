import Nav from "./nav.jsx";
import Card from "./card.jsx";
import { useState } from "react";

function App() {

  const [meals,setmeals]=useState([]); 

  return (
    <>
       <Nav setmeals={setmeals}/>
       <Card meals={meals}></Card>
    </>

  )
}

export default App

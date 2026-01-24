import React from 'react'
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Section from '../components/section';
import Testinomials from '../components/testinomials';
import Coursecard from '../components/coursecard';
import Prefooter from '../components/prefooter';
import Footer from '../components/Footer';
function HomePage(){

  return (
    <>
     <Navbar/>
      <Hero/>
      <Section/>
      <Coursecard/>
      <Testinomials/>
      <Prefooter/>
      <Footer/>
    </>
   
  )
}
export default HomePage;

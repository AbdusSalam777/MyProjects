import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <div className='flex justify-between m-10 border-b border-gray-800 pb-5'>

  <Link to="/">
       <img className='h-8 md:h-10 lg:h-12' src="/logo.svg"></img>
  </Link>
    <div>
        <button className='bg-blue-600  text-white p-2 md:p-3  rounded-xl
        active:scale-95 transition-all duration-300'>Create Account</button>
    </div>

    </div>
  )
}

export default Navbar;
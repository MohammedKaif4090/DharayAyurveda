import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo/Untitled_design.pdf_page-0001-removebg-preview (1).png";
import cart_icon from '../../assets/cart_icon.png'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full'>
    <header className="fixed top-0 left-0 w-full bg-green-100 shadow-md z-50">
        <div className="container mx-auto py-2 flex justify-between items-center">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-35 h-20 object-contain" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
         <Link style={{textDecoration:'none', color: '#14532d'}} className=' text-2xl font-semibold'  to='/'> Home </Link>
         <Link className=' text-2xl font-semibold'  to='/cart'> <img src= {cart_icon} alt='' /> </Link>

          </nav>
        </div>
      </header>

          {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-md p-5">
            <button onClick={() => setIsOpen(false)} className="text-right w-full">✖</button>
            <ul className="mt-5 space-y-4">
             <li>
             <Link style={{textDecoration:'none'}} className='text-zinc-50' to='/'> Home </Link>
             </li>
            </ul>
          </div>
        </div>
      )}
    </div>
      
  )
}

export default Navbar

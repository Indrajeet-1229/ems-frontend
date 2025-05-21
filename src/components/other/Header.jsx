import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa"; 

const Header = ({ Heading, Path }) => {
  const { userData, loggedUserId, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='bg-emerald-600 sticky top-0 z-50   text-white p-5 rounded-md shadow-lg w-full'>
      <div className='flex justify-between items-center'>

        <h1 className='text-xl md:text-2xl font-medium'>
          Hello  
          <span className='mx-1'>
            {loggedUserId ? (loggedUserId === "admin@gmail.com" ? "Admin" : userData && userData.name) : "User"} 👋
          </span>
        </h1>


        <button className='md:hidden text-white text-2xl' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

       
        <div className="hidden md:flex items-center gap-7">
          <Link to={Path} className='text-xl font-medium hover:underline'>{Heading}</Link>
          <button 
            onClick={handleLogout} 
            className='bg-white text-emerald-600 font-medium px-4 py-2 rounded-md hover:bg-emerald-700 hover:text-white transition-all duration-300'>
            Log Out
          </button>
        </div>
      </div>

     
      {isMenuOpen && (
        <div className="md:hidden mt-3 flex flex-col items-center gap-4 bg-emerald-700 p-4 rounded-md shadow-md">
          <Link to={Path} className='text-lg font-medium hover:underline' onClick={() => setIsMenuOpen(false)}>{Heading}</Link>
          <button 
            onClick={handleLogout} 
            className='bg-white text-emerald-600 font-medium px-4 py-2 rounded-md hover:bg-emerald-700 hover:text-white transition-all duration-300'>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

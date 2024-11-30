import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeIconOn from '../icons/homeOn.png';
import leafIconOff from '../icons/leafOff.png';
import homeIconOff from '../icons/homeOff.png';
import leafIconOn from '../icons/leafOn.png';
import dashboardIconOn from '../icons/dashboardOn.png';
import dashboardIconOff from '../icons/dashboardOff.png';

const Navbar = ({ title }) => {
  const location = useLocation();
  const isGreenHouseActive = location.pathname === '/greenhouse';
  const isGroveActive = location.pathname === '/grove' || location.pathname === '/';
  const isDashboardActive = location.pathname === '/dashboard';

  return (
    <nav className="bg-[#23472B] p-8 flex flex-col md:flex-row items-start justify-between">
      <h1 className="text-white text-xl md:text-5xl font-montserrat mb-3 md:mb-0">{title}</h1>

      <div className="flex space-x-2 md:space-x-4">
        {/* Ícono para GreenHouse */}
        <Link to="/greenhouse">
          <div className="bg-gray-300 p-1 md:p-2 rounded-full cursor-pointer hover:bg-gray-400 transition">
            <img
              src={isGreenHouseActive ? homeIconOn : homeIconOff}
              alt="GreenHouse Icon"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </div>
        </Link>

        {/* Ícono para Grove */}
        <Link to="/grove">
          <div className="bg-gray-300 p-1 md:p-2 rounded-full cursor-pointer hover:bg-gray-400 transition">
            <img
              src={isGroveActive ? leafIconOn : leafIconOff}
              alt="Grove Icon"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </div>
        </Link>

        {/* Ícono para Dashboard */}
        <Link to="/dashboard">
          <div className="bg-gray-300 p-1 md:p-2 rounded-full cursor-pointer hover:bg-gray-400 transition">
            <img
              src={isDashboardActive ? dashboardIconOn : dashboardIconOff}
              alt="Dashboard Icon"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

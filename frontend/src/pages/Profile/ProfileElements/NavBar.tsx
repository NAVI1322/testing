

import { NavLink } from 'react-router-dom';


const Pro_NavBar = () => {

  return (
    <nav className=" border-gray-200">
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/Profile"
            end
            className={({ isActive }) =>
              isActive ? "font-bold border-b-2 border-black pb-2" : "text-gray-500 hover:text-black pb-2"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-bold border-b-2 border-black pb-2" : "text-gray-500 hover:text-black pb-2"
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Pro_NavBar;
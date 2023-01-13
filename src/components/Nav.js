import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/instagram-logo.png";
import UserMenu from "./UserMenu";

function Nav ({ user }) {
  const [userMenu, setUserMenu] = useState(false);

  function toggleUserMenu(e) {
    e.stopPropagation();
    if (userMenu) {
      setUserMenu(false);
    } else {
      setUserMenu(true);
    }
  }

  function closeUserMenu() {
    setUserMenu(false);
  }
  
  return (
    <nav className="main-nav">
      <div className="nav-inner">
      <Link to='/'>
        <div className="nav-logo">
          <img className="nav-logo-img" src={logo} alt='instagram logo'/>
          <h2>Instagram</h2>
        </div>
      </Link>
        <div className="nav-icons">
          <Link to="/">
            <svg className="nav-icon-home" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"></path></svg>
          </Link>
          <div className="user-menu-container">
            <svg onClick={toggleUserMenu} className="nav-icon-user" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"></path><path fill="none" stroke-miterlimit="10" stroke-width="32" d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"></path></svg>
            {userMenu &&
              <UserMenu user={user} close={closeUserMenu}/>
            }
          </div>
        </div>
      </div>
    </nav>
  )
} 

export default Nav;
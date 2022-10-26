
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import menu from '../../icons/menu.svg'
import cawfeeCrow from '../../icons/cawfee_crow.png'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='homepage-navbar'>
      <div>
        <img src={menu}/>
      </div>
      <div className='navbar-logo'>
        Cawfee <img height='100' width='100' src={cawfeeCrow}/>
      </div>
      <div>
        Get Started
      </div>
    </nav>
  )
  // return (
  //   <nav>
  //     <ul>
  //       <li>
  //         <NavLink to='/' exact={true} activeClassName='active'>
  //           Home
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/login' exact={true} activeClassName='active'>
  //           Login
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/sign-up' exact={true} activeClassName='active'>
  //           Sign Up
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to='/users' exact={true} activeClassName='active'>
  //           Users
  //         </NavLink>
  //       </li>
  //       <li>
  //         <LogoutButton />
  //       </li>
  //     </ul>
  //   </nav>
  // );
}

export default NavBar;

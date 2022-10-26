
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from '../auth/LogoutButton';
import menu from '../../icons/menu.svg'
import cawfeeCrow from '../../icons/cawfee_crow.png'
import profile from '../../icons/profile.svg'
import './NavBar.css'

const NavBar = () => {
  const [visibility, setVisible] = useState(false)
  const [coffeeVisible, setCoffeeVisible] = useState(false)

  // let history = useHistory()
  return (
    <nav>
      <div className='homepage-navbar'>
        {/* <div>
        <img src={menu}/>
      </div> */}
        <div className='navbar-logo' >
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/'>Cawfee</NavLink>
          {/* Cawfee <img height='100' width='100' src={cawfeeCrow}/> */}
        </div>

        <div
          onMouseEnter={() => {
            setVisible(true)
            setCoffeeVisible(true)
          }}
          onMouseLeave={() => setVisible(false)}
        >
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/'>Shop</NavLink>
        </div>
        <div
          onMouseEnter={() => {
            setVisible(true)
            setCoffeeVisible(false)
          }}
          onMouseLeave={() => setVisible(false)}>
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/'>Roasters</NavLink></div>
        <div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}>
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/'>Learn</NavLink></div>

        <div className='navbar-right'>
          <button className='navbar-trynow'>TRY NOW</button>
          <div><img height='30' width='30' src={profile} /></div>
        </div>
      </div>

      {visibility &&
        <div>
          <div className='navbar-underline'></div>
          <div className='navbar-dropdown'
            onMouseLeave={() => setVisible(false)}
            onMouseEnter={() => {
              setVisible(true)
              setCoffeeVisible(true)
            }}
          >
            {coffeeVisible && <div className='navbar-dropdown-coffee'>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/'>All Coffee</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/'>Single Origin</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/'>Blends</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/'>Light Roast</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/'>Medium Roast</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/'>Dark Roast</NavLink></span>
            </div>}
          </div>
        </div>}
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

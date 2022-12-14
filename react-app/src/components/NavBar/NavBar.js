
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginFormModal from '../auth';
import './NavBar.css'
import LogoutButton from '../auth/LogoutButton';
import Cart from '../cart/cart';

const NavBar = () => {
  const [visibility, setVisible] = useState(false)
  const [coffeeVisible, setCoffeeVisible] = useState(false)

  const url = useLocation().pathname
  // console.log("URL", url)
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <LogoutButton />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }

  return (
    <nav>
      <div className='homepage-navbar'>
        <div className='navbar-logo' >
          <NavLink style={{ textDecoration: 'none', color: 'black' }} to='/'>Cawfee</NavLink>
        </div>

        <div
          onMouseEnter={() => {
            setVisible(true)
            setCoffeeVisible(true)
          }}
          onMouseLeave={() => setVisible(false)}
        >
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/cawfee'>Shop</NavLink>
        </div>
        <div>
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/roasters'>Roasters</NavLink></div>
        <div>
          {/* <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/'>Learn</NavLink> */}
          <a className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            href='https://github.com/jaeyoungh1/drink_cawfee/wiki'>Learn</a>
            </div>

        <div className='navbar-right'>
            <NavLink className='navbar-trynow-link' to='/cawfee'>
          <button className='navbar-trynow'>
              TRY NOW
          </button>
            </NavLink>
          {sessionLinks}
          {url !== '/checkout' && <Cart />}
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
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee'>All Coffee</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee/?origin=singleOrigin'>Single Origin</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee/?origin=Various%20(blend)'>Blends</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee/?roast=light'>Light Roast</NavLink></span>
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee/?roast=medium'>Medium Roast</NavLink></span>
              {/* ^^^^^^^ CHANGE THIS URL PARAMS  */}
              <span><NavLink className='navbar-dropdown-coffee-selection' style={{ textDecoration: 'none', color: 'black' }} to='/cawfee/?roast=dark'>Dark Roast</NavLink></span>
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

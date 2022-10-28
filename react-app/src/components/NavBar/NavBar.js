
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginFormModal from '../auth';
import './NavBar.css'
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const [visibility, setVisible] = useState(false)
  const [coffeeVisible, setCoffeeVisible] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            to='/cawfee'>Shop</NavLink>
        </div>
        <div>
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/'>Roasters</NavLink></div>
        <div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}>
          <NavLink className='navbar-link' style={{ textDecoration: 'none', color: 'black' }}
            to='/'>Learn</NavLink></div>

        <div className='navbar-right'>
          <button className='navbar-trynow'>TRY NOW</button>
          {/* <LoginFormModal /> */}
          {sessionLinks}
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

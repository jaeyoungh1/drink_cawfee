import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import account from '../../icons/account.svg'
import x from '../../icons/x.svg'

import './LogoutButton.css'

const LogoutButton = () => {
  const [showProfile, setShowProfile] = useState(false);
  const user = useSelector(state => state.session.user)

  const openProfile = () => {
    if (showProfile) return;
    else setShowProfile(true)
  }
  useEffect(() => {
    if (!showProfile) return;

    const closeProfile = () => {
      setShowProfile(false);
    };

    document.addEventListener('click', closeProfile);

    return () => document.removeEventListener("click", closeProfile);
  }, [showProfile]);


  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  if (user) {

    return (
      <>
        <div className='login-button' onClick={() => setShowProfile(true)}>
          <img className='login-button' src={account} />
        </div>
        {showProfile && (
          <div className='profile-modal'>
            <span id='close-logout-modal'>
              <img id='logout-x' src={x} />
            </span>
            <div className='profile-modal-name'>
              {user.first_name} {user.last_name.slice(0, 1)}.
            </div >
            {user.curator && <div className='profile-modal-curator'>
              Verified Cawfee Curator
            </div>}
            <div className='profile-modal-line'></div>
            {user.curator && <div className='profile-modal-interact'>
              <NavLink className='profile-modal-interact' to='/cawfee/new'>
                Curate a New Coffee
              </NavLink>
            </div>}
            {user.curator && <div className='profile-modal-interact'>
              <NavLink className='profile-modal-interact' to='/my-curations'>
                View My Coffee Curations
              </NavLink>
            </div>}
            {/* {!user.curator && <div className='profile-modal-interact'>
              <NavLink className='profile-modal-interact' to='/cawfee/new'>
                Become a Curator
              </NavLink>
            </div>} */}
            {/* <div className='profile-modal-interact'>
              Account Details
            </div> */}
            <div className='profile-modal-interact'>
              <NavLink className='profile-modal-interact' to='/my-reviews'>
              My Reviews
              </NavLink>
            </div>
            <div className='profile-modal-interact' onClick={() => onLogout()}>
              Log Out
            </div>


          </div>
        )}
      </>
    )
  }
};

export default LogoutButton;

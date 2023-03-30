import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logoLarge.svg';
import Cart from '../Cart'

function Nav() {
  if (Auth.loggedIn()) {
    return (
      <ul className="flex-row">
        <li className="mx-1">
          <Link to="/orderHistory">Order History</Link>
        </li>
        <li className="mx-1">
          {/* this is not using the Link component to logout or user and then refresh the application to the start */}
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
        </li>
      </ul>
    );
  } else {
    return (
      <div>
        <Logo className="p-5" />
        <div className="flex-row flex justify-end pb-4 px-4">
          {/* <Link to="/login" className='bg-primary-100/40 px-2 p-px rounded-md text-primary-900 border border-primary-900'>Login</Link> */}
          <Cart />
        </div>
      </div>
    );
  }
}

export default Nav;

import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/logoLarge.svg';

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
      <Logo className="p-4" />
        <ul className="flex-row flex justify-center">
          <li className="">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;

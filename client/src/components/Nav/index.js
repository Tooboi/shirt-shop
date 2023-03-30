import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logoLarge.svg';

function Nav() {
  if (Auth.loggedIn()) {
    return (
      <div>
      <Link to='/'><Logo className="p-5 max-w-3xl mx-auto" /></Link>
        <div className="flex-row flex justify-between py-2 px-4 border-t-2 border-primary-900 bg-primary-200/20">
          <Link to="/" onClick={() => Auth.logout()} className="bg-primary-100/40 hover:bg-primary-100/50 active:bg-primary-100/40 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            Logout
          </Link>
          <Link to="/orderHistory" className="bg-primary-100/40 hover:bg-primary-100/50 active:bg-primary-100/40 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            My Orders
          </Link>
          <Link to="/cart" className="bg-primary-100/40 hover:bg-primary-100/50 active:bg-primary-100/40 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            Cart
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link to='/'><Logo className="p-5 max-w-3xl mx-auto" /></Link>
        <div className="flex-row flex justify-end py-2 px-4 border-t-2 border-primary-900 bg-primary-200/20">
          <Link to="/login" className="bg-primary-100/40 hover:bg-primary-100/50 active:bg-primary-100/40 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;

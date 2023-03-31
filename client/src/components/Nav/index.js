import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../../utils/queries';

import { ReactComponent as Logo } from '../../assets/logoLarge.svg';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { IdentificationIcon } from "@heroicons/react/24/outline";

function Nav() {
  const { data } = useQuery(QUERY_USER);
  const user = data.user
  if (Auth.admin()) {
    return (
      <div>
        <Link to="/">
          <Logo className="p-5 hover:drop-shadow-xl active:drop-shadow-md transition-all max-w-3xl mx-auto" />
        </Link>
        <div className="flex-row flex justify-between py-2 px-4 border-t-2 border-primary-900 bg-primary-200/20">
          <Link to="/" onClick={() => Auth.logout()} className="flex bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            Logout
          </Link>
          <Link to="/orderHistory" className="bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            My Orders
          </Link>
          <Link to="/admin" className="flex bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            <IdentificationIcon class="h-6 w-6 text-primary-900" /><p className='pl-2'>{user.firstName}</p> 
          </Link>
          <Link to="/cart" className="bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            <ShoppingCartIcon class="h-6 w-6 text-primary-900" />
          </Link>
        </div>
      </div>
    );
  }
  if (Auth.loggedIn()) {
    return (
      <div>
        <Link to="/">
          <Logo className="p-5 hover:drop-shadow-xl active:drop-shadow-md transition-all max-w-3xl mx-auto" />
        </Link>
        <div className="flex-row flex justify-between py-2 px-4 border-t-2 border-primary-900 bg-primary-200/20">
          <Link to="/" onClick={() => Auth.logout()} className="flex bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            Logout
          </Link>
          <Link to="/orderHistory" className="bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            My Orders
          </Link>
          <Link to="/cart" className="bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition px-2 p-px rounded-md text-primary-900 border border-primary-900">
            <ShoppingCartIcon class="h-6 w-6 text-primary-900" />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/">
          <Logo className="p-5 hover:drop-shadow-xl active:drop-shadow-md transition-all max-w-3xl mx-auto" />
        </Link>
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

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const Admin = () => {
  const { data } = useQuery(QUERY_USER);
  const user = data?.user;

  if (Auth.admin()) {
    return (
      <div className=" border-t-2 border-primary-900 p-6">
        <div className="flex justify-center py-6">
          <ShieldCheckIcon className="h-6 w-6 stroke-primary-200 stroke-2" />
          <p className="px-2 text-xl select-none">{user?.firstName}</p>
        </div>
        <div className="flex justify-center flex-col border-2 border-primary-900 rounded-lg shadow-lg bg-primary-300/30 max-w-md mx-auto">
          <div className="flex justify-center pt-12">
            <Link to="./create">
              <div className="bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition p-2 w-48 text-center rounded-md text-primary-900 border-2 border-primary-900 cursor-pointer">Add New Item</div>
            </Link>
          </div>
          <div className="flex justify-center pt-6 pb-12">
            <Link to="./remove">
              <div className="bg-primary-100/40 hover:bg-orange-400 active:bg-teal-400 transition p-2 w-48 text-center rounded-md text-primary-900 border-2 border-primary-900 cursor-pointer">Remove Item</div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    window.location.replace('/');
  }
};

export default Admin;

import React from 'react';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

const NoMatch = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-24 border-t-2 border-primary-900">
        <h1 className="pb-10 text-lg">404 Page Not Found</h1>
        <CubeTransparentIcon className="h-24 w-24 text-primary-300" />
      </div>
    </div>
  );
};

export default NoMatch;

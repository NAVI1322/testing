import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-white">
      
      <div className="mt-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="Access Denied"
          className="w-20 h-30 opacity-90"
        />
      </div>
      <div className="text-center">
        
        <h1 className="text-4xl font-extrabold text-red-700 dark:text-red-500 mb-6">
          Access Denied
        </h1>
        <p className="text-lg font-light mb-6">
          You do not have permission to access this page. Please check your credentials or contact the administrator.
        </p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/dashboard')}
        >
          Go Back to Home
        </Button>
      </div>
      
    </div>
  );
};

export default AccessDenied;
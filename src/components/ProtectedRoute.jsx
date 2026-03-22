import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // Let the AuthContext handle initial loading state

  if (!user) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center text-slate-800">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-3xl font-extrabold mb-2 text-slate-900">Access Denied</h2>
        <p className="text-slate-600 max-w-md">
          You do not have the required permissions ({allowedRoles.join(', ')}) to view this page. You are currently logged in as {user.role}.
        </p>
        <button 
          onClick={() => window.history.back()} 
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow"
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

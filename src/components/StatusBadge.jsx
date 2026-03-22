import React from 'react';

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100 text-gray-800';
  
  if (!status) return null;

  switch (status.toUpperCase()) {
    case 'PENDING':
      bgColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    case 'ASSIGNED':
      bgColor = 'bg-blue-100 text-blue-800 border-blue-200';
      break;
    case 'IN_PROGRESS':
      bgColor = 'bg-purple-100 text-purple-800 border-purple-200';
      break;
    case 'COMPLETED':
      bgColor = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'REJECTED':
      bgColor = 'bg-red-100 text-red-800 border-red-200';
      break;
    default:
      bgColor = 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${bgColor}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;

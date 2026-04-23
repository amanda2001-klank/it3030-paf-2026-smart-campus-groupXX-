import React from 'react';

const IncidentPriorityBadge = ({ priority }) => {
  const getPriorityStyles = () => {
    switch (priority?.toUpperCase()) {
      case 'HIGH':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'LOW':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${getPriorityStyles()}`}>
      {priority || 'NONE'}
    </span>
  );
};

export default IncidentPriorityBadge;

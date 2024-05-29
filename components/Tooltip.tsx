import React from 'react';

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-full transform -translate-x-2/3 translate-y-9 mb-2 hidden group-hover:flex items-center justify-center w-max bg-gray-700 text-white text-xs rounded px-2 py-1">
        {message}
      </div>
    </div>
  );
};

export default Tooltip;

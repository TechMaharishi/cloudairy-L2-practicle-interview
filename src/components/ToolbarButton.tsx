import React from 'react';
import type { ToolbarButtonProps } from '@/types/types';

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  onClick, 
  active = false, 
  disabled = false, 
  darkMode,
  children,
  title = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded transition-all duration-200 flex items-center justify-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-10'}
        ${active 
          ? darkMode 
            ? 'bg-blue-500 text-white' 
            : 'bg-blue-100 text-blue-700' 
          : darkMode 
            ? 'text-slate-300 hover:bg-slate-700' 
            : 'text-slate-700 hover:bg-slate-200'
        }
      `}
    >
      {children}
    </button>
  );
};
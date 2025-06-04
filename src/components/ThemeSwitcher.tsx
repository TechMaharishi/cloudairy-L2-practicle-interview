import React from 'react';
import { Moon, Sun } from 'lucide-react';
import type { ThemeSwitcherProps } from '@/types/types';

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-colors duration-300 hover:bg-opacity-10 ${darkMode
          ? 'hover:bg-white text-yellow-300'
          : 'hover:bg-black text-slate-700'
        }`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
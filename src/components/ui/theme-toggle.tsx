
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {theme === 'light' ? (
          <Sun className="h-5 w-5 text-yellow-500 animate-in spin-in-180 duration-300" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400 animate-in spin-in-180 duration-300" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

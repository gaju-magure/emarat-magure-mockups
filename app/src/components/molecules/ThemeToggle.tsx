import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2.5 rounded-lg
        bg-background-secondary
        hover:bg-background-tertiary
        transition-colors
      "
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-warning" />
      ) : (
        <MoonIcon className="w-6 h-6 text-primary" />
      )}
    </button>
  );
}

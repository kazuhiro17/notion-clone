import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/modules/theme/theme.state';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      aria-label="テーマ切り替え"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
      ) : (
        <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
      )}
    </button>
  );
}
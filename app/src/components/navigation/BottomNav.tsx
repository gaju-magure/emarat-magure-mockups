import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { mobileBottomNav } from '../../config/navigation';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';

export function BottomNav() {
  const location = useLocation();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const isActive = (path: string) => {
    if (path === '/menu') {
      return false; // Menu is special, never shows active state
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getIcon = (iconName: string, active: boolean) => {
    const icons = active ? HeroIconsSolid : HeroIcons;
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:hidden">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {mobileBottomNav.map((item) => {
          const active = isActive(item.path);
          const label = isRTL && item.labelAr ? item.labelAr : item.label;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 transition ${
                active
                  ? 'text-emarat-blue'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <div className="relative">
                {getIcon(item.icon, active)}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe area spacer for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}

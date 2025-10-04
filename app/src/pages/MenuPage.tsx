import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppLayout } from '../components/layout/AppLayout';
import { mainNavigation } from '../config/navigation';
import * as HeroIcons from '@heroicons/react/24/outline';
import { useLanguage } from '../contexts/LanguageContext';

export function MenuPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const breadcrumbs = [{ label: 'Menu' }];

  const getIcon = (iconName: string) => {
    const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Menu</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse all available features and tools
          </p>
        </div>

        {mainNavigation.map((group) => (
          <div key={group.id}>
            <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              {isRTL && group.labelAr ? group.labelAr : group.label}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {group.items.map((item) => {
                const hasAccess =
                  !item.roles || item.roles.length === 0 || item.roles.includes(user?.role || '');

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900 ${
                      !hasAccess ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={(e) => {
                      if (!hasAccess) e.preventDefault();
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {isRTL && item.labelAr ? item.labelAr : item.label}
                      </h3>
                      {!hasAccess && item.roles && (
                        <span className="text-xs text-amber-600 dark:text-amber-400">
                          Requires: {item.roles.join(', ')}
                        </span>
                      )}
                    </div>
                    {item.badge && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

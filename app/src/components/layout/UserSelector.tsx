import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const DEMO_USERS = [
  { email: 'sarah@emarat.ae', name: 'Sarah Johnson', role: 'Store Manager' },
  { email: 'fatima@emarat.ae', name: 'Fatima Al Mansoori', role: 'HR Manager' },
  { email: 'ali@emarat.ae', name: 'Ali Hassan', role: 'Fuel Station Attendant' },
  { email: 'rashid@emarat.ae', name: 'Rashid Ahmed', role: 'Finance Manager' },
  { email: 'layla@emarat.ae', name: 'Layla Ibrahim', role: 'Retail Store Employee' },
  { email: 'mohammed@emarat.ae', name: 'Mohammed Khalil', role: 'Procurement Specialist' },
];

export function UserSelector() {
  const { user, switchUser } = useAuth();
  const { direction } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const isRTL = direction === 'rtl';

  const handleUserSwitch = (email: string) => {
    switchUser(email);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 rounded-lg p-2 text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
        aria-label="Switch User (Demo)"
      >
        <UserCircleIcon className="h-5 w-5" />
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div
            className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full z-20 mt-2 w-72 rounded-lg border bg-background-elevated py-2 shadow-lg`}
            style={{ borderColor: 'var(--color-border-default)' }}
          >
            <div className="border-b px-4 py-2" style={{ borderBottomColor: 'var(--color-border-default)' }}>
              <p className="text-xs font-semibold text-text-secondary">
                DEMO: Switch User
              </p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {DEMO_USERS.map((demoUser) => (
                <button
                  key={demoUser.email}
                  onClick={() => handleUserSwitch(demoUser.email)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-background-tertiary ${
                    user?.email === demoUser.email ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <span className="text-sm font-semibold">
                      {demoUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-text-primary">
                      {demoUser.name}
                    </p>
                    <p className="truncate text-xs text-text-secondary">
                      {demoUser.role}
                    </p>
                  </div>
                  {user?.email === demoUser.email && (
                    <div className="h-2 w-2 rounded-full bg-success" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

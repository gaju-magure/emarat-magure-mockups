/**
 * SearchBar Component
 *
 * Global search bar with keyboard shortcuts and recent searches
 * Used in top navigation bar
 */

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/classnames';
import { useLanguage } from '@/contexts/LanguageContext';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  href: string;
}

export interface SearchBarProps {
  /** Search handler */
  onSearch?: (query: string) => void;
  /** Search results */
  results?: SearchResult[];
  /** Placeholder text */
  placeholder?: string;
  /** Additional className */
  className?: string;
}

/**
 * SearchBar Component
 *
 * @example
 * ```tsx
 * <SearchBar
 *   onSearch={(query) => handleSearch(query)}
 *   results={searchResults}
 * />
 * ```
 */
export function SearchBar({
  onSearch,
  results = [],
  placeholder,
  className,
}: SearchBarProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultPlaceholder = placeholder || t('jarvis.placeholder') || 'Search...';

  // Handle search input
  const handleChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative', className)}>
      {/* Search input */}
      <div className="relative">
        {/* Search icon */}
        <MagnifyingGlassIcon className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary pointer-events-none" />

        {/* Input field */}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder={defaultPlaceholder}
          className={cn(
            'w-full h-10 ps-10 pe-20',
            'bg-background-secondary border border-border-default rounded-lg',
            'text-text-primary placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-all duration-200'
          )}
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute end-12 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}

        {/* Keyboard shortcut hint */}
        <div className="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-text-tertiary text-xs font-medium pointer-events-none">
          <kbd className="px-1.5 py-0.5 bg-background-primary border border-border-default rounded">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-background-primary border border-border-default rounded">
            K
          </kbd>
        </div>
      </div>

      {/* Search results dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute top-full start-0 end-0 mt-2 z-50',
            'bg-background-elevated border border-border-default rounded-lg shadow-xl',
            'max-h-96 overflow-y-auto'
          )}
        >
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.href}
                  className={cn(
                    'flex items-start gap-3 px-4 py-3',
                    'hover:bg-background-secondary',
                    'transition-colors'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-text-tertiary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {result.title}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {result.category}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : query ? (
            <div className="px-4 py-8 text-center text-text-tertiary text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-text-tertiary text-sm">
              Start typing to search...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

SearchBar.displayName = 'SearchBar';

import React from 'react';
import { cn } from '@/lib/utils';

export default function SkipToMain() {
  return (
    <a
      href="#content"
      className={cn(
        'sr-only focus:not-sr-only',
        'focus:fixed focus:left-4 focus:top-4 focus:z-50',
        'focus:block focus:rounded-md focus:bg-primary focus:px-4 focus:py-3',
        'focus:text-primary-foreground'
      )}
    >
      Skip to main content
    </a>
  );
} 
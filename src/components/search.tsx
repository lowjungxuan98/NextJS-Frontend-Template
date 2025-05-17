'use client'

import { useCallback, useState } from 'react'
import { IconSearch, IconX } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export function Search({ className }: { className?: string }) {
  const [query, setQuery] = useState('')

  const handleClear = useCallback(() => {
    setQuery('')
  }, [])

  return (
    <div
      className={cn(
        'border-input bg-background ring-offset-background focus-within:ring-ring relative flex h-9 w-full max-w-sm items-center justify-between rounded-md border px-3 py-2 focus-within:ring-1 focus-within:outline-none sm:max-w-md md:max-w-lg lg:max-w-xl',
        className
      )}
    >
      <IconSearch
        size={18}
        className='text-muted-foreground mr-2 h-4 w-4'
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search'
        className='placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none'
      />
      {query.length > 0 && (
        <button
          type='button'
          aria-label='Clear search'
          onClick={handleClear}
          className='text-muted-foreground hover:text-foreground'
        >
          <IconX size={18} />
        </button>
      )}
    </div>
  )
} 
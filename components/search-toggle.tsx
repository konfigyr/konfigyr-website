'use client';

import type { ComponentProps } from 'react';

import { Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { Button } from '@/components/ui/button';
import { KbdGroup, Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/cn';

export function SearchToggle(props: ComponentProps<'button'>) {
  const { enabled, setOpenSearch } = useSearchContext();

  if (!enabled) {
    return null;
  }

  return (
    <Button
      {...props}
      size="sm"
      variant="secondary"
      className={cn(
        "bg-surface text-foreground dark:bg-card relative justify-start pl-3 font-medium md:border",
        props.className,
      )}
      onClick={() => setOpenSearch(true)}
    >
      <Search />
      <span className="hidden md:flex text-muted-foreground">Search...</span>
      <div className="absolute top-1.5 right-1.5 hidden gap-1 md:flex">
        <KbdGroup>
          <Kbd className="border">⌘</Kbd>
          <Kbd className="border">K</Kbd>
        </KbdGroup>
      </div>
    </Button>
  );
}

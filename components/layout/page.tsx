'use client';

import type { ComponentProps, ReactNode } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { TOCItemType } from 'fumadocs-core/toc';

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnchorProvider, useActiveAnchors } from 'fumadocs-core/toc';
import { useTreeContext } from 'fumadocs-ui/contexts/tree';
import { Link, usePathname } from 'fumadocs-core/framework';
import { cn } from '@/lib/cn';

export interface DocsPageProps {
  toc?: TOCItemType[];

  children: ReactNode;
}

export function DocsPage({ toc = [], ...props }: DocsPageProps) {
  return (
    <AnchorProvider toc={toc}>
      <div className="flex w-full min-w-0 flex-col overflow-auto">
        <article className="flex flex-1 flex-col w-full max-w-[860px] gap-4 p-4 md:px-6 md:mx-auto mb-8">
          {props.children}
          <Footer />
        </article>
      </div>
      {toc.length > 0 && (
        <div className="sticky top-(--fd-nav-height) w-[286px] shrink-0 p-4 max-xl:hidden">
          <p className="text-sm text-fd-muted-foreground mb-2">On this page</p>
          <div className="flex flex-col">
            {toc.map((item) => (
              <TocItem key={item.url} item={item} />
            ))}
          </div>
        </div>
      )}
    </AnchorProvider>
  );
}

export function DocsBody(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('prose', props.className)}>
      {props.children}
    </div>
  );
}

export function DocsDescription(props: ComponentProps<'p'>) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn('mb-6 text-lg text-fd-muted-foreground', props.className)}
    >
      {props.children}
    </p>
  );
}

export function DocsTitle(props: ComponentProps<'h1'>) {
  return (
    <h1 {...props} className={cn('text-3xl font-semibold', props.className)}>
      {props.children}
    </h1>
  );
}

function TocItem({ item }: { item: TOCItemType }) {
  const isActive = useActiveAnchors().includes(item.url.slice(1));

  return (
    <a
      href={item.url}
      className={cn(
        'text-sm text-fd-foreground/80 py-1',
        isActive && 'text-fd-primary',
      )}
      style={{
        paddingLeft: Math.max(0, item.depth - 2) * 16,
      }}
    >
      {item.title}
    </a>
  );
}

interface FooterLinkItem {
  url: string;
  name: ReactNode;
  section?: ReactNode;
}

function Footer() {
  const { root } = useTreeContext();
  const pathname = usePathname();

  const flatten = useMemo(() => {
    const result: FooterLinkItem[] = [];

    function scan(items: PageTree.Node[], parent?: PageTree.Folder) {
      for (const item of items) {
        if (item.type === 'page') {
          result.push({
            url: item.url,
            name: item.name,
            section: parent?.name,
          });
        } else if (item.type === 'folder') {
          if (item.index) {
            result.push({
              url: item.index.url,
              name: item.index.name,
              section: item.name,
            });
          }
          scan(item.children, item);
        }
      }
    }

    scan(root.children);
    return result;
  }, [root]);

  const { previous, next } = useMemo(() => {
    const idx = flatten.findIndex((item) => item.url === pathname);

    if (idx === -1) return {};
    return {
      previous: flatten[idx - 1],
      next: flatten[idx + 1],
    };
  }, [flatten, pathname]);

  if (!previous && !next) {
    return null
  }

  return (
    <nav className="flex flex-row justify-between gap-2 items-center border-t py-4 my-2">
      {previous && (
        <Link href={previous.url} className="p-1 rounded-md pr-2 pl-7">
          <small className="text-muted-foreground">Previous</small>
          <div className="relative my-1">
            {previous.section && (
              <small className="block">
                {previous.section}
              </small>
            )}
            <span className="font-medium">
              {previous.name}
            </span>
            <ChevronLeft className="absolute top-[10px] -left-[28px]"/>
          </div>
        </Link>
      )}
      {next && (
        <Link href={next.url} className="p-1 rounded-md text-right pl-2 pr-7 ml-auto">
          <small className="text-muted-foreground">Next</small>
          <div className="relative my-1">
            {next.section && (
              <small className="block">
                {next.section}
              </small>
            )}
            <span className="font-medium">
              {next.name}
            </span>
            <ChevronRight className="absolute top-[10px] -right-[28px]"/>
          </div>
        </Link>
      )}
    </nav>
  );
}

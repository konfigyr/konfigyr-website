'use client';

import { type ReactNode, useMemo } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';

import Link from 'fumadocs-core/link';
import { TreeContextProvider, useTreeContext } from 'fumadocs-ui/contexts/tree';
import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import { usePathname } from 'fumadocs-core/framework';
import { ChevronRight } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SearchToggle } from '@/components/search-toggle';

export interface DocsLayoutProps {
  tree: PageTree.Root;
  children: ReactNode;
}

export function DocsLayout({ tree, children }: DocsLayoutProps) {
  return (
    <TreeContextProvider tree={tree}>
      <div id="nd-docs-layout" className="md:flex flex-1 flex-row [--fd-nav-height:56px]">
        <div className="md:hidden p-2 flex items-center justify-between sticky top-(--fd-nav-height) z-30 bg-background border-b">
          <SidebarTrigger />
          <Breadcrumbs tree={tree} />
          <SearchToggle />
        </div>

        <DocsSidebar />

        {children}
      </div>
    </TreeContextProvider>
  );
}

function Breadcrumbs({ tree }: { tree: PageTree.Root }) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-row items-center gap-1 text-sm font-medium text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>
          {i > 0 && (
            <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />
          )}
          {item.url ? (
            <Link href={item.url} className="truncate hover:text-accent-foreground">
              {item.name}
            </Link>
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function DocsSidebar() {
  const { root } = useTreeContext();

  const children = useMemo(() => {
    return root.children.filter(item => item.type === 'folder').map((item) => (
      <SectionGroup key={item.$id} section={item} />
    ));
  }, [root]);

  return (
    <Sidebar className="sticky top-(--fd-nav-height) w-[286px] h-auto z-30 hidden overscroll-none bg-transparent lg:flex">
      <SidebarContent>
        <div className="hidden mt-4 px-2 md:block">
          <SearchToggle className="w-full"/>
        </div>

        {children}
      </SidebarContent>
    </Sidebar>
  );
}

function SectionGroup({ section, className }: { section: PageTree.Folder, className?: string }) {
  if (section.type !== 'folder') {
    return null;
  }

  return (
    <SidebarGroup className={className}>
      <SidebarGroupLabel>
        {section.icon}
        {section.name}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.children.map((item) => (
            <SectionItem key={item.$id} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SectionItem({ item, }: { item: PageTree.Node }) {
  const pathname = usePathname();

  if (item.type === 'page') {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={pathname === item.url}
          asChild
        >
          <Link href={item.url}>
            {item.icon}
            {item.name}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return null;
}

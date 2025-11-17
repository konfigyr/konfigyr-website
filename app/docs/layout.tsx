import { source } from '@/lib/source';
import { DocsLayout } from '@/components/layout/docs';
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <SidebarProvider className="min-h-min flex-1 items-start px-0">
      <DocsLayout tree={source.pageTree}>
        {children}
      </DocsLayout>
    </SidebarProvider>
  );
}

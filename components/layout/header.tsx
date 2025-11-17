import Link from 'next/link';

import { siteConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="w-full sticky top-0 bg-background z-50 border-b">
      <div className="container-wrapper px-6">
        <div className="flex h-14 gap-6 items-center">
          <Link href="/" className="font-medium">
            {siteConfig.name}
          </Link>

          <nav className="flex items-center justify-between">
            <ul className="flex gap-2 items-center">
              <li>
                <Link href="/docs">Docs</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

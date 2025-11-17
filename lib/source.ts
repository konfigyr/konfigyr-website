import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

function loadIcon(name: string) {
  if (name && name in icons) {
    return createElement(icons[name as keyof typeof icons]);
  }

  return null;
}

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  icon: loadIcon,
});

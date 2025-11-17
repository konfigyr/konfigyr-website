import type { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from '@/components/layout/page';
import { getMDXComponents } from '@/lib/mdx';
import { source } from '@/lib/source';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata( props: PageProps<'/docs/[[...slug]]'> ): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <>
      <section className="container py-18 md:py-30 lg:py-40">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Configuration made easy
            </h1>
            <div className="mx-auto max-w-[700px] md:text-lg lg:text-xl leading-relaxed">
              <p className="my-4">
                Secure secrets, zero headaches, and configs that actually work across all your environments.
              </p>
              <p className="font-medium">
                Built by devs who have been there.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button className="h-14 px-12 text-lg" asChild>
              <Link href="/docs">
                Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

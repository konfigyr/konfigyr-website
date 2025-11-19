import type { ComponentProps, HTMLProps, ReactNode } from 'react';

import Link from 'next/link';
import { Slot } from '@radix-ui/react-slot'
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLProps<HTMLElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

function CardContainer({ children, disabled, className, asChild = false }: {
  children: ReactNode,
  disabled?: boolean,
  className?: string,
  asChild?: boolean
}) {
  const Container = asChild ? Slot : 'div';

  return (
    <Container
      data-slot="card"
      aria-disabled={disabled}
      className={cn(
        'not-prose bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        disabled && 'opacity-50',
        className,
      )}
    >
      {children}
    </Container>
  );
}

function CardContents({ title, description, icon, children }: CardProps) {
  return (
    <>
      <CardHeader>
        {icon && (
          <div className="flex items-center justify-center py-6">
            {icon}
          </div>
        )}

        <CardTitle>{title}</CardTitle>

        <CardDescription>{description || children}</CardDescription>
      </CardHeader>
    </>
  );
}

export function CardLink({ title, description, icon, disabled, className, children, ...props }: CardProps & ComponentProps<typeof Link>) {
  return (
    <CardContainer
      disabled={disabled}
      className={cn('card-link transition-shadow duration-200 hover:shadow-md', className)}
      asChild
    >
      <Link {...props}>
        <CardContents
          title={title}
          description={description}
          icon={icon}
          children={children}
        />
      </Link>
    </CardContainer>
  )
}

export function Card({ title, description, icon, disabled, className, children }: CardProps) {

  return (
    <CardContainer disabled={disabled} className={className}>
      <CardContents
        title={title}
        description={description}
        icon={icon}
        children={children}
      />
    </CardContainer>
  )
}

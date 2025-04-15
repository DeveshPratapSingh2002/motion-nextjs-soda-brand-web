import { cn } from '@/util';
import { ElementType, ReactNode } from 'react';

type BoundedProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export const Bounded = ({
  as: Comp = 'section',
  children,
  className,
}: BoundedProps) => {
  return (
    <Comp className={cn('px-4 first:pt-10 md:px-6', className)}>
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center'>
        {children}
      </div>
    </Comp>
  );
};

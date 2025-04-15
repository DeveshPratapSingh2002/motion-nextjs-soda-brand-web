import { cn } from '@/util';
import Link from 'next/link';

type ButtonProps = {
  href: string;
  text: string | null;
  className?: string;
};

export const Button = ({ href, text, className }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'duartion-150 rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-700 md:text-2xl',
        className,
      )}
    >
      {text}
    </Link>
  );
};

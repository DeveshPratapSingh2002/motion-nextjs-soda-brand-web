import { cn } from '@/util';

type SplitTextProps = {
  text: string;
  className?: string;
  displayStyle?: 'inline-block' | 'block';
};

export const SplitText = ({
  text,
  className,
  displayStyle = 'inline-block',
}: SplitTextProps) => {
  if (!text) return null;
  const words = text.split(' ');

  return words.map((word: string, wIndex: number) => {
    const splitText = word.split('');

    return (
      <span
        className={cn('split-word', className)}
        style={{ display: displayStyle, whiteSpace: 'pre' }}
        key={`${wIndex}_${word}`}
      >
        {splitText.map((char, cIndex) => {
          if (char === ' ') return ` `;
          return (
            <span
              key={cIndex}
              className={`split-char inline-block split-char--${wIndex}-${cIndex}`}
            >
              {char}
            </span>
          );
        })}
        {wIndex < words.length - 1 && <span className="split-char">{` `}</span>}
      </span>
    );
  });
};

import type { ElementType, ReactNode } from "react";

const TILTS = [-4, 3, -2, 4, -3, 2, -4, 3, -2, 3, -3, 4];

type PlayfulTextProps = {
  children: string;
  className?: string;
  as?: ElementType;
};

/** Bold playful header — each letter gets a slight alternating tilt. */
export function PlayfulText({
  children,
  className = "",
  as: Tag = "span",
}: PlayfulTextProps) {
  return (
    <Tag className={`inline-block overflow-visible py-[0.15em] ${className}`}>
      {children.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block"
          style={{
            transform: `rotate(${TILTS[i % TILTS.length]}deg)`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}

/** Non-string children wrapper — use when header contains mixed markup. */
export function PlayfulHeader({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={`font-heading font-bold ${className}`}>{children}</Tag>;
}

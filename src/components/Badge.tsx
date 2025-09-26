import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  color?: 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'gray';
};

const colorToClasses: Record<NonNullable<BadgeProps['color']>, string> = {
  green: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-sky-100 text-sky-700',
  purple: 'bg-violet-100 text-violet-700',
  pink: 'bg-pink-100 text-pink-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-600',
};

export function Badge({ children, color = 'gray' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm ${colorToClasses[color]}`}
    >
      {children}
    </span>
  );
}

export default Badge;

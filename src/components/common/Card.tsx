import React from 'react';
import { cn } from '../../utils/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverEffect?: boolean;
  as?: React.ElementType;
};

const Card: React.FC<CardProps> = ({
  children,
  className,
  glassEffect = false,
  hoverEffect = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={cn(
        'rounded-xl shadow-sm p-4 bg-white dark:bg-gray-800',
        glassEffect && 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg backdrop-saturate-150',
        hoverEffect && 'transition-all duration-300 hover:shadow-md hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
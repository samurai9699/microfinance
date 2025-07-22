import React from 'react';
import { cn } from '../../utils/cn';

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

type TabsListProps = {
  children: React.ReactNode;
  className?: string;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            value,
            onValueChange,
          });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div className={cn('flex space-x-2 border-b border-gray-200', className)}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
  ...props
}) => {
  const context = React.useContext(TabsContext);
  const isActive = context?.value === value;

  return (
    <button
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors relative',
        isActive
          ? 'text-primary border-b-2 border-primary'
          : 'text-gray-600 hover:text-gray-900',
        className
      )}
      onClick={() => context?.onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;

  return (
    <div className={cn('pt-4', className)}>
      {children}
    </div>
  );
};

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export { TabsContext };
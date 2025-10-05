import { cn } from '../../lib/utils';

function Button({ 
    children, 
    variant = 'primary', 
    size = 'md',
    className,
    ...props 
    }) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95',
        secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95',
        outline: 'border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50',
        ghost: 'text-neutral-700 hover:bg-neutral-100',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
        className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
        )}
        {...props}
        >
        {children}
        </button>
    );
}

export default Button;
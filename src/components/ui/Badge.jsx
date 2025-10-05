import { cn } from '../../lib/utils';

function Badge({ children, variant = 'default', className }) {
    const variants = {
        default: 'bg-neutral-100 text-neutral-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
    };

    return (
        <span
        className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            variants[variant],
            className
        )}
        >
        {children}
        </span>
    );
}

export default Badge;
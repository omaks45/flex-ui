import { cn } from '../../lib/utils';

function Card({ children, className, ...props }) {
    return (
        <div
        className={cn(
            'bg-white rounded-xl shadow-sm border border-neutral-200 p-6',
            className
        )}
        {...props}
        >
        {children}
        </div>
    );
}

export default Card;
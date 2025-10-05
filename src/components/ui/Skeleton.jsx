import { cn } from '../../lib/utils';

function Skeleton({ className, ...props }) {
    return (
        <div
        className={cn('animate-pulse bg-neutral-200 rounded', className)}
        {...props}
        />
    );
}

export default Skeleton;
import Skeleton from '../ui/Skeleton';

function ReviewsGridSkeleton({ count = 6 }) {
    return (
        <div className="space-y-6">
        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6">
                <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                </div>
            </div>
            ))}
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <Skeleton className="h-10 w-full" />
        </div>

        {/* Reviews Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(count)].map((_, index) => (
            <div
                key={index}
                className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4"
            >
                {/* Header */}
                <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Property */}
                <Skeleton className="h-4 w-48" />

                {/* Rating */}
                <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-12" />
                </div>

                {/* Category Ratings */}
                <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                <Skeleton className="h-9 flex-1 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

export default ReviewsGridSkeleton;
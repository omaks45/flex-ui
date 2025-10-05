import { format, parseISO } from 'date-fns';
import { Star, User } from 'lucide-react';
import { formatRating } from '../../lib/utils';

function PublicReviewsList({ reviews, isLoading }) {
    if (isLoading) {
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
            <ReviewSkeleton key={i} />
            ))}
        </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
            <Star className="w-8 h-8 text-neutral-400" />
            </div>
            <h4 className="text-lg font-semibold text-neutral-900 mb-2">
            No reviews yet
            </h4>
            <p className="text-neutral-600">
            Be the first to stay and leave a review!
            </p>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
            <ReviewCard key={review._id || review.id || index} review={review} />
        ))}
        </div>
    );
}

function ReviewCard({ review }) {
    const displayRating = formatRating(review.averageCategoryRating || 0);
    const formattedDate = review.submittedAt
        ? format(parseISO(review.submittedAt), 'MMMM yyyy')
        : '';

    // Get first name only for privacy
    const displayName = review.guestName 
        ? review.guestName.split(' ')[0] + ' ' + review.guestName.split(' ').slice(-1)[0].charAt(0) + '.'
        : 'Guest';

    return (
        <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200 border border-neutral-100">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
            {review.guestName?.charAt(0).toUpperCase() || 'G'}
            </div>

            <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-neutral-900">{displayName}</h4>
            <p className="text-sm text-neutral-600">{formattedDate}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-neutral-200">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{displayRating.toFixed(1)}</span>
            </div>
        </div>

        {/* Review Text */}
        <p className="text-neutral-700 leading-relaxed">
            {review.publicReview || 'No review text provided'}
        </p>

        {/* Category Ratings */}
        {review.reviewCategories && review.reviewCategories.length > 0 && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="grid grid-cols-2 gap-3">
                {review.reviewCategories.slice(0, 4).map((category, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600 capitalize">
                    {category.category.replace(/_/g, ' ')}
                    </span>
                    <span className="font-medium text-neutral-900">
                    {category.rating}/10
                    </span>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
}

function ReviewSkeleton() {
    return (
        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100 animate-pulse">
        <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-neutral-200 rounded-full" />
            <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-neutral-200 rounded" />
            <div className="h-3 w-20 bg-neutral-200 rounded" />
            </div>
            <div className="h-6 w-12 bg-neutral-200 rounded" />
        </div>
        <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-full bg-neutral-200 rounded" />
            <div className="h-4 w-3/4 bg-neutral-200 rounded" />
        </div>
        </div>
    );
}

export default PublicReviewsList;
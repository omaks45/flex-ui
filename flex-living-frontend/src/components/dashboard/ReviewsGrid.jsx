import ReviewCard from './ReviewCard';
import Button from '../ui/Button';

function ReviewsGrid({ reviews, onToggleApproval, isUpdating }) {
    if (!reviews || reviews.length === 0) {
        return (
        <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full mb-6">
            <svg
                className="w-10 h-10 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
            </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            No reviews match your filters
            </h3>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            Try adjusting your search criteria or filters to see more results. You can also check back later for new guest reviews.
            </p>
            <Button variant="secondary" onClick={() => window.location.reload()}>
            Refresh Reviews
            </Button>
        </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map((review) => (
            <ReviewCard
            key={review.id}
            review={review}
            onToggleApproval={onToggleApproval}
            isUpdating={isUpdating}
            />
        ))}
        </div>
    );
}

export default ReviewsGrid;
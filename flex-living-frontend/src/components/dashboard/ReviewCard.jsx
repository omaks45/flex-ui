import { useState } from 'react';
import { Star, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { formatRating, truncateText, cn } from '../../lib/utils';

// Helper to get the correct MongoDB ID
const getReviewId = (review) => {
    console.group('Getting Review ID');
    console.log('Full review object:', review);
    console.log('Available keys:', Object.keys(review));
    console.log('_id field:', review._id);
    console.log('id field:', review.id);
    console.log('hostawayId field:', review.hostawayId);
    
    let selectedId;
    
    if (review._id) {
        selectedId = review._id;
        console.log('Using _id:', selectedId);
    } else if (review.id) {
        selectedId = review.id;
        console.log('Using id (no _id found):', selectedId);
    } else {
        selectedId = review.hostawayId;
        console.error('Using hostawayId as fallback (this will likely fail):', selectedId);
    }
    
    console.groupEnd();
    return selectedId;
    };

    function ReviewCard({ review, onToggleApproval, isUpdating }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTogglingApproval, setIsTogglingApproval] = useState(false);

    // Calculate average rating
    const averageRating = review.averageCategoryRating || 
        (review.reviewCategories?.length
        ? review.reviewCategories.reduce((sum, cat) => sum + (cat.rating || 0), 0) /
            review.reviewCategories.length
        : review.reviewCategory?.length
        ? review.reviewCategory.reduce((sum, cat) => sum + (cat.rating || 0), 0) /
            review.reviewCategory.length
        : 0);

    const displayRating = formatRating(averageRating);

    // Format date
    const formattedDate = review.submittedAt
        ? format(parseISO(review.submittedAt), 'MMM dd, yyyy')
        : 'N/A';

    // Review text
    const reviewText = review.publicReview || 'No review text provided';
    const shouldTruncate = reviewText.length > 200;
    const displayText = isExpanded ? reviewText : truncateText(reviewText, 200);

    // Handle approval toggle
    const handleToggleApproval = async () => {
        setIsTogglingApproval(true);
        try {
        const reviewId = getReviewId(review);
        console.log('Calling onToggleApproval with ID:', reviewId);
        await onToggleApproval(reviewId, !review.isApprovedForPublic);
        console.log('Approval toggle successful');
        } catch (error) {
        console.error('Toggle approval error:', error);
        } finally {
        setIsTogglingApproval(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-all duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
            {/* Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {review.guestName?.charAt(0).toUpperCase() || 'G'}
            </div>

            {/* Guest Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 truncate">
                {review.guestName || 'Anonymous Guest'}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-neutral-600">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
                </div>
            </div>
            </div>

            {/* Status Badge */}
            <Badge variant={review.isApprovedForPublic ? 'success' : 'warning'}>
            {review.isApprovedForPublic ? 'Approved' : 'Pending'}
            </Badge>
        </div>

        {/* Property Name */}
        <div className="flex items-center gap-2 mb-3 text-sm text-neutral-700">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <span className="font-medium truncate">{review.listingName || 'Unknown Property'}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
                <Star
                key={index}
                className={cn(
                    'w-5 h-5',
                    index < Math.floor(displayRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-neutral-300'
                )}
                />
            ))}
            </div>
            <span className="text-lg font-semibold text-neutral-900">
            {displayRating.toFixed(1)}
            </span>
            <span className="text-sm text-neutral-500">/ 5.0</span>
        </div>

        {/* Category Ratings */}
        {(review.reviewCategories || review.reviewCategory) && 
        (review.reviewCategories || review.reviewCategory).length > 0 && (
            <div className="space-y-2 mb-4">
            {(review.reviewCategories || review.reviewCategory).map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 capitalize">
                    {category.category.replace(/_/g, ' ')}
                </span>
                <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary-500 rounded-full transition-all duration-300"
                        style={{ width: `${(category.rating / 10) * 100}%` }}
                    />
                    </div>
                    <span className="font-medium text-neutral-900 w-8 text-right">
                    {category.rating}/10
                    </span>
                </div>
                </div>
            ))}
            </div>
        )}

        {/* Review Text */}
        <div className="mb-4">
            <p className="text-neutral-700 leading-relaxed">{displayText}</p>
            {shouldTruncate && (
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 transition-colors"
            >
                {isExpanded ? 'Show less' : 'Read more'}
            </button>
            )}
        </div>

        {/* Channel Badge */}
        {review.channel && (
            <div className="mb-4">
            <Badge variant="info">{review.channel}</Badge>
            </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <Button
            variant={review.isApprovedForPublic ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleToggleApproval}
            disabled={isUpdating || isTogglingApproval}
            className="flex-1"
            >
            {isTogglingApproval
                ? 'Updating...'
                : review.isApprovedForPublic
                ? 'Remove from Website'
                : 'Approve for Website'}
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
            <ExternalLink className="w-4 h-4" />
            </Button>
        </div>
        </div>
    );
}

export default ReviewCard;
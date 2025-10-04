import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import reviewService from '../services/reviewService';
import { toast } from 'sonner';

//Fetch all reviews from Hostaway
export function useReviews(filters = {}) {
    return useQuery({
        queryKey: ['reviews', filters],
        queryFn: () => reviewService.getHostawayReviews(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error) => {
        toast.error('Failed to fetch reviews');
        console.error('Error fetching reviews:', error);
        },
    });
}

//Get approved reviews for public display
//Optional query params: listingId (string), limit (number)
export function useApprovedReviews(listingId = null, limit = 10) {
    return useQuery({
        queryKey: ['approved-reviews', listingId, limit],
        queryFn: () => reviewService.getApprovedReviews(listingId, limit),
        staleTime: 3 * 60 * 1000, // 3 minutes
    });
}

//Update a single review
//Body: { displayOnWebsite: boolean }
export function useUpdateReviewStatus() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ reviewId, displayOnWebsite }) =>
        reviewService.updateReviewStatus(reviewId, displayOnWebsite),
        onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['reviews']);
        queryClient.invalidateQueries(['approved-reviews']);
        
        toast.success(
            variables.displayOnWebsite
            ? 'Review approved for website display'
            : 'Review removed from website'
        );
        },
        onError: (error) => {
        toast.error('Failed to update review status');
        console.error('Error updating review:', error);
        },
    });
}

//Bulk approve multiple reviews
//Body: { reviewIds: string[], approvedBy: string }
export function useBulkUpdateReviews() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ reviewIds, approvedBy }) =>
        reviewService.bulkUpdateReviews(reviewIds, approvedBy),
        onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['reviews']);
        queryClient.invalidateQueries(['approved-reviews']);
        
        toast.success(`${variables.reviewIds.length} reviews approved`);
        },
        onError: (error) => {
        toast.error('Failed to bulk approve reviews');
        console.error('Error bulk updating:', error);
        },
    });
}
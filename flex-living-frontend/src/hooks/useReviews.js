import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import reviewService from '../services/reviewService';
import { toast } from 'sonner';

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

export function useApprovedReviews(listingId = null, limit = 10) {
    return useQuery({
        queryKey: ['approved-reviews', listingId, limit],
        queryFn: () => reviewService.getApprovedReviews(listingId, limit),
        staleTime: 3 * 60 * 1000, // 3 minutes
    });
}

export function useUpdateReviewStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, shouldApprove }) =>
        reviewService.updateReviewStatus(reviewId, shouldApprove),
        onMutate: async ({ reviewId, shouldApprove }) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries(['reviews']);

        // Snapshot previous value
        const previousReviews = queryClient.getQueryData(['reviews']);

        // Optimistically update the cache
        queryClient.setQueryData(['reviews'], (old) => {
            if (!old || !old.reviews) return old;
            
            return {
            ...old,
            reviews: old.reviews.map((review) =>
                (review._id || review.id || review.hostawayId) === reviewId
                ? { ...review, isApprovedForPublic: shouldApprove }
                : review
            ),
            };
        });

        return { previousReviews };
        },
        onSuccess: (data, variables) => {
        toast.success(
            variables.shouldApprove
            ? 'Review approved for website display'
            : 'Review removed from website'
        );
        },
        onError: (error, variables, context) => {
            if (context?.previousReviews) {
                queryClient.setQueryData(['reviews'], context.previousReviews);
            }
            
            console.error('Error updating review:', error);
            console.error('Error response:', error.response?.data);
            console.error('Review ID:', variables.reviewId);
            console.error('Should approve:', variables.shouldApprove);
            
            toast.error(
                error.response?.data?.message || 
                'Failed to update review status'
            );
        },
        onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries(['reviews']);
        queryClient.invalidateQueries(['approved-reviews']);
        },
    });
}

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
        toast.error('Failed to bulk update reviews');
        console.error('Error bulk updating:', error);
        },
    });
}
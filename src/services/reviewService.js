import api from '../lib/api';

const reviewService = {
    // Fetch all reviews from Hostaway
    getHostawayReviews: async (filters = {}) => {
        const response = await api.get('/api/reviews/hostaway', { params: filters });
        return response.data;
    },

    // Get approved reviews for public display
    getApprovedReviews: async (listingId = null, limit = 10) => {
        const params = {};
        if (listingId) params.listingId = listingId;
        if (limit) params.limit = limit;
        
        const response = await api.get('/api/reviews/public', { params });
        return response.data;
    },

    // Approve a review for public display - FIXED: Use PATCH instead of POST
    approveReview: async (reviewId) => {
        const response = await api.patch(`/api/reviews/${reviewId}/approve`);
        return response.data;
    },

    // Unapprove/reject a review
    unapproveReview: async (reviewId) => {
        try {
        const response = await api.patch(`/api/reviews/${reviewId}/unapprove`);
        return response.data;
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
        // Fallback: update isApprovedForPublic directly
        const response = await api.patch(`/api/reviews/${reviewId}`, {
            isApprovedForPublic: false,
        });
        return response.data;
        }
    },

    // Update review approval status
    updateReviewStatus: async (reviewId, shouldApprove) => {
        if (shouldApprove) {
        return await reviewService.approveReview(reviewId);
        } else {
        return await reviewService.unapproveReview(reviewId);
        }
    },

    // Bulk approve multiple reviews
    bulkUpdateReviews: async (reviewIds, approvedBy = 'manager') => {
        const response = await api.post('/api/reviews/bulk-approve', {
        reviewIds,
        approvedBy,
        });
        return response.data;
    },
};

export default reviewService;
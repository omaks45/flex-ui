import api from '../lib/api';

const reviewService = {
    // Fetch all reviews from Hostaway
    getHostawayReviews: async (filters = {}) => {
        const response = await api.get('/api/reviews/hostaway', { params: filters });
        return response.data;
    },

    // Get approved reviews for public display
    getApprovedReviews: async (propertyId = null) => {
        const params = { displayOnWebsite: true };
        if (propertyId) params.propertyId = propertyId;
        
        const response = await api.get('/api/reviews/public', { params });
        return response.data;
    },

    // Update review approval status
    updateReviewStatus: async (reviewId, displayOnWebsite) => {
        const response = await api.patch(`/api/reviews/${reviewId}`, {
        displayOnWebsite,
        });
        return response.data;
    },

    bulkUpdateReviews: async (reviewIds, approvedBy) => {
        const response = await api.post('/api/reviews/bulk-approve', {
            reviewIds,
            approvedBy,
        });
        return response.data;
    }
};

export default reviewService;
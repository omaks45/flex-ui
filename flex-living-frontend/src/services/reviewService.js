import api from '../lib/api';

const reviewService = {
    //Fetch all reviews from Hostaway
    getHostawayReviews: async (filters = {}) => {
        const response = await api.get('/api/reviews/hostaway', { params: filters });
        return response.data;
    },

    //Get approved reviews for public display
    //Query params: listingId (optional), limit (optional, default: 10)
    getApprovedReviews: async (listingId = null, limit = 10) => {
        const params = {};
        if (listingId) params.listingId = listingId;
        if (limit) params.limit = limit;
        
        const response = await api.get('/api/reviews/public', { params });
        return response.data;
    },

    //Update review approval status
    //Body: { displayOnWebsite: boolean }
    updateReviewStatus: async (reviewId, displayOnWebsite) => {
        const response = await api.patch(`/api/reviews/${reviewId}`, {
            displayOnWebsite,
        });
        return response.data;
    },

    //Bulk approve multiple reviews
    //Body: { reviewIds: string[], approvedBy: string }
    bulkUpdateReviews: async (reviewIds, approvedBy) => {
        const response = await api.post('/api/reviews/bulk-approve', {
            reviewIds,
            approvedBy,
        });
        return response.data;
    }
};

export default reviewService;
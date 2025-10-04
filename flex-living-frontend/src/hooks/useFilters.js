import { useState, useMemo } from 'react';
import { isAfter, isBefore, parseISO } from 'date-fns';

export function useFilters(reviews = []) {
    const [filters, setFilters] = useState({
        searchQuery: '',
        property: 'all',
        channel: 'all',
        rating: 'all',
        status: 'all', // approved, pending, all
        dateRange: {
        start: null,
        end: null,
        },
        sortBy: 'date-desc', // date-desc, date-asc, rating-desc, rating-asc
    });

  // Update individual filter
    const updateFilter = (key, value) => {
        setFilters((prev) => ({
        ...prev,
        [key]: value,
        }));
    };

    // Update date range
    const updateDateRange = (start, end) => {
        setFilters((prev) => ({
        ...prev,
        dateRange: { start, end },
        }));
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
        searchQuery: '',
        property: 'all',
        channel: 'all',
        rating: 'all',
        status: 'all',
        dateRange: { start: null, end: null },
        sortBy: 'date-desc',
        });
    };

    // Get unique values for filter dropdowns
    const filterOptions = useMemo(() => {
        if (!reviews || reviews.length === 0) {
        return {
            properties: [],
            channels: [],
        };
        }

        const properties = [...new Set(reviews.map((r) => r.listingName))].filter(Boolean);
        const channels = [...new Set(reviews.map((r) => r.channel || 'Unknown'))];

        return {
        properties: properties.sort(),
        channels: channels.sort(),
        };
    }, [reviews]);

    // Apply filters to reviews
    const filteredReviews = useMemo(() => {
        if (!reviews || reviews.length === 0) return [];

        let filtered = [...reviews];

        // Search filter (guest name or review text)
        if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
            (review) =>
            review.guestName?.toLowerCase().includes(query) ||
            review.publicReview?.toLowerCase().includes(query)
        );
        }

        // Property filter
        if (filters.property !== 'all') {
        filtered = filtered.filter((review) => review.listingName === filters.property);
        }

        // Channel filter
        if (filters.channel !== 'all') {
        filtered = filtered.filter((review) => review.channel === filters.channel);
        }

        // Rating filter
        if (filters.rating !== 'all') {
        const ratingThreshold = parseFloat(filters.rating);
        filtered = filtered.filter((review) => {
            const avgRating = calculateAverageRating(review.reviewCategory);
            return avgRating >= ratingThreshold;
        });
        }

        // Status filter
        if (filters.status !== 'all') {
        const isApproved = filters.status === 'approved';
        filtered = filtered.filter((review) => review.displayOnWebsite === isApproved);
        }

        // Date range filter
        if (filters.dateRange.start || filters.dateRange.end) {
        filtered = filtered.filter((review) => {
            if (!review.submittedAt) return false;
            const reviewDate = parseISO(review.submittedAt);
            
            if (filters.dateRange.start && isBefore(reviewDate, filters.dateRange.start)) {
            return false;
            }
            if (filters.dateRange.end && isAfter(reviewDate, filters.dateRange.end)) {
            return false;
            }
            return true;
        });
        }

        // Sorting
        filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'date-desc':
            return new Date(b.submittedAt) - new Date(a.submittedAt);
            case 'date-asc':
            return new Date(a.submittedAt) - new Date(b.submittedAt);
            case 'rating-desc':
            return calculateAverageRating(b.reviewCategory) - calculateAverageRating(a.reviewCategory);
            case 'rating-asc':
            return calculateAverageRating(a.reviewCategory) - calculateAverageRating(b.reviewCategory);
            default:
            return 0;
        }
        });

        return filtered;
    }, [reviews, filters]);

    return {
        filters,
        updateFilter,
        updateDateRange,
        resetFilters,
        filterOptions,
        filteredReviews,
    };
    }

    // Helper function to calculate average rating
    function calculateAverageRating(reviewCategory) {
    if (!reviewCategory || reviewCategory.length === 0) return 0;
    
    const sum = reviewCategory.reduce((acc, cat) => acc + (cat.rating || 0), 0);
    return sum / reviewCategory.length;
}
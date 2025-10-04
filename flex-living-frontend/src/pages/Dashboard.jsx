import { useState, useEffect } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useReviews, useUpdateReviewStatus } from '../hooks/useReviews';
import { useFilters } from '../hooks/useFilters';
import StatsOverview from '../components/dashboard/StatsOverview';
import FilterBar from '../components/dashboard/FilterBar';
import ReviewsGrid from '../components/dashboard/ReviewsGrid';
import ReviewsGridSkeleton from '../components/dashboard/ReviewsGridSkeleton';
import Pagination from '../components/dashboard/Pagination';
import Button from '../components/ui/Button';

function Dashboard() {
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const REVIEWS_PER_PAGE = 10;

    const { data: reviewsData, isLoading, isError, error } = useReviews();

   // Handle your API response structure
    let reviews = [];
    if (reviewsData) {
        if (Array.isArray(reviewsData)) {
            reviews = reviewsData;
        } else if (reviewsData.reviews && Array.isArray(reviewsData.reviews)) {
            reviews = reviewsData.reviews;
        } else if (reviewsData.result && Array.isArray(reviewsData.result)) {
            reviews = reviewsData.result;
        } else if (reviewsData.data && Array.isArray(reviewsData.data)) {
            reviews = reviewsData.data;
        }
    }

    console.log('Reviews loaded:', reviews.length);
    console.log('Raw API response:', reviewsData);
    if (reviews.length > 0) {
        console.log('First review full object:', reviews[0]);
        console.log('All review IDs:', reviews.map(r => ({
            _id: r._id,
            id: r.id,
            hostawayId: r.hostawayId
        })));
    }

    // Update review status mutation
    const updateReviewStatus = useUpdateReviewStatus();

    // Filters
    const {
        filters,
        updateFilter,
        updateDateRange,
        resetFilters,
        filterOptions,
        filteredReviews,
    } = useFilters(reviews);

    // Pagination
    const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

   // Handle approval toggle
    const handleToggleApproval = async (reviewId, shouldApprove) => {
    console.log('=== Approval Debug ===');
    console.log('Review ID:', reviewId);
    console.log('Should Approve:', shouldApprove);
    console.log('Full API URL:', `${import.meta.env.VITE_API_URL}/api/reviews/${reviewId}/approve`);
    
    try {
        await updateReviewStatus.mutateAsync({ reviewId, shouldApprove });
    } catch (error) {
        console.error('Failed to toggle approval:', error);
        console.error('Error response:', error.response?.data);
    }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-2xl font-bold text-neutral-900">Reviews Dashboard</h1>
                <p className="text-sm text-neutral-600 mt-1">
                    Manage and monitor guest reviews across all properties
                </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="Grid View"
                >
                    <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded transition-colors ${
                    viewMode === 'table'
                        ? 'bg-white text-primary-600 shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="Table View"
                >
                    <List className="w-5 h-5" />
                </button>
                </div>
            </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
            {/* Loading State */}
            {isLoading && <ReviewsGridSkeleton count={6} />}

            {/* Error State */}
            {isError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                    Failed to load reviews
                </h3>
                <p className="text-red-700 mb-4">
                    {error?.message || 'An error occurred while fetching reviews'}
                </p>
                <Button variant="danger" onClick={() => window.location.reload()}>
                    Retry
                </Button>
                </div>
            )}

            {/* Dashboard Content */}
            {!isLoading && !isError && (
                <>
                {/* Statistics Overview */}
                <StatsOverview reviews={reviews} />

                {/* Filter Bar */}
                <FilterBar
                    filters={filters}
                    updateFilter={updateFilter}
                    updateDateRange={updateDateRange}
                    resetFilters={resetFilters}
                    filterOptions={filterOptions}
                />

                {/* Results Summary */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-600">
                    Showing <span className="font-semibold">{filteredReviews.length}</span> of{' '}
                    <span className="font-semibold">{reviews.length}</span> reviews
                    </p>
                </div>

                {/* Reviews Display */}
                {viewMode === 'grid' ? (
                    <>
                    <ReviewsGrid
                        reviews={paginatedReviews}
                        onToggleApproval={handleToggleApproval}
                        isUpdating={updateReviewStatus.isLoading}
                    />

                    {/* Pagination */}
                    {filteredReviews.length > REVIEWS_PER_PAGE && (
                        <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        />
                    )}
                    </>
                ) : (
                    <div className="bg-white rounded-xl border border-neutral-200 p-6">
                    <p className="text-neutral-600 text-center">Table view coming soon...</p>
                    </div>
                )}
                </>
            )}
            </div>
        </main>
        </div>
    );
}

export default Dashboard;
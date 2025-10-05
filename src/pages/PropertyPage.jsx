import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useApprovedReviews } from '../hooks/useReviews';
import { Star, MapPin, Wifi, Coffee, Car, ChevronDown } from 'lucide-react';
import PublicReviewsList from '../components/public/PublicReviewsList';
import { formatRating } from '../lib/utils';

function PropertyPage() {
    const { id } = useParams();
    const [sortBy, setSortBy] = useState('recent');

    // Fetch approved reviews
    const { data: reviewsData, isLoading } = useApprovedReviews(id, 50);
    const reviews = useMemo(() => reviewsData?.reviews || reviewsData || [], [reviewsData]);

    // Calculate overall rating
    const overallRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => {
        return acc + (review.averageCategoryRating || 0);
        }, 0);
        return sum / reviews.length;
    }, [reviews]);

    // Sort reviews
    const sortedReviews = useMemo(() => {
        const sorted = [...reviews];
        switch (sortBy) {
        case 'recent':
            return sorted.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        case 'highest':
            return sorted.sort((a, b) => (b.averageCategoryRating || 0) - (a.averageCategoryRating || 0));
        case 'lowest':
            return sorted.sort((a, b) => (a.averageCategoryRating || 0) - (b.averageCategoryRating || 0));
        default:
            return sorted;
        }
    }, [reviews, sortBy]);

    // Mock property data (in real app, fetch from API)
    const property = {
        name: 'Luxury Studio - Central London',
        location: 'Shoreditch, London',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=600&fit=crop',
        bedrooms: 1,
        bathrooms: 1,
        guests: 2,
        amenities: ['High-speed WiFi', 'Coffee Machine', 'Free Parking', 'Kitchen', 'Workspace', 'TV'],
    };

    return (
        <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-neutral-200 sticky top-0 bg-white z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">The Flex</h1>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                Book Now
                </button>
            </div>
            </div>
        </nav>

        {/* Hero Image */}
        <div className="w-full h-64 sm:h-96 lg:h-[500px] relative overflow-hidden">
            <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2">{property.name}</h2>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{property.location}</span>
                </div>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Property Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 text-neutral-700">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{property.guests}</span>
                    <span>Guests</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{property.bedrooms}</span>
                    <span>Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{property.bathrooms}</span>
                    <span>Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                </div>
                </div>

                {/* Description */}
                <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">About this space</h3>
                <p className="text-neutral-700 leading-relaxed">
                    Welcome to our beautifully designed studio apartment in the heart of Shoreditch. 
                    This modern space offers everything you need for a comfortable stay in London, 
                    with high-end amenities and stylish furnishings throughout. Perfect for business 
                    travelers and tourists alike.
                </p>
                </div>

                {/* Amenities */}
                <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">What this place offers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-neutral-700">
                        <div className="w-6 h-6 text-neutral-500">
                        {index % 3 === 0 ? <Wifi className="w-6 h-6" /> : 
                        index % 3 === 1 ? <Coffee className="w-6 h-6" /> : 
                        <Car className="w-6 h-6" />}
                        </div>
                        <span>{amenity}</span>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
                <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-lg sticky top-24">
                <div className="text-3xl font-bold text-neutral-900 mb-4">
                    £120 <span className="text-lg font-normal text-neutral-600">/ night</span>
                </div>
                <button className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold mb-4">
                    Check Availability
                </button>
                <p className="text-sm text-neutral-600 text-center">
                    You won't be charged yet
                </p>
                </div>
            </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="border-t border-neutral-200 pt-12">
            {/* Reviews Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                    Guest Reviews
                </h3>
                {reviews.length > 0 && (
                    <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-semibold">
                        {formatRating(overallRating).toFixed(1)}
                        </span>
                    </div>
                    <span className="text-neutral-600">
                        · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                    </span>
                    </div>
                )}
                </div>

                {/* Sort Dropdown */}
                {reviews.length > 0 && (
                <div className="relative">
                    <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                    >
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>
                )}
            </div>

            {/* Reviews List */}
            <PublicReviewsList reviews={sortedReviews} isLoading={isLoading} />
            </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-neutral-600 text-sm">
                © 2025 The Flex. All rights reserved.
            </div>
            </div>
        </footer>
        </div>
    );
}

export default PropertyPage;
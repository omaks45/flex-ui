import { Search, X, SlidersHorizontal } from 'lucide-react';
import Button from '../ui/Button';
import { useState } from 'react';

function FilterBar({ filters, updateFilter, resetFilters, filterOptions }) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const hasActiveFilters = 
        filters.searchQuery ||
        filters.property !== 'all' ||
        filters.channel !== 'all' ||
        filters.rating !== 'all' ||
        filters.status !== 'all' ||
        filters.dateRange.start ||
        filters.dateRange.end;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 md:p-6 space-y-4">
        {/* Search and Quick Filters */}
        <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
                type="text"
                placeholder="Search by guest name or review text..."
                value={filters.searchQuery}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            </div>

            {/* Sort By */}
            <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white min-w-[180px]"
            >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="rating-asc">Lowest Rated</option>
            </select>

            {/* Advanced Filters Toggle */}
            <Button
            variant={showAdvanced ? 'primary' : 'secondary'}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="whitespace-nowrap"
            >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            </Button>

            {/* Reset Filters */}
            {hasActiveFilters && (
            <Button variant="ghost" onClick={resetFilters} className="whitespace-nowrap">
                <X className="w-4 h-4 mr-2" />
                Clear
            </Button>
            )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-200">
            {/* Property Filter */}
            <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                Property
                </label>
                <select
                value={filters.property}
                onChange={(e) => updateFilter('property', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                <option value="all">All Properties</option>
                {filterOptions.properties.map((property) => (
                    <option key={property} value={property}>
                    {property}
                    </option>
                ))}
                </select>
            </div>

            {/* Channel Filter */}
            <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                Channel
                </label>
                <select
                value={filters.channel}
                onChange={(e) => updateFilter('channel', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                <option value="all">All Channels</option>
                {filterOptions.channels.map((channel) => (
                    <option key={channel} value={channel}>
                    {channel}
                    </option>
                ))}
                </select>
            </div>

            {/* Rating Filter */}
            <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                Minimum Rating
                </label>
                <select
                value={filters.rating}
                onChange={(e) => updateFilter('rating', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                <option value="all">All Ratings</option>
                <option value="9">9+ (Excellent)</option>
                <option value="8">8+ (Very Good)</option>
                <option value="7">7+ (Good)</option>
                <option value="6">6+ (Satisfactory)</option>
                </select>
            </div>

            {/* Status Filter */}
            <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                Status
                </label>
                <select
                value={filters.status}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                >
                <option value="all">All Reviews</option>
                <option value="approved">Approved Only</option>
                <option value="pending">Pending Only</option>
                </select>
            </div>
            </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
            {filters.searchQuery && (
                <FilterTag
                label={`Search: "${filters.searchQuery}"`}
                onRemove={() => updateFilter('searchQuery', '')}
                />
            )}
            {filters.property !== 'all' && (
                <FilterTag
                label={`Property: ${filters.property}`}
                onRemove={() => updateFilter('property', 'all')}
                />
            )}
            {filters.channel !== 'all' && (
                <FilterTag
                label={`Channel: ${filters.channel}`}
                onRemove={() => updateFilter('channel', 'all')}
                />
            )}
            {filters.rating !== 'all' && (
                <FilterTag
                label={`Rating: ${filters.rating}+`}
                onRemove={() => updateFilter('rating', 'all')}
                />
            )}
            {filters.status !== 'all' && (
                <FilterTag
                label={`Status: ${filters.status}`}
                onRemove={() => updateFilter('status', 'all')}
                />
            )}
            </div>
        )}
        </div>
    );
}

// Helper component for filter tags
function FilterTag({ label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
        {label}
        <button
            onClick={onRemove}
            className="hover:bg-primary-100 rounded-full p-0.5 transition-colors"
        >
            <X className="w-3 h-3" />
        </button>
        </span>
    );
}

export default FilterBar;
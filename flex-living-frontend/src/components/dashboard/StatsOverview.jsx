import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Star, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';
import { formatRating } from '../../lib/utils';

function StatsOverview({ reviews = [] }) {
    const stats = useMemo(() => {
        // Ensure reviews is an array
        if (!Array.isArray(reviews) || reviews.length === 0) {
            return {
            total: 0,
            approved: 0,
            pending: 0,
            averageRating: 0,
            channelBreakdown: {},
            recentTrend: 0,
            };
        }

        // Total reviews
        const total = reviews.length;

        // Approved vs Pending
        const approved = reviews.filter((r) => r.displayOnWebsite).length;
        const pending = total - approved;

        // Average rating
        const ratingsSum = reviews.reduce((sum, review) => {
        if (!review.reviewCategory || review.reviewCategory.length === 0) return sum;
        const avgRating = review.reviewCategory.reduce((acc, cat) => acc + (cat.rating || 0), 0) / review.reviewCategory.length;
        return sum + avgRating;
        }, 0);
        const averageRating = ratingsSum / reviews.length;

        // Channel breakdown
        const channelBreakdown = reviews.reduce((acc, review) => {
        const channel = review.channel || 'Unknown';
        acc[channel] = (acc[channel] || 0) + 1;
        return acc;
        }, {});

        // Recent trend (last 30 days vs previous 30 days)
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

        const recentReviews = reviews.filter((r) => new Date(r.submittedAt) >= thirtyDaysAgo).length;
        const previousReviews = reviews.filter(
        (r) => new Date(r.submittedAt) >= sixtyDaysAgo && new Date(r.submittedAt) < thirtyDaysAgo
        ).length;

        const recentTrend = previousReviews > 0 ? ((recentReviews - previousReviews) / previousReviews) * 100 : 0;

        return {
        total,
        approved,
        pending,
        averageRating,
        channelBreakdown,
        recentTrend,
        };
    }, [reviews]);

    const statCards = [
        {
        title: 'Total Reviews',
        value: stats.total,
        icon: MessageSquare,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        trend: stats.recentTrend,
        },
        {
        title: 'Average Rating',
        value: formatRating(stats.averageRating).toFixed(1),
        suffix: '/ 5.0',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        },
        {
        title: 'Approved',
        value: stats.approved,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        },
        {
        title: 'Pending Review',
        value: stats.pending,
        icon: Clock,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-600 mb-1">{stat.title}</p>
                    <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-neutral-900">{stat.value}</h3>
                    {stat.suffix && (
                        <span className="text-sm text-neutral-500">{stat.suffix}</span>
                    )}
                    </div>
                    {stat.trend !== undefined && stat.trend !== 0 && (
                    <div className="flex items-center gap-1 mt-2">
                        {stat.trend > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span
                        className={`text-xs font-medium ${
                            stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                        >
                        {Math.abs(stat.trend).toFixed(1)}% vs last period
                        </span>
                    </div>
                    )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                </div>
            </Card>
            );
        })}
        </div>
    );
}

export default StatsOverview;
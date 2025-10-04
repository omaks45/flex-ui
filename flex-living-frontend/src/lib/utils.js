import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind classes
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Format rating (1-10 scale to 1-5 stars)
export function formatRating(rating, maxScale = 10) {
    if (!rating) return 0;
    return (rating / maxScale) * 5;
}

// Get rating color based on value
export function getRatingColor(rating) {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
}

// Truncate text
export function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}
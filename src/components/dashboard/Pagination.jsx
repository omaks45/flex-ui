import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
        }
    } else {
        // Show smart pagination with ellipsis
        if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    return (
        <div className="flex items-center justify-between border-t border-neutral-200 pt-6">
        <div className="text-sm text-neutral-600">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
            <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            <ChevronLeft className="w-4 h-4" />
            </Button>

            {pages.map((page, index) => (
            <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                    ? 'bg-primary-500 text-white'
                    : page === '...'
                    ? 'text-neutral-400 cursor-default'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
            >
                {page}
            </button>
            ))}

            <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >
            <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
        </div>
    );
}

export default Pagination;
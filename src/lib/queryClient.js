import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false, // Don't refetch on window focus
        retry: 1, // Retry failed requests once
        staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
        },
    },
});
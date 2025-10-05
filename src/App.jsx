import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from './lib/queryClient';

// Import pages (we'll create these next)
import Dashboard from './pages/Dashboard';
import PropertyPage from './pages/PropertyPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-50">
          <Routes>
            {/* Manager Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Public Property Page */}
            <Route path="/property/:id" element={<PropertyPage />} />
            
            {/* Default redirect to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 - Not Found */}
            <Route path="*" element={<div className="p-8 text-center">Page Not Found</div>} />
          </Routes>
        </div>
        
        {/* Toast notifications */}
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
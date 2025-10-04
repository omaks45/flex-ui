import { useParams } from 'react-router-dom';

function PropertyPage() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-white">
        {/* Navigation Header */}
        <header className="bg-white border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-neutral-900">
                The Flex
            </h1>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
            <h2 className="text-3xl font-bold">Property {id}</h2>
            <p className="text-neutral-600">
                Public property page will be built in Phase 3.
            </p>
            </div>
        </main>
        </div>
    );
}

export default PropertyPage;
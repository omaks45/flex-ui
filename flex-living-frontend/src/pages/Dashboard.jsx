function Dashboard() {
    return (
        <div className="min-h-screen bg-neutral-50">
        {/* Navigation Header */}
        <header className="bg-white border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-neutral-900">
                The Flex - Reviews Dashboard
            </h1>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="card">
            <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
            <p className="text-neutral-600">
                Dashboard components will be built in Phase 2.
            </p>
            </div>
        </main>
        </div>
    );
}

export default Dashboard;
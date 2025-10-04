import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

function Dashboard() {
    return (
        <div className="min-h-screen bg-neutral-50">
        <header className="bg-white border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-neutral-900">
                The Flex - Reviews Dashboard
            </h1>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card>
            <h2 className="text-xl font-semibold mb-4">Component Test</h2>
            
            <div className="space-y-4">
                {/* Test Buttons */}
                <div className="flex gap-2 flex-wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                </div>
                
                {/* Test Badges */}
                <div className="flex gap-2 flex-wrap">
                <Badge variant="success">Approved</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="danger">Rejected</Badge>
                <Badge variant="info">Airbnb</Badge>
                </div>
            </div>
            </Card>
        </main>
        </div>
    );
}

export default Dashboard;
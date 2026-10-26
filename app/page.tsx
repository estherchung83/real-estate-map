import MapView from '@/components/MapView';
import TaxAsessors from '@/components/TaxAssessors';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Real Estate Map
        </h1>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <TaxAsessors/>
          </h2>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6">
          {/* Map placeholder */}
          <div className="h-screen overflow-hidden rounded-lg">
            <MapView />
        </div>
        </main>
      </div>
    </div>
  );
}


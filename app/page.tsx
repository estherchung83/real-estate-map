'use client';

import { useState } from 'react';
import MapView from '@/components/MapView';
import TaxAsessors from '@/components/TaxAssessors';

export default function Home() {
  const [parcelId, setParcelId] = useState<string | null>(null);

  return (
    <div className="h-screen bg-gray-100">
      {/* Header */}
      <header className="h-[73px] bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Real Estate Map
        </h1>
      </header>

      <div className="flex h-[calc(100vh-73px)] min-h-0">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-gray-200 p-6 overflow-y-auto text-black">

          {/* Selected Parcel */}
          {parcelId && (
            <div className="mb-6">
              <h2 className="text-lg font-bold">
                Selected Parcel
              </h2>

              <p className="text-sm mt-2">
                Parcel ID: {parcelId}
              </p>
            </div>
          )}

          {/* Tax Assessors */}
          <TaxAsessors />

        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6">
          <div className="h-full overflow-hidden rounded-lg">
            <MapView setParcelId={setParcelId} />
          </div>
        </main>
      </div>
    </div>
  );
}
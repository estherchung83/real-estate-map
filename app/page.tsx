
'use client';

import { useState } from 'react';
import MapView from '@/components/MapView';
import TaxAssessors from '@/components/TaxAssessors';

export default function Home() {
  const [parcelId, setParcelId] = useState<string | null>(null);

  return (
    <div className="h-screen bg-gray-100">

      {/* Header */}
      <header className="h-[73px] bg-white border-b border-gray-200 px-6 flex items-center">
        <h1 className="text-xl font-bold text-black">
          Real Estate Map
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">

        {/* Left Sidebar */}
        <div className="w-[350px] shrink-0 border-r border-gray-200">
          <TaxAssessors parcelId={parcelId} />
        </div>

        {/* Right Map */}
        <div className="flex-1 min-w-0">
          <MapView
            parcelId={parcelId}
            setParcelId={setParcelId}
          />
        </div>

      </div>
    </div>
  );
}

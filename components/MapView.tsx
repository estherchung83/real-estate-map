'use client';
import Map, { Marker, Popup, Source, Layer } from 'react-map-gl/mapbox';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Location = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

const locations: Location[] = [
  {
    id: 1,
    name: 'Empire State Building',
    latitude: 40.7483,
    longitude: -73.9856,
  },
  {
    id: 2,
    name: 'Hotel Wolcott',
    latitude: 40.74662,
    longitude: -73.98671,
  },
  {
    id: 3,
    name: 'Niles NYC',
    latitude: 40.7487,
    longitude: -73.9916,
  },
];

export default function MapView() {
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        latitude: 40.748,
        longitude: -73.988,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: '100%', height: '100%' }}
    >
      {locations.map((location) => (
        <Marker
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
          anchor="bottom"
          onClick={(event) => {
            event.originalEvent.stopPropagation();
            setSelectedLocation(location);
          }}
        >
          <button
            type="button"
            aria-label={`View ${location.name}`}
            className="cursor-pointer rounded-full bg-blue-600 px-3 py-2 text-sm font-bold text-white shadow-lg hover:bg-blue-700"
          >
            {location.name}
          </button>
        </Marker>
      ))}

      {selectedLocation && (
        <Popup
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          anchor="top"
          onClose={() => setSelectedLocation(null)}
          closeOnClick={false}
        >
          <div className="text-sm text-gray-900">
            <p className="mb-2 font-bold">
              {selectedLocation.name}
            </p>
            <p>
              Latitude: {selectedLocation.latitude}
            </p>
            <p>
              Longitude: {selectedLocation.longitude}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}


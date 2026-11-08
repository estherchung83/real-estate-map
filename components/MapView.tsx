'use client';

import { useState } from 'react';
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  MapMouseEvent,
} from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Location = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
};

type MapViewProps = {
  setParcelId: (id: string) => void;
};

const locations: Location[] = [
  {
    id: 1,
    name: 'Empire State Building',
    longitude: -73.9857,
    latitude: 40.7484,
  },
  {
    id: 2,
    name: 'Hotel Wolcott',
    longitude: -73.98671,
    latitude: 40.74662,
  },
  {
    id: 3,
    name: 'Niles NYC',
    longitude: -73.9916,
    latitude: 40.7487,
  },
];

export default function MapView({ setParcelId }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] =
    useState<Location | null>(null);

  // Handle clicks on parcels
  const onClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];

    if (feature) {
      setParcelId(String(feature.properties?.ID));
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        initialViewState={{
          longitude: -73.9857,
          latitude: 40.7484,
          zoom: 15,
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"

        // Make parcel layers interactive
        interactiveLayerIds={[
          'parcel-fill',
          'parcel-outline',
        ]}

        // Handle parcel clicks
        onClick={onClick}
      >

        {/* Parcel data */}
        <Source
          id="parcels"
          type="vector"
          url="mapbox://svayser.parcel-boundaries"
        >

          {/* Fill layer */}
          <Layer
            id="parcel-fill"
            type="fill"
            source="parcels"
            source-layer="attom-parcels"
            paint={{
              'fill-color': '#3b82f6',
              'fill-opacity': 0.6,
            }}
          />

          {/* Outline layer */}
          <Layer
            id="parcel-outline"
            type="line"
            source="parcels"
            source-layer="attom-parcels"
            paint={{
              'line-color': '#000000',
              'line-width': 2,
            }}
          />

        </Source>

        {/* Markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.longitude}
            latitude={location.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(location);
            }}
          />
        ))}

        {/* Location popup */}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            anchor="bottom"
            onClose={() => setSelectedLocation(null)}
          >
            <div style={{ color: 'black' }}>
              <strong>{selectedLocation.name}</strong>
              <br />
              Longitude: {selectedLocation.longitude}
              <br />
              Latitude: {selectedLocation.latitude}
            </div>
          </Popup>
        )}

      </Map>
    </div>
  );
}

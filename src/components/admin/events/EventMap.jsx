import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';

// Helper Component to Draw Neighborhood Radius on the Map
function RadiusCircle({ center, radius }) {
  const map = useMap();
  const [circle, setCircle] = useState(null);

  React.useEffect(() => {
    if (!map || !center.lat || !center.lng) return;

    if (!circle) {
      const newCircle = new window.google.maps.Circle({
        map,
        center,
        radius: Number(radius) || 100,
        fillColor: '#059669',
        fillOpacity: 0.2,
        strokeColor: '#059669',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
      setCircle(newCircle);
    } else {
      circle.setCenter(center);
      circle.setRadius(Number(radius) || 100);
    }
  }, [map, center, radius, circle]);

  return null;
}

export default function EventMap({
  apiKey,
  latitude,
  longitude,
  radius,
  onSelectLocation,
  error,
}) {
  // Default coordinates (e.g., Jakarta/Indonesia) if no point is selected yet
  const defaultCenter = { lat: -6.301914839989671, lng: 107.30477638895414 };
  const currentPos =
    latitude && longitude
      ? { lat: Number(latitude), lng: Number(longitude) }
      : null;

  const handleMapClick = (e) => {
    if (!onSelectLocation) return;
    if (e.detail && e.detail.latLng) {
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      onSelectLocation(lat, lng);
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="space-y-2">
        <div className="relative w-full overflow-hidden border shadow-inner h-87 md:h-100 rounded-xl border-slate-200">
          <Map
            defaultCenter={currentPos || defaultCenter}
            defaultZoom={15}
            mapId="SIMAK_MAP_ID"
            gestureHandling="greedy"
            disableDefaultUI={false}
            onClick={handleMapClick}
            className="w-full h-full"
          >
            {currentPos && (
              <>
                <AdvancedMarker position={currentPos} />
                <RadiusCircle center={currentPos} radius={radius} />
              </>
            )}
          </Map>

          {/* Only appear in mode Create or Update */}
          {!currentPos && onSelectLocation && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 shadow-sm pointer-events-none">
              📍 Click on the map area to select the event location
            </div>
          )}
        </div>

        {/* Notification / Info Display for Selected Coordinates */}
        <div className="flex items-center justify-between px-1 text-xs">
          {currentPos ? (
            <p className="font-mono text-emerald-700">
              {onSelectLocation ? 'Selected Location: ' : 'Active Location: '}
              {currentPos.lat.toFixed(6)}, {currentPos.lng.toFixed(6)}
            </p>
          ) : (
            <p className="text-amber-600">No location coordinates available.</p>
          )}
          {error && <p className="font-medium text-red-500">{error}</p>}
        </div>
      </div>
    </APIProvider>
  );
}

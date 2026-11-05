import { useState, useEffect } from 'react';
import OsmAutocomplete from '../../ui/global/OsmAutocomplete';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  MapControl,
  ControlPosition,
} from '@vis.gl/react-google-maps';

// HELPER COMPONENT TO CONTROL MAP CAMERA POSITION
function MapCameraControl({ center }) {
  const map = useMap();

  useEffect(() => {
    // pan map camera smoothly to new coordinates when center changes
    if (map && center && center.lat && center.lng) {
      map.panTo(center);
    }
  }, [map, center]);

  return null;
}

// HELPER COMPONENT TO DRAW NEIGHBORHOOD RADIUS ON THE MAP
function RadiusCircle({ center, radius }) {
  const map = useMap();
  const [circle, setCircle] = useState(null);

  useEffect(() => {
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

    // CLEANUP: Remove the circle instance on unmount to prevent leaks
    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
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
  // DEFAULT COORDINATES
  const defaultCenter = { lat: -6.301914839989671, lng: 107.30477638895414 };
  const currentPos =
    latitude && longitude
      ? { lat: Number(latitude), lng: Number(longitude) }
      : null;

  // HANDLE MAP CLICK EVENT
  const handleMapClick = (e) => {
    if (!onSelectLocation) return;
    if (e.detail && e.detail.latLng) {
      const lat = e.detail.latLng.lat;
      const lng = e.detail.latLng.lng;
      onSelectLocation(lat, lng);
    }
  };

  // HANDLE OSM AUTOCOMPLETE PLACE SELECTION
  const handlePlaceSelect = ({ lat, lng }) => {
    if (onSelectLocation) {
      onSelectLocation(lat, lng);
    }
  };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="space-y-2">
        <div className="relative w-full overflow-hidden border shadow-inner h-87 md:h-100 rounded-xl border-slate-200">
          {/* MAIN MAP CONTAINER */}
          {/* FIX: Re-inserted the missing opening <Map> tag with standard configurations */}
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={13}
            mapId="YOUR_MAP_ID" // Required if you are using AdvancedMarker
            onClick={handleMapClick}
            gestureHandling={'greedy'}
            disableDefaultUI={false}
          >
            {/* OVERLAY SEARCH INPUT (OPENSTREETMAP NOMINATIM) */}
            {onSelectLocation && (
              <MapControl position={ControlPosition.TOP_LEFT}>
                <div className="m-3">
                  <OsmAutocomplete onPlaceSelect={handlePlaceSelect} />
                </div>
              </MapControl>
            )}

            {/* AUTO-PAN CAMERA WHEN POSITION UPDATES */}
            {currentPos && <MapCameraControl center={currentPos} />}

            {/* MARKER AND RADIUS DISPLAY */}
            {currentPos && (
              <>
                <AdvancedMarker position={currentPos} />
                <RadiusCircle center={currentPos} radius={radius} />
              </>
            )}
          </Map>

          {/* HINT INSTRUCTION DISPLAY */}
          {!currentPos && onSelectLocation && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 shadow-sm pointer-events-none z-10">
              📍 Search or click on the map area to select the event location
            </div>
          )}
        </div>

        {/* NOTIFICATION AND COORDINATES INFO */}
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

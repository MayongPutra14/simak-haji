import { useState, useEffect, useRef } from 'react';
import { searchLocations } from '../../../utils/helpers/nominatimService';

export default function OsmAutocomplete({ onPlaceSelect }) {
  // STATE MANAGEMENT
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // CONTAINER REF FOR CLICK OUTSIDE HANDLING
  const containerRef = useRef(null);

  // DEBOUNCE EFFECT FOR API REQUESTS
  useEffect(() => {
    // clear suggestions if search query is empty or short
    if (!query || query.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchLocations(query);
      setSuggestions(results);
      setIsLoading(false);
      setIsOpen(results.length > 0);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE COMPONENT
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // HANDLE SUGGESTION SELECTION
  const handleSelect = (location) => {
    setQuery(location.name);
    setIsOpen(false);

    if (onPlaceSelect) {
      onPlaceSelect({
        lat: location.lat,
        lng: location.lng,
        name: location.name,
      });
    }
  };

  return (
    // AUTOCOMPLETE MAIN CONTAINER (ENLARGED WIDTH)
    <div ref={containerRef} className="relative w-80 sm:w-96 md:w-105">
      {/* SEARCH INPUT FIELD (ENLARGED PADDING & TEXT SIZE) */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() =>
          query.length >= 3 && suggestions.length > 0 && setIsOpen(true)
        }
        placeholder=" Cari lokasi event..."
        className="w-full px-4 py-3 text-base font-medium bg-white border border-slate-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 placeholder-slate-400"
      />

      {/* LOADING INDICATOR */}
      {isLoading && (
        <div className="absolute right-4 top-3.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md animate-pulse">
          Mencari...
        </div>
      )}

      {/* SUGGESTIONS DROPDOWN MENU */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 overflow-auto bg-white border border-slate-200 rounded-xl shadow-xl max-h-72 text-slate-700">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 text-sm border-b cursor-pointer hover:bg-emerald-50 hover:text-emerald-900 border-slate-100 last:border-none transition-colors"
            >
              <div className="font-medium text-slate-900">{item.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

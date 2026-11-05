// FETCH LOCATION SUGGESTIONS FROM OPENSTREETMAP NOMINATIM API
export async function searchLocations(query) {
  // return empty array if query is too short
  if (!query || query.trim().length < 3) return [];

  try {
    // ENHANCED QUERY WITH INDONESIA COUNTRY RESTRICTION AND BOUNDING PREFERENCE
    const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query,
    )}&addressdetails=1&countrycodes=id&limit=10`;

    const response = await fetch(endpoint, {
      headers: {
        // nominatim requires language preference and user agent
        'Accept-Language': 'id,en',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // format results into standardized objects
    return data.map((item) => ({
      id: item.place_id,
      name: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (_error) {
    // return empty array on error
    return [];
  }
}

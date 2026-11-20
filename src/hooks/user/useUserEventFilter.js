import { useMemo, useState } from 'react';

export function useUserEventFilter(events = []) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Switch tab and reset search query as requested
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setSearchQuery('');
  };

  // Reset both tab and search query to default
  const handleReset = () => {
    setActiveTab('all');
    setSearchQuery('');
  };

  // Show reset button if user switched away from 'all' OR typed a search query
  const isFilterActive = activeTab !== 'all' || searchQuery.trim() !== '';

  // Step 1: Filter by tab status, Step 2: Filter by search query
  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    // 1. Narrow down by active tab
    const byStatus =
      activeTab === 'all'
        ? events
        : events.filter((event) => event.status === activeTab);

    // 2. Narrow down by search query (eventName, location, speaker)
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return byStatus;

    return byStatus.filter((event) => {
      const nameMatch = event.eventName
        ?.toLowerCase()
        .includes(normalizedQuery);
      const locationMatch = event.location
        ?.toLowerCase()
        .includes(normalizedQuery);
      const speakerMatch = event.speaker
        ?.toLowerCase()
        .includes(normalizedQuery);

      return nameMatch || locationMatch || speakerMatch;
    });
  }, [events, activeTab, searchQuery]);

  return {
    activeTab,
    searchQuery,
    setSearchQuery,
    handleTabChange,
    handleReset,
    isFilterActive,
    filteredEvents,
  };
}

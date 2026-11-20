import UserScheduleFragment from '../../fragments/user/UserScheduleFragment';
import { useAuth } from '../../features/auth/useAuth';
import useSchedulesEvent from '../../hooks/user/useSchedules';
import { useUserEventFilter } from '../../hooks/user/useUserEventFilter';
import UserEventFilterBar from '../../components/user/UserEventFilterBar';
import EventCard from '../../components/user/EventCard';
import { EVENT_FILTER_TABS } from '../../utils/helpers/constant';
import { EmptyStateFallback } from '../../components/ui/global/HelperComponents';

const UserSchedulePage = () => {
  const { user } = useAuth();
  const { schedulesData, isLoading } = useSchedulesEvent(user?.id);

  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    handleTabChange,
    handleReset,
    isFilterActive,
    filteredEvents,
  } = useUserEventFilter(schedulesData);

  if (!user) return null;

  const activeTabLabel =
    EVENT_FILTER_TABS.find((t) => t.key === activeTab)?.label || 'Semua';

  return (
    <UserScheduleFragment>
      {/* Keep everything inside the exact same max-w-7xl content container */}
      <div className="max-w-7xl mx-auto p-4 md:p-2 space-y-5">
        {/* Top Filter & Search Bar */}
        <UserEventFilterBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isFilterActive={isFilterActive}
          onReset={handleReset}
        />

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <EventCard.List
            isLoading={isLoading}
            data={filteredEvents}
            fallback={
              <EmptyStateFallback
                searchQuery={searchQuery}
                activeTabLabel={activeTabLabel}
                isFilterActive={isFilterActive}
                handleReset={handleReset}
              />
            }
          />
        </div>
      </div>
    </UserScheduleFragment>
  );
};

export default UserSchedulePage;

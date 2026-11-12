import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';
import FeatureHubContainer from '../../components/ui/global/FeatureHubMenu';
import { useAuth } from '../../features/auth/useAuth';

const LeaderHomeFragment = ({ children }) => {
  return <>{children}</>;
};

export default function LeaderHome() {
  const { user } = useAuth();

  return (
    <LeaderHomeFragment>
      <PrayTimesWidget />

      <FeatureHubContainer role={user.role} />
    </LeaderHomeFragment>
  );
}

import PrayTimesWidget from '../../components/ui/global/PrayTimesWidget';
import FeatureHubContainer from '../../components/ui/global/FeatureHubMenu';
import { useAuth } from '../../features/auth/useAuth';

export default function AdminHomeFragment() {
  const { user } = useAuth();
  return (
    <>
      <PrayTimesWidget />

      <FeatureHubContainer role={user.role} />
    </>
  );
}

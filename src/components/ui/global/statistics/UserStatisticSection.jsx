import { useMemo } from 'react';
import { AdministrationChart } from './AdministrationChart';
import { ZoneDistributionChart } from './ZoneDistributionChart';
import {
  calculateAdministrationStats,
  calculateZoneStats,
} from '../../../../utils/helpers/statsCalculators';

export const UserStatisticsSection = ({ users = [] }) => {
  // Memoize calculation results to prevent re-rendering unless users change
  const adminStats = useMemo(
    () => calculateAdministrationStats(users),
    [users],
  );
  const zoneStats = useMemo(() => calculateZoneStats(users), [users]);

  return (
    <section className="grid grid-cols-1 gap-6 my-6 lg:grid-cols-2">
      <AdministrationChart data={adminStats} />
      <ZoneDistributionChart data={zoneStats} />
    </section>
  );
};

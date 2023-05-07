import * as arraySupport from 'dayjs/plugin/arraySupport';
import * as dayjs from 'dayjs';

import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import Hud from '../components/apply/Hud';
import HudContent from '../components/apply/HudContent';
import MoreInfo from '../components/apply/MoreInfo';
import { useRef } from 'react';
import { useState } from 'react';

dayjs.extend(arraySupport);










export default function Apply() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const moreInfoRef = useRef(null);

  const nonFreshmanDueDate = dayjs([0, 0, 0, 0, 0]);
  const freshmanDueDate = dayjs([2023, 1, 2, 23, 59]);

  const nonFreshmanLink = false;
  const freshmanLink = 'https://forms.gle/yDx7akqYw6TxQn94A';

  // NOTE: dayjs months are 0-indexed
  // format: [year, month (0 indexed), day, hour (24 hr time), minute]
  // fields: date, label, type, location
  const timelineData = [
    {
      date: dayjs([2023, 0, 13, 23, 59]),
      label: 'Prop Applications Open',
      type: 'deadline',
    },
    {
      date: dayjs([2023, 0, 26, 19, 15]),
      label: 'Info Session',
      location: 'Upson 216',
      type: 'info',
    },
    {
      date: dayjs([2023, 0, 30, 19, 0]),
      label: 'Info Session',
      location: 'Phillips 219',
      type: 'info',
    },
    {
      date: freshmanDueDate,
      label: 'Freshman / Transfer Apps Due',
      type: 'deadline',
    },
  ];

  return (
    <div>
      <Header />
      <Head title='Apply | Cornell Rocketry Team' />

      <Hud applicationOpen={applicationOpen}>
        <HudContent
          applicationOpen={applicationOpen}
          timelineData={timelineData}
          freshmanLink={freshmanLink}
          nonFreshmanLink={nonFreshmanLink}
          freshmanDueDate={freshmanDueDate}
          nonFreshmanDueDate={nonFreshmanDueDate}
          moreInfoRef={moreInfoRef}
        />
      </Hud>

      <MoreInfo moreInfoRef={moreInfoRef} timelineData={timelineData} />
      <Footer />
    </div>
  );
}

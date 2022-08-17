import { useState } from 'react';
import * as dayjs from 'dayjs';
import * as arraySupport from 'dayjs/plugin/arraySupport';
dayjs.extend(arraySupport);

import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

import Hud from '../components/apply/Hud';
import MoreInfo from '../components/apply/MoreInfo';
import { useRef } from 'react';
import HudContent from '../components/apply/HudContent';

export default function Apply() {
  const [applicationOpen, setApplicationOpen] = useState(true);
  const moreInfoRef = useRef(null);

  const nonFreshmanDueDate = dayjs([2022, 8, 1, 23, 59]);
  const freshmanDueDate = dayjs([2022, 8, 29, 23, 59]);

  const nonFreshmanLink = 'https://forms.gle/xWpYYTj3oPMsavE29';
  const freshmanLink = 'https://forms.gle/AoyFXQXMUcuhjCBB8';

  // NOTE: dayjs months are 0-indexed
  const timelineData = [
    {
      date: dayjs([2022, 7, 24]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: dayjs([2022, 7, 30]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: dayjs([2022, 8, 1]),
      label: 'Project Team Fest',
      location: 'TBD',
    },
    {
      date: nonFreshmanDueDate,
      label: 'Upperclassmen Apps Due',
      type: 'deadline',
    },
    {
      date: dayjs([2022, 8, 15]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: dayjs([2022, 8, 21]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
    },
    {
      date: freshmanDueDate,
      label: 'Freshman Apps Due',
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

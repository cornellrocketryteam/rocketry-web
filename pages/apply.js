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
      date: dayjs([2022, 7, 24, 17, 30]),
      label: 'Info Session',
      type: 'info',
      location: 'Upson 216',
    },
    {
      date: dayjs([2022, 7, 30, 19, 0]),
      label: 'Zoom Info Session',
      type: 'info',
      location: 'Zoom',
      link:
        'https://cornell.zoom.us/j/91501962370?pwd=aFByVStIcWpMaVBLWmp1ODdxOXd6Zz09',
    },
    {
      date: dayjs([2022, 8, 1, 16, 0]),
      label: 'Project Team Fest',
      location: 'duffield',
    },
    {
      date: nonFreshmanDueDate,
      label: 'Upperclassmen Apps Due',
      type: 'deadline',
    },
    {
      date: dayjs([2022, 8, 15, 17, 30]),
      label: 'Info Session',
      type: 'info',
      location: 'Upson B02',
    },
    {
      date: dayjs([2022, 8, 21, 19, 0]),
      label: 'Info Session',
      type: 'info',
      location: 'TBD',
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

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
  const [applicationOpen, setApplicationOpen] = useState(true);
  const moreInfoRef = useRef(null);

  const nonFreshmanDueDate = dayjs([2023, 7, 31, 23, 59]);
  const freshmanDueDate = dayjs([2023, 8, 28, 23, 59]);

  const nonFreshmanLink = 'https://forms.gle/HgTC4s3WYknzd6qh8';
  const freshmanLink = 'https://forms.gle/P4Ute5zgNNLXwozW8';

  // NOTE: dayjs months are 0-indexed
  // format: [year, month (0 indexed), day, hour (24 hr time), minute]
  // fields: date, label, type, location
  const timelineData = [
    {
      date: dayjs([2023, 7, 14, 23, 59]),
      label: 'Applications Open',
      type: 'deadline',
    },
    {
      date: dayjs([2023, 7, 24, 18, 0]),
      label: 'Information Session #1',
      location: '222 Upson Hall',
      type: 'info',
    },
    {
      date: dayjs([2023, 7, 31, 16, 0]),
      label: 'Project Team Fest',
      location: 'Duffield Atrium',
      type: 'info',
    },
    {
      date: nonFreshmanDueDate,
      label: 'Upperclass Apps Due',
      type: 'deadline',
    },
    {
      date: dayjs([2023, 8, 7, 18, 0]),
      label: 'Information Session #2',
      location: '222 Upson Hall',
      type: 'info',
    },
    {
      date: dayjs([2023, 8, 10, 11, 0]),
      label: 'Club Fest',
      location: 'Arts Quad',
      type: 'info'
    },
    {
      date: dayjs([2023, 8, 17, 17, 0]),
      label: 'Information Session #3',
      location: '216 Upson Hall',
      type: 'info',
    },
    {
      date: dayjs([2023, 8, 26, 18, 0]),
      label: 'Information Session #4',
      location: '205 Robert Purcell Community Center',
      type: 'info',
    },
    {
      date: freshmanDueDate,
      label: 'First-year Apps Due',
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

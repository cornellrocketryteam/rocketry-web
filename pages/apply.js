import * as arraySupport from 'dayjs/plugin/arraySupport';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as dayjs from 'dayjs';

import ApplyJson from '../public/static/apply/apply';
import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import Hud from '../components/apply/Hud';
import HudContent from '../components/apply/HudContent';
import MoreInfo from '../components/apply/MoreInfo';
import { useRef } from 'react';

dayjs.extend(arraySupport);
dayjs.extend(customParseFormat);

export default function Apply() {
  const applicationOpen = ApplyJson['applicationOpen'];
  const moreInfoRef = useRef(null);

  const dayjsFormatString = ApplyJson['dayjsFormatString'];

  const upperclassDueDate = dayjs(
    ApplyJson['upperclassDueDate'],
    dayjsFormatString
  );
  const firstYearDueDate = dayjs(
    ApplyJson['firstYearDueDate'],
    dayjsFormatString
  );

  const upperclassApplicationLink = ApplyJson['upperclassApplicationLink'];
  const firstYearApplicationLink = ApplyJson['firstYearApplicationLink'];

  const timelineData = parseTimelineData(
    ApplyJson['timelineData'],
    dayjsFormatString
  );

  return (
    <div>
      <Header />
      <Head title='Apply | Cornell Rocketry Team' />

      <Hud applicationOpen={applicationOpen}>
        <HudContent
          applicationOpen={applicationOpen}
          timelineData={timelineData}
          freshmanLink={firstYearApplicationLink}
          nonFreshmanLink={upperclassApplicationLink}
          freshmanDueDate={firstYearDueDate}
          nonFreshmanDueDate={upperclassDueDate}
          moreInfoRef={moreInfoRef}
        />
      </Hud>

      <MoreInfo moreInfoRef={moreInfoRef} timelineData={timelineData} />
      <Footer />
    </div>
  );
}

function parseTimelineData(timelineData, dayjsFormatString) {
  timelineData.forEach((event) => {
    event['date'] = dayjs(event['date'], dayjsFormatString);
  });

  return timelineData;
}

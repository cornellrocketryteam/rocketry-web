import Contributers from './Contributers';
import SponsorLevelBlock from './SponsorLevelBlock';

export default function SponsorLogos({ imageDir, levels, contributers }) {
  return (
    <>
      {Object.keys(levels).map((levelName) => (
        <SponsorLevelBlock
          key={levelName}
          imageDir={imageDir}
          levelName={levelName}
          sponsors={levels[levelName]}
        />
      ))}
      <Contributers contributers={contributers} />
    </>
  );
}

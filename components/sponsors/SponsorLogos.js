import Contributors from './Contributors';
import SponsorLevelBlock from './SponsorLevelBlock';

export default function SponsorLogos({ imageDir, levels, contributors }) {
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
      <Contributors contributors={contributors} />
    </>
  );
}

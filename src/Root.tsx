import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { FlightGlobe } from "./FlightGlobe";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FlightGlobe"
        component={FlightGlobe}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

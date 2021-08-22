import { useRef, useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

const ScrollLottie = (obj) => {
  let anim = lottie.loadAnimation({
    container: obj.target,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: obj.path
  });

  let timeObj = { currentFrame: 0 };
  let endString =
    obj.speed === "slow"
      ? "+=2000"
      : obj.speed === "medium"
      ? "+=1000"
      : obj.speed === undefined
      ? "+=1250"
      : "+=500";
  ScrollTrigger.create({
    trigger: obj.target,
    scrub: true,
    pin: true,
    start: "top top",
    end: endString,
    onUpdate: (self) => {
      if (obj.duration) {
        gsap.to(timeObj, {
          duration: obj.duration,
          currentFrame: self.progress * (anim.totalFrames - 1),
          onUpdate: () => {
            anim.goToAndStop(timeObj.currentFrame, true);
          }
          // ease: 'expo'
        });
      } else {
        anim.goToAndStop(self.progress * (anim.totalFrames - 1), true);
      }
    }
  });
};

export default function IndexPage() {
  const animRef = useRef();

  useEffect(() => {
    ScrollLottie({
      target: animRef.current,
      path: '../static/data.json',
      speed: "slow",
      duration: 0.8
    });
  }, [animRef]);

  return (
    <div>
      <div ref={animRef} style={{ height: "100vh", width: "100vw" }}></div>
    </div>
  );
}

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

const ScrollLottie = (obj) => {
  let anim = lottie.loadAnimation({
    container: obj.target,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: obj.path,
    progressiveLoad: true,
    rendererSettings: {
      progressiveLoad: true,
      preserveAspectRatio: 'xMidYMid slice',
    },
  });

  anim.addEventListener('DOMLoaded', () => {
    console.log('Lottie Loaded');
    gsap.fromTo(obj.target, { opacity: 0 }, { duration: 0.5, opacity: 1 });

    // Scrolls the page slightly to force lottie to display
    if (window.scrollY != 0) {
      window.scrollBy(0, 1);
    }
  });

  let timeObj = { currentFrame: 0 };
  let endString = '+=' + obj.duration.toString();

  ScrollTrigger.create({
    trigger: obj.target,
    scrub: true,
    pin: true,
    start: 'top top',
    end: endString,
    onUpdate: (self) => {
      if (obj.acceleration) {
        gsap.to(timeObj, {
          duration: obj.acceleration,
          currentFrame: self.progress * (anim.totalFrames - 1),
          onUpdate: () => {
            anim.goToAndStop(timeObj.currentFrame, true);
          },
          ease: 'expo',
        });
      } else {
        anim.goToAndStop(self.progress * (anim.totalFrames - 1), true);
      }
    },
  });
};

export default ScrollLottie;

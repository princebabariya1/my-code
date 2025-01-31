import { useEffect, useRef, useState } from "react";
import "./App.css";
import useWindowSize from "./hooks/useWindowSize";

const ParallaxVideo = () => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState("/sectionfour-video.mp4");
  const [textVisible, setTextVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sectionOneOpacity, setSectionOneOpacity] = useState(0);
  const [sectionTwoOpacity, setSectionTwoOpacity] = useState(0);
  const [sectionThreeOpacity, setSectionThreeOpacity] = useState(0);
  const [sectionFourOpacity, setSectionFourOpacity] = useState(0);
  const [sectionFiveOpacity, setSectionFiveOpacity] = useState(0);
  const { width, height } = useWindowSize();
  const useScrollbarWidth = () => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    useEffect(() => {
      const updateWidth = () => {
        setScrollbarWidth(
          window.innerWidth - document.documentElement.clientWidth
        );
      };

      updateWidth();
      window.addEventListener("resize", updateWidth);

      return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return scrollbarWidth;
  };
  const scrollbarWidth = useScrollbarWidth();

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollDirection = scrollPosition > lastScrollTop ? "down" : "up";

      if (videoContainerRef.current) {
        videoContainerRef.current.style.transform = `translateY(${
          scrollPosition * 0.2
        }px)`;
      }

      setScrollPosition(scrollPosition);
      setTextVisible(false);

      if (scrollPosition > 1100 && scrollPosition < 4900 && scrollDirection === "down") {
        if (videoRef.current && !isScrolling) {
          isScrolling = true;
          videoRef.current.play();
        }
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setTextVisible(true);
        if (videoRef.current) {
          videoRef.current.pause();
          isScrolling = false;
        }
      }, 1300);

      lastScrollTop = scrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
    

  }, []);

  useEffect(() => {
    const mapScrollValue = (scrollPosition, min, max) => {
      return Math.min(Math.max((scrollPosition - min) / (max - min), 0), 1);
    };

    const mapScrollHide = (scrollPosition, min, max) => {
      return 1 - Math.min(Math.max((scrollPosition - min) / (max - min), 0), 1);
    };

    if (scrollPosition >= 0 && scrollPosition <= 700) {
      setSectionOneOpacity(mapScrollValue(scrollPosition, 0, 700));
    } else if (scrollPosition > 700) {
      setSectionOneOpacity(mapScrollHide(scrollPosition, 700, 900));
    }

    if (scrollPosition >= 900 && scrollPosition <= 1600) {
      setSectionTwoOpacity(mapScrollValue(scrollPosition, 900, 1600));
    } else if (scrollPosition > 1600) {
      setSectionTwoOpacity(mapScrollHide(scrollPosition, 1600, 1900));
    }

    if (scrollPosition >= 1900 && scrollPosition <= 2600) {
      setSectionThreeOpacity(mapScrollValue(scrollPosition, 1900, 2600));
    } else if (scrollPosition > 2600) {
      setSectionThreeOpacity(mapScrollHide(scrollPosition, 2600, 2900));
    }

    if (scrollPosition >= 2900 && scrollPosition <= 3600) {
      setSectionFourOpacity(mapScrollValue(scrollPosition, 2900, 3600));
    } else if (scrollPosition > 3600) {
      setSectionFourOpacity(mapScrollHide(scrollPosition, 3600, 3900));
    }

    if (scrollPosition >= 3900 && scrollPosition <= 4600) {
      setSectionFiveOpacity(mapScrollValue(scrollPosition, 3900, 4600));
    } else if (scrollPosition > 4600) {
      setSectionFiveOpacity(mapScrollHide(scrollPosition, 4600, 4900));
    }
  }, [scrollPosition]);

  return (
    <div
      style={{
        height: `${height * 10}px`,
        width: `${width - scrollbarWidth}px`,
        padding: "0px 0px 6000px",
        position: "relative",
      }}
    >
      <div
        className="parallax-video-container"
        style={{
          height: `${height}px`,
          width: `${width - scrollbarWidth}px`,
          position: "fixed",
        }}
      >
        <video ref={videoRef} muted playsInline className="parallax-video">
          <source src={currentVideo} type="video/mp4" />
          <source
            src={currentVideo.replace(".mp4", ".webm")}
            type="video/webm"
          />
          <source src={currentVideo.replace(".mp4", ".ogv")} type="video/ogv" />
          Your browser does not support the video tag.
        </video>

        {/* section 1 */}
        <div
          className={`parallax-video-overlay`}
          style={{
            opacity: sectionOneOpacity,
            visibility: sectionOneOpacity > 0 ? "visible" : "hidden",
          }}
        >

          <p
            class="subheader md:text-36 font-light"
            style={{
              fontSize: "36px",
            }}
          >
            A HOME THAT RESPONDS
          </p>
          <h2 class="section-title mt-2 md:mt-4">
            Intuitive <span class="block md:inline"></span> interfaces
          </h2>
        </div>

        {/* section 2 */}
        <div
          className="hidden md:block md:horizontal-gradient section-four curtain-control 3xl:scale-[1.53] 3xl:origin-left absolute left-0 right-0 md:max-w-[529px] md:bottom-0 md:right-auto w-full max-h-[605px] md:max-h-[none] max-w-[289px] mx-auto h-full top-1/2 md:top-0 transform md:transform-none -translate-y-1/2 md:-translate-y-0"
          style={{
            opacity: sectionTwoOpacity,
            visibility: sectionTwoOpacity > 0 ? "visible" : "hidden",
          }}
        >
          <div className="marker reactive-intelligence md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full h-full md:max-h-[900px] md:flex md:flex-col md:justify-center">
            <div className="max-w-[289px] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-0 md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <h2 className="landing-sub-text md:h3 title-font mt-2 md:my-4">
                Smart <span className="block md:inline">Console</span>
              </h2>
            </div>

            <div className="w-[120%] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-[-60px] md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <p className="font-light">
                the only switch system your home needs
              </p>
            </div>

            <div className="md:max-w-[528px] mx-auto text-center text-white absolute md:relative top-0 md:top-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0 w-[89%] md:w-full">
              <div className="mt-2 relative clicks-container curtains-click scale-[2.5] md:scale-100 transform md:transform-none">
                <img
                  src="/assets/incognito/console_new.png"
                  srcSet="
            https://keus.able.do/cdn-cgi/image/width=400,quality=65/assets/incognito/console_new.png 400w,
            https://keus.able.do/cdn-cgi/image/width=600,quality=65/assets/incognito/console_new.png 600w,
            https://keus.able.do/cdn-cgi/image/width=900,quality=65/assets/incognito/console_new.png 900w,
            https://keus.able.do/cdn-cgi/image/width=1200,quality=65/assets/incognito/console_new.png 1200w,
            https://keus.able.do/cdn-cgi/image/width=1600,quality=65/assets/incognito/console_new.png 1600w,
            https://keus.able.do/cdn-cgi/image/width=2000,quality=65/assets/incognito/console_new.png 2000w
          "
                  alt=""
                  className="w-full md:mx-auto md:max-h-[481px] md:object-contain"
                />
                <div className="click-1 absolute top-1/3 left-1/3 ml-9 mt-2">
                  <div
                    className="absolute touch-icon-pulse touch-icon"
                    style={{
                      transform: "scale(0, 0)",
                      opacity: 1,
                      visibility: "inherit",
                    }}
                  ></div>
                  <div
                    className="absolute touch-icon-animate touch-icon"
                    style={{ opacity: 0, visibility: "hidden" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section 3 */}
        <div
          className="hidden md:block md:horizontal-gradient section-four dim-control 3xl:scale-[1.53] 3xl:origin-left absolute left-0 right-0 md:max-w-[529px] md:bottom-0 md:right-auto w-full max-h-[605px] md:max-h-[none] max-w-[289px] mx-auto h-full top-1/2 md:top-0 transform md:transform-none -translate-y-1/2 md:-translate-y-0"
          style={{
            opacity: sectionThreeOpacity,
            visibility: sectionThreeOpacity > 0 ? "visible" : "hidden",
          }}
        >
          <div className="marker md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full h-full md:max-h-[900px] md:flex md:flex-col md:justify-center">
            <div className="max-w-[289px] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-0 md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <h2 className="landing-sub-text md:h3 title-font mt-2 md:my-4">
                Scene <span className="block md:inline">Wizard</span>
              </h2>
            </div>
            <div className="w-[120%] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-[-60px] md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <p className="font-light">
                an exquisite portable room controller
              </p>
            </div>
            <div className="md:max-w-[388px] mx-auto text-center text-white absolute md:relative top-0 md:top-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0 w-[89%] md:w-full">
              <div className="relative mt-2 clicks-container curtains-click scale-[2.5] md:scale-[1] transform md:transform-none">
                <img
                  src="/assets/incognito/wizard_new.png"
                  srcSet="
                https://keus.able.do/cdn-cgi/image/width=400,quality=65/assets/incognito/wizard_new.png 400w,
                https://keus.able.do/cdn-cgi/image/width=600,quality=65/assets/incognito/wizard_new.png 600w,
                https://keus.able.do/cdn-cgi/image/width=900,quality=65/assets/incognito/wizard_new.png 900w,
                https://keus.able.do/cdn-cgi/image/width=1200,quality=65/assets/incognito/wizard_new.png 1200w,
                https://keus.able.do/cdn-cgi/image/width=1600,quality=65/assets/incognito/wizard_new.png 1600w,
                https://keus.able.do/cdn-cgi/image/width=2000,quality=65/assets/incognito/wizard_new.png 2000w
              "
                  alt=""
                  className="w-full md:mx-auto md:max-h-[481px] md:object-contain"
                />
                <div className="click-1 absolute top-1/2 left-2/3 -mt-5 -ml-4">
                  <div
                    className="absolute touch-icon-pulse touch-icon"
                    style={{
                      transform: "scale(0, 0)",
                      opacity: 1,
                      visibility: "inherit",
                    }}
                  ></div>
                  <div
                    className="absolute touch-icon-animate touch-icon"
                    style={{ opacity: 0, visibility: "hidden" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section 4 */}
        <div
          className="hidden md:block section-four voice-control absolute left-0 right-0 md:max-w-[529px] 3xl:scale-[1.53] 3xl:origin-left md:bottom-0 md:right-auto w-full max-h-[605px] md:max-h-[none] max-w-[289px] mx-auto h-full top-1/2 md:top-0 transform md:transform-none -translate-y-1/2 md:-translate-y-0"
          data-svelte-h="svelte-r4oaaf"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            transform: "translate(0%, 3.6861%) translate3d(0px, 0px, 0px)",
            opacity: sectionFourOpacity,
            visibility: sectionFourOpacity > 0 ? "visible" : "hidden",
          }}
        >
          <div className="marker md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full h-full md:max-h-[900px] md:flex md:flex-col md:justify-center">
            <div className="max-w-[289px] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-0 md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <h2 className="landing-sub-text md:h3 title-font mt-2 md:my-4">
                Smart <span className="block md:inline">Voice</span>
              </h2>
            </div>
            <div className="w-[120%] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-[-60px] md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <p className="font-light">with Alexa and Google Home</p>
            </div>
            <div
              className="section-four mt-2 google-assistant md:max-w-[288px] mx-auto text-center text-white absolute md:relative top-0 md:top-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0 w-[89%] md:w-full"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                opacity: 1,
                visibility: "inherit",
              }}
            >
              <img
                src="/assets/incognito/GAlogo.png"
                srcSet="https://keus.able.do/cdn-cgi/image/width=400,quality=65/assets/incognito/GAlogo.png 400w, https://keus.able.do/cdn-cgi/image/width=600,quality=65/assets/incognito/GAlogo.png 600w, https://keus.able.do/cdn-cgi/image/width=900,quality=65/assets/incognito/GAlogo.png 900w, https://keus.able.do/cdn-cgi/image/width=1200,quality=65/assets/incognito/GAlogo.png 1200w, https://keus.able.do/cdn-cgi/image/width=1600,quality=65/assets/incognito/GAlogo.png 1600w, https://keus.able.do/cdn-cgi/image/width=2000,quality=65/assets/incognito/GAlogo.png 2000w"
                alt=""
                className="block mx-auto relative z-20 w-20 md:mt-8"
              />
              <div className="-mt-4 z-10 relative">
                <img src="/GAbubble.svg" alt="" className="w-full" />
                <div className="dim-light-message text-white font-light absolute top-3 w-[200px] ml-8 text-center body-text-xl">
                  Hey Google <br /> turn off the lights
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section 5 */}
        <div
          className="hidden md:block md:horizontal-gradient section-four app-control 3xl:scale-[1.53] 3xl:origin-left absolute left-0 right-0 md:max-w-[25%] 2xl:max-w-[28%] 3xl:max-w-[18%] md:bottom-0 md:right-auto w-full max-h-[605px] md:max-h-[none] max-w-[289px] mx-auto h-full top-1/2 md:top-0 transform md:transform-none -translate-y-1/2 md:-translate-y-0"
          data-svelte-h="svelte-15farfg"
          style={{ opacity: sectionFiveOpacity, visibility: sectionFiveOpacity > 0 ? "visible":"hidden" }}
        >
          <div className="marker md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full h-full md:max-h-[900px] md:flex md:flex-col md:justify-center">
            <div className="max-w-[289px] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-0 md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <h2 className="landing-sub-text md:h3 title-font mt-2 md:mt-12">
                Smart <span className="block md:inline">App</span>
              </h2>
            </div>
            <div className="w-[120%] md:max-w-[273px] mx-auto text-center text-white absolute md:relative bottom-[-60px] md:bottom-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0">
              <p className="mt-2 font-light">control your home from anywhere</p>
            </div>
            <div className="md:max-w-[335px] mx-auto text-center text-white md:relative top-0 md:top-auto left-1/2 md:left-auto w-[89%] md:w-full">
              <img
                src="/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png"
                srcSet="https://keus.able.do/cdn-cgi/image/width=400,quality=65/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png 400w, https://keus.able.do/cdn-cgi/image/width=600,quality=65/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png 600w, https://keus.able.do/cdn-cgi/image/width=900,quality=65/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png 900w, https://keus.able.do/cdn-cgi/image/width=1200,quality=65/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png 1200w, https://keus.able.do/cdn-cgi/image/width=1600,quality=65/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png 1600w, https://keus.able.do/cdn-cgi/image/width=2000,quality=65/assets/incognito/sectionFourMobileAnimation/animationFrame_005.png 2000w"
                alt=""
                className="w-full md:max-w-[280px] md:mx-auto md:max-h-[481px] md:object-contain md:mt-8 hidden md:block"
              />
            </div>
            <div className="md:max-w-[388px] mx-auto text-center text-white absolute md:relative top-0 md:top-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:-translate-x-0 w-[89%] md:w-full">
              <img
                src="/assets/incognito/console_new.png"
                srcSet="https://keus.able.do/cdn-cgi/image/width=400,quality=65/assets/incognito/console_new.png 400w, https://keus.able.do/cdn-cgi/image/width=600,quality=65/assets/incognito/console_new.png 600w, https://keus.able.do/cdn-cgi/image/width=900,quality=65/assets/incognito/console_new.png 900w, https://keus.able.do/cdn-cgi/image/width=1200,quality=65/assets/incognito/console_new.png 1200w, https://keus.able.do/cdn-cgi/image/width=1600,quality=65/assets/incognito/console_new.png 1600w, https://keus.able.do/cdn-cgi/image/width=2000,quality=65/assets/incognito/console_new.png 2000w"
                alt=""
                className="w-full md:max-w-[280px] md:mx-auto md:max-h-[481px] md:object-contain md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxVideo;

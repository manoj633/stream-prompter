import React, { useState, useEffect, useRef } from "react";
import styles from "./TeleprompterPage.module.css";

function TeleprompterPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [content, setContent] = useState(
    "sdfg<br />sdwsfgth<br />sadfgth<br />sadfg<br />sentire regenraadfcgth<br />sadfgthyg<br />sadfgthyjg<br />sadfergtfhyjguh<br />asdfgthyjuhk<br />dsfgthgyjukhi<br />sadfrgthyjuhkil<br />sadfgthyjuhkil<br />asfedgrfthyjuhkio<br />adsfedgrfthjgyuhkilo<br />dsfedgrfhtgyjukhil<br />dsfgrhtyjgukhilo"
  );
  const [alignment, setAlignment] = useState("left");
  const [isFlipX, setIsFlipX] = useState(false);
  const [isFlipY, setIsFlipY] = useState(false);
  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textSize, setTextSize] = useState(58);
  const [margin, setMargin] = useState(5);
  const [speed, setSpeed] = useState(10);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const contentRef = useRef(null);
  const teleprompterRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    if (teleprompterRef.current) {
      const rootElement = teleprompterRef.current;
      rootElement.style.setProperty("--bg-color", bgColor);
      rootElement.style.setProperty("--text-color", textColor);
      rootElement.style.setProperty("--text-size", `${textSize}px`);
      rootElement.style.setProperty("--margin", `${margin}%`);
      rootElement.style.setProperty("--align", alignment);
    }
  }, [bgColor, textColor, textSize, margin, alignment]);

  useEffect(() => {
    fetchOptions();

    const handleKeyDown = (e) => {
      if (document.activeElement === contentRef.current) {
        return;
      }

      e.preventDefault();
      switch (e.code) {
        case "Space":
          handlePlayPause();
          break;
        case "ArrowDown":
          setSpeed((prev) => Math.max(1, prev - 1));
          break;
        case "ArrowUp":
          setSpeed((prev) => Math.min(50, prev + 1));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    saveChanges();
  }, [
    content,
    alignment,
    isFlipX,
    isFlipY,
    bgColor,
    textColor,
    textSize,
    margin,
    speed,
  ]);

  // New effect for scroll control based on play state and speed
  useEffect(() => {
    if (isPlaying) {
      scroll();
    } else {
      clearTimeout(scrollTimeoutRef.current);
    }
    return () => clearTimeout(scrollTimeoutRef.current);
  }, [isPlaying, speed, isFlipY]);

  const fetchOptions = () => {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      // Uncomment to load saved content
      // setContent(savedContent);

      const savedAlign = localStorage.getItem("align");
      if (savedAlign) setAlignment(savedAlign);

      const savedFlipX = localStorage.getItem("flipx");
      if (savedFlipX === "true") setIsFlipX(true);

      const savedFlipY = localStorage.getItem("flipy");
      if (savedFlipY === "true") setIsFlipY(true);

      const savedBgColor = localStorage.getItem("bg-color");
      if (savedBgColor) setBgColor(savedBgColor);

      const savedTextColor = localStorage.getItem("text-color");
      if (savedTextColor) setTextColor(savedTextColor);

      const savedTextSize = localStorage.getItem("text-size");
      if (savedTextSize) setTextSize(parseInt(savedTextSize.replace("px", "")));

      const savedMargin = localStorage.getItem("margin");
      if (savedMargin) setMargin(parseInt(savedMargin.replace("%", "")));

      const savedSpeed = localStorage.getItem("speed");
      if (savedSpeed) setSpeed(parseInt(savedSpeed));
    }
  };

  const saveChanges = () => {
    localStorage.setItem("content", content);
    localStorage.setItem("align", alignment);
    localStorage.setItem("flipx", isFlipX.toString());
    localStorage.setItem("flipy", isFlipY.toString());
    localStorage.setItem("bg-color", bgColor);
    localStorage.setItem("text-color", textColor);
    localStorage.setItem("text-size", `${textSize}px`);
    localStorage.setItem("margin", `${margin}%`);
    localStorage.setItem("speed", speed.toString());
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  // Updated scroll function with the working speed control
  const scroll = () => {
    if (isFlipY) {
      window.scrollBy(0, -1);

      if (window.scrollY === 0) {
        pause();
        window.scrollTo({
          top: document.body.scrollHeight - window.innerHeight,
          left: 0,
          behavior: "smooth",
        });
        return;
      }
    } else {
      window.scrollBy(0, 1);

      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        pause();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        return;
      }
    }

    // Using the working speed control formula
    scrollTimeoutRef.current = setTimeout(scroll, 50 - speed);
  };

  const play = () => {
    setIsPlaying(true);
    teleprompterRef.current.classList.add(styles.playing);
  };

  const pause = () => {
    setIsPlaying(false);
    clearTimeout(scrollTimeoutRef.current);
    teleprompterRef.current.classList.remove(styles.playing);
  };

  const toggleFlipX = () => {
    setIsFlipX(!isFlipX);
  };

  const toggleFlipY = () => {
    setIsFlipY(!isFlipY);

    const currentScrollTop = window.scrollY;
    const totalScrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentScrollPercentage =
      (currentScrollTop / totalScrollableHeight) * 100;
    const invertedScrollPercentage = 100 - currentScrollPercentage;
    const newScrollTop =
      (invertedScrollPercentage / 100) * totalScrollableHeight;

    window.scrollTo({
      top: newScrollTop,
      behavior: "smooth",
    });
  };

  const handleContentPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleContentChange = (e) => {
    setContent(e.target.innerHTML);
  };

  return (
    <div className={styles.teleprompterRoot} ref={teleprompterRef}>
      <div className={styles.teleprompterContainer}>
        <nav
          className={`${styles.nav} ${isNavExpanded ? styles.expanded : ""}`}
        >
          <button
            id="play-pause"
            title="Play / Pause [Space]"
            onClick={handlePlayPause}
          >
            {!isPlaying ? (
              <svg
                id="play"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
              >
                <path d="M13.333 31.583V8.25l18.334 11.667Zm2.792-11.666Zm0 6.625L26.5 19.917l-10.375-6.625Z" />
              </svg>
            ) : (
              <svg
                id="pause"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
              >
                <path d="M23.458 31.667V8.333H30v23.334Zm-13.458 0V8.333h6.542v23.334Z" />
              </svg>
            )}
          </button>

          <button
            id="align"
            title="Align text left / center"
            onClick={() =>
              setAlignment((prev) => (prev === "left" ? "center" : "left"))
            }
          >
            {alignment === "center" ? (
              <svg
                id="left"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
              >
                <path d="M5 35v-2.792h30V35Zm0-6.792v-2.791h19.792v2.791Zm0-6.833v-2.75h30v2.75Zm0-6.792v-2.791h19.792v2.791Zm0-6.791V5h30v2.792Z" />
              </svg>
            ) : (
              <svg
                id="center"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
              >
                <path d="M5 35v-2.792h30V35Zm6.792-6.792v-2.791H28.25v2.791ZM5 21.375v-2.75h30v2.75Zm6.792-6.792v-2.791H28.25v2.791ZM5 7.792V5h30v2.792Z" />
              </svg>
            )}
          </button>

          <button
            id="flipx"
            title="Mirror text horizontally"
            onClick={toggleFlipX}
          >
            <svg
              className={isFlipX ? "flipx" : ""}
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
            >
              <path d="M15.875 35H7.792q-1.125 0-1.959-.833Q5 33.333 5 32.208V7.792q0-1.125.833-1.959Q6.667 5 7.792 5h8.083v2.792H7.792v24.416h8.083Zm2.792 3.333V1.667h2.791v36.666ZM32.208 7.792h-.375V5h.375q1.125 0 1.959.833.833.834.833 1.959v.375h-2.792Zm0 14.291v-4.166H35v4.166Zm0 12.917h-.375v-2.792h.375v-.375H35v.375q0 1.125-.833 1.959-.834.833-1.959.833Zm0-19.875v-4.167H35v4.167Zm0 13.917v-4.167H35v4.167Zm-8 5.958v-2.792h4.834V35Zm0-27.208V5h4.834v2.792Z" />
            </svg>
          </button>

          <button
            id="flipy"
            title="Mirror text vertically"
            onClick={toggleFlipY}
          >
            <svg
              className={isFlipY ? styles.flipy : ""}
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
            >
              <path d="M 5 15.875 L 5 7.792 C 5 7.042 5.278 6.389 5.833 5.833 C 6.389 5.278 7.042 5 7.792 5 L 32.208 5 C 32.958 5 33.611 5.278 34.167 5.833 C 34.722 6.389 35 7.042 35 7.792 L 35 15.875 L 32.208 15.875 L 32.208 7.792 L 7.792 7.792 L 7.792 15.875 L 5 15.875 Z M 1.667 18.667 L 38.333 18.667 L 38.333 21.458 L 1.667 21.458 L 1.667 18.667 Z M 32.208 32.208 L 32.208 31.833 L 35 31.833 L 35 32.208 C 35 32.958 34.722 33.611 34.167 34.167 C 33.611 34.722 32.958 35 32.208 35 L 31.833 35 L 31.833 32.208 L 32.208 32.208 Z M 17.917 32.208 L 22.083 32.208 L 22.083 35 L 17.917 35 L 17.917 32.208 Z M 5 32.208 L 5 31.833 L 7.792 31.833 L 7.792 32.208 L 8.167 32.208 L 8.167 35 L 7.792 35 C 7.042 35 6.389 34.722 5.833 34.167 C 5.278 33.611 5 32.958 5 32.208 Z M 24.875 32.208 L 29.042 32.208 L 29.042 35 L 24.875 35 L 24.875 32.208 Z M 10.958 32.208 L 15.125 32.208 L 15.125 35 L 10.958 35 L 10.958 32.208 Z M 5 24.208 L 7.792 24.208 L 7.792 29.042 L 5 29.042 L 5 24.208 Z M 32.208 24.208 L 35 24.208 L 35 29.042 L 32.208 29.042 L 32.208 24.208 Z" />
            </svg>
          </button>

          <button
            className={styles.expand}
            id="expand"
            title="Expand"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
              teleprompterRef.current.classList.toggle(styles.noscroll);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
              <path d="m20 25.625-10-10 1.958-1.958L20 21.708l8.042-8.041 1.958 2Z" />
            </svg>
          </button>

          <div className={styles.drawer}>
            <div>
              <input
                type="color"
                id="bg-color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
              <div className={styles.disableSelect}>Background color</div>
            </div>

            <div>
              <input
                type="color"
                id="text-color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <div className={styles.disableSelect}>Text color</div>
            </div>

            <div>
              <input
                id="text-size"
                type="range"
                min="30"
                max="180"
                value={textSize}
                step="1"
                onChange={(e) => setTextSize(parseInt(e.target.value))}
              />
              <div className={styles.disableSelect}>
                Text size: <span id="text-size-display">{textSize}</span>px
              </div>
            </div>

            <div>
              <input
                id="margin"
                type="range"
                min="0"
                max="40"
                value={margin}
                step="1"
                onChange={(e) => setMargin(parseInt(e.target.value))}
              />
              <div className={styles.disableSelect}>
                Margin: <span id="margin-display">{margin}</span>%
              </div>
            </div>

            <div>
              <input
                id="speed"
                type="range"
                min="1"
                max="50"
                value={speed}
                step="1"
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
              <div className={styles.disableSelect}>
                Speed: <span id="speed-display">{speed}</span>
              </div>
            </div>

            <div>
              <form
                action="https://app.teleprompter.com/recorder"
                target="_blank"
              >
                <input
                  id="record-content"
                  type="hidden"
                  name="content"
                  value={content}
                />
                <button className={styles.recordVideoButton}>
                  Record Video
                </button>
              </form>
            </div>
          </div>
        </nav>

        <div
          className={`${styles.content} 
            ${isFlipX ? styles.flipx : ""} 
            ${isFlipY ? styles.flipy : ""}`}
          ref={contentRef}
          spellCheck="false"
          contentEditable={!isPlaying}
          onPaste={handleContentPaste}
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div
          className={`${styles.triangle} 
            ${isFlipX ? styles.shiftx : ""} 
            ${isFlipY ? styles.shifty : ""}`}
          style={{
            display: isPlaying ? "block" : "none",
          }}
        ></div>
      </div>
    </div>
  );
}

export default TeleprompterPage;

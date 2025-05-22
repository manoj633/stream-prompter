import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./TeleprompterPage.module.css";

function TeleprompterPage() {
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [content, setContent] = useState("");
  const [alignment, setAlignment] = useState("left");
  const [isFlipX, setIsFlipX] = useState(false);
  const [isFlipY, setIsFlipY] = useState(false);
  const [bgColor, setBgColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textSize, setTextSize] = useState(58);
  const [margin, setMargin] = useState(5);
  const [speed, setSpeed] = useState(10);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const contentRef = useRef(null);
  const teleprompterRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const contentEdited = useRef(false);

  // Initialize content from location state or localStorage
  useEffect(() => {
    if (location.state?.content) {
      setContent(location.state.content);
    } else {
      fetchOptions();
    }
  }, [location.state]);

  // Apply style properties
  useEffect(() => {
    if (teleprompterRef.current) {
      const rootElement = teleprompterRef.current;
      rootElement.style.setProperty("--bg-color", bgColor);
      rootElement.style.setProperty("--text-size", `${textSize}px`);
      rootElement.style.setProperty("--margin", `${margin}%`);
      rootElement.style.setProperty("--align", alignment);
    }
  }, [bgColor, textColor, textSize, margin, alignment]);

  // Setup keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if we're editing the content
      if (document.activeElement === contentRef.current) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSpeed((prev) => Math.max(1, prev - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSpeed((prev) => Math.min(50, prev + 1));
          break;
        case "ArrowLeft":
          e.preventDefault();
          // Decrease text size
          setTextSize((prev) => Math.max(30, prev - 2));
          break;
        case "ArrowRight":
          e.preventDefault();
          // Increase text size
          setTextSize((prev) => Math.min(180, prev + 2));
          break;
        case "KeyA":
          e.preventDefault();
          // Toggle text alignment
          setAlignment((prev) => (prev === "left" ? "center" : "left"));
          break;
        case "KeyF":
          e.preventDefault();
          // Toggle horizontal flip
          toggleFlipX();
          break;
        case "KeyV":
          e.preventDefault();
          // Toggle vertical flip
          toggleFlipY();
          break;
        case "KeyM":
          e.preventDefault();
          // Adjust margin
          if (e.shiftKey) {
            setMargin((prev) => Math.min(40, prev + 1)); // Increase margin
          } else {
            setMargin((prev) => Math.max(0, prev - 1)); // Decrease margin
          }
          break;
        case "KeyE":
          e.preventDefault();
          // Toggle expanded controls
          setIsNavExpanded((prev) => {
            const newValue = !prev;
            if (teleprompterRef.current) {
              if (newValue) {
                teleprompterRef.current.classList.add(styles.noscroll);
              } else {
                teleprompterRef.current.classList.remove(styles.noscroll);
              }
            }
            return newValue;
          });
          break;
        case "KeyK":
          e.preventDefault();
          // Toggle keyboard shortcuts guide
          setShowKeyboardShortcuts((prev) => !prev);
          break;
        case "Home":
          e.preventDefault();
          // Scroll to the beginning
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          break;
        case "End":
          e.preventDefault();
          // Scroll to the end
          window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
          });
          break;
        case "PageUp":
          e.preventDefault();
          window.scrollBy({
            top: -window.innerHeight * 0.8,
            behavior: "smooth",
          });
          break;
        case "PageDown":
          e.preventDefault();
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: "smooth",
          });
          break;
        case "Escape":
          e.preventDefault();
          // Stop playback if playing
          if (isPlaying) {
            pause();
          } else if (showKeyboardShortcuts) {
            setShowKeyboardShortcuts(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [isPlaying, showKeyboardShortcuts, isFlipX, isFlipY]); // Add dependencies for the Escape key functionality

  // Save changes to localStorage
  useEffect(() => {
    if (contentEdited.current || location.state?.content) {
      saveChanges();
    }
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

  // Handle scrolling when playing
  useEffect(() => {
    if (isPlaying) {
      scroll();
    } else {
      clearTimeout(scrollTimeoutRef.current);
    }

    return () => clearTimeout(scrollTimeoutRef.current);
  }, [isPlaying, speed, isFlipY]);

  const fetchOptions = () => {
    try {
      const savedContent = localStorage.getItem("content");
      if (savedContent) {
        setContent(savedContent);

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
        if (savedTextSize) {
          const size = parseInt(savedTextSize.replace("px", ""));
          if (!isNaN(size)) setTextSize(size);
        }

        const savedMargin = localStorage.getItem("margin");
        if (savedMargin) {
          const marginValue = parseInt(savedMargin.replace("%", ""));
          if (!isNaN(marginValue)) setMargin(marginValue);
        }

        const savedSpeed = localStorage.getItem("speed");
        if (savedSpeed) {
          const speedValue = parseInt(savedSpeed);
          if (!isNaN(speedValue)) setSpeed(speedValue);
        }
      }
    } catch (error) {
      console.error("Error loading saved options:", error);
    }
  };

  const saveChanges = () => {
    try {
      localStorage.setItem("content", content);
      localStorage.setItem("align", alignment);
      localStorage.setItem("flipx", isFlipX.toString());
      localStorage.setItem("flipy", isFlipY.toString());
      localStorage.setItem("bg-color", bgColor);
      localStorage.setItem("text-color", textColor);
      localStorage.setItem("text-size", `${textSize}px`);
      localStorage.setItem("margin", `${margin}%`);
      localStorage.setItem("speed", speed.toString());
    } catch (error) {
      console.error("Error saving options:", error);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const scroll = () => {
    clearTimeout(scrollTimeoutRef.current);

    if (isFlipY) {
      window.scrollBy(0, -1);

      if (window.scrollY <= 0) {
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

    // Adjust speed calculation for smoother scrolling
    const scrollDelay = 51 - speed; // Inverse relationship - higher speed means lower delay
    scrollTimeoutRef.current = setTimeout(scroll, scrollDelay);
  };

  const play = () => {
    if (!content.trim()) return; // Prevent playing if content is empty

    setIsPlaying(true);
    if (teleprompterRef.current) {
      teleprompterRef.current.classList.add(styles.playing);
    }

    // Force blur any active element to enable keyboard shortcuts
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const pause = () => {
    setIsPlaying(false);
    clearTimeout(scrollTimeoutRef.current);
    if (teleprompterRef.current) {
      teleprompterRef.current.classList.remove(styles.playing);
    }
  };

  const toggleFlipX = () => {
    setIsFlipX((prevFlipX) => !prevFlipX);
  };

  const toggleFlipY = () => {
    // Calculate new scroll position for flipped view
    try {
      const currentScrollTop = window.scrollY;
      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalScrollableHeight > 0) {
        const currentScrollPercentage =
          (currentScrollTop / totalScrollableHeight) * 100;
        const invertedScrollPercentage = 100 - currentScrollPercentage;
        const newScrollTop =
          (invertedScrollPercentage / 100) * totalScrollableHeight;

        // Toggle the flip state first
        setIsFlipY((prevFlipY) => !prevFlipY);

        // Then update the scroll position
        window.scrollTo({
          top: newScrollTop,
          behavior: "smooth",
        });
      } else {
        // If there's no scrollable height, just toggle the state
        setIsFlipY((prevFlipY) => !prevFlipY);
      }
    } catch (error) {
      console.error("Error calculating scroll position:", error);
      // Even if there's an error, make sure to toggle the state
      setIsFlipY((prevFlipY) => !prevFlipY);
      window.scrollTo(0, 0);
    }
  };

  const handleContentPaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");

    // Insert at cursor position using modern approach
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Move cursor to end of inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    // Update content state
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
      contentEdited.current = true;
    }
  };

  const handleContentChange = (e) => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
      contentEdited.current = true;
    }
  };

  const renderContent = () => {
    // Only use dangerouslySetInnerHTML when initially rendering the content
    if (!contentEdited.current && content) {
      return { __html: content };
    }
    return undefined;
  };

  return (
    <div className={styles.teleprompterRoot} ref={teleprompterRef}>
      <div className={styles.teleprompterContainer}>
        <nav
          className={`${styles.nav} ${isNavExpanded ? styles.expanded : ""}`}
        >
          <button
            id="play-pause"
            className={styles.controlButton}
            title="Play / Pause [Space]"
            onClick={handlePlayPause}
            disabled={!content.trim()}
          >
            {!isPlaying ? (
              <svg
                id="play"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                viewBox="0 0 40 40"
              >
                <path d="M13.333 31.583V8.25l18.334 11.667Zm2.792-11.666Zm0 6.625L26.5 19.917l-10.375-6.625Z" />
              </svg>
            ) : (
              <svg
                id="pause"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                viewBox="0 0 40 40"
              >
                <path d="M23.458 31.667V8.333H30v23.334Zm-13.458 0V8.333h6.542v23.334Z" />
              </svg>
            )}
          </button>

          <button
            id="align"
            className={styles.controlButton}
            title="Align text left / center [A]"
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
                viewBox="0 0 40 40"
              >
                <path d="M5 35v-2.792h30V35Zm0-6.792v-2.791h19.792v2.791Zm0-6.833v-2.75h30v2.75Zm0-6.792v-2.791h19.792v2.791Zm0-6.791V5h30v2.792Z" />
              </svg>
            ) : (
              <svg
                id="center"
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                viewBox="0 0 40 40"
              >
                <path d="M5 35v-2.792h30V35Zm6.792-6.792v-2.791H28.25v2.791ZM5 21.375v-2.75h30v2.75Zm6.792-6.792v-2.791H28.25v2.791ZM5 7.792V5h30v2.792Z" />
              </svg>
            )}
          </button>

          <button
            id="flipx"
            className={styles.controlButton}
            title="Mirror text horizontally [F]"
            onClick={toggleFlipX}
          >
            <svg
              className={isFlipX ? styles.flipx : ""}
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 40 40"
            >
              <path d="M15.875 35H7.792q-1.125 0-1.959-.833Q5 33.333 5 32.208V7.792q0-1.125.833-1.959Q6.667 5 7.792 5h8.083v2.792H7.792v24.416h8.083Zm2.792 3.333V1.667h2.791v36.666ZM32.208 7.792h-.375V5h.375q1.125 0 1.959.833.833.834.833 1.959v.375h-2.792Zm0 14.291v-4.166H35v4.166Zm0 12.917h-.375v-2.792h.375v-.375H35v.375q0 1.125-.833 1.959-.834.833-1.959.833Zm0-19.875v-4.167H35v4.167Zm0 13.917v-4.167H35v4.167Zm-8 5.958v-2.792h4.834V35Zm0-27.208V5h4.834v2.792Z" />
            </svg>
          </button>

          <button
            id="flipy"
            className={styles.controlButton}
            title="Mirror text vertically [V]"
            onClick={toggleFlipY}
          >
            <svg
              className={isFlipY ? styles.flipy : ""}
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 40 40"
            >
              <path d="M 5 15.875 L 5 7.792 C 5 7.042 5.278 6.389 5.833 5.833 C 6.389 5.278 7.042 5 7.792 5 L 32.208 5 C 32.958 5 33.611 5.278 34.167 5.833 C 34.722 6.389 35 7.042 35 7.792 L 35 15.875 L 32.208 15.875 L 32.208 7.792 L 7.792 7.792 L 7.792 15.875 L 5 15.875 Z M 1.667 18.667 L 38.333 18.667 L 38.333 21.458 L 1.667 21.458 L 1.667 18.667 Z M 32.208 32.208 L 32.208 31.833 L 35 31.833 L 35 32.208 C 35 32.958 34.722 33.611 34.167 34.167 C 33.611 34.722 32.958 35 32.208 35 L 31.833 35 L 31.833 32.208 L 32.208 32.208 Z M 17.917 32.208 L 22.083 32.208 L 22.083 35 L 17.917 35 L 17.917 32.208 Z M 5 32.208 L 5 31.833 L 7.792 31.833 L 7.792 32.208 L 8.167 32.208 L 8.167 35 L 7.792 35 C 7.042 35 6.389 34.722 5.833 34.167 C 5.278 33.611 5 32.958 5 32.208 Z M 24.875 32.208 L 29.042 32.208 L 29.042 35 L 24.875 35 L 24.875 32.208 Z M 10.958 32.208 L 15.125 32.208 L 15.125 35 L 10.958 35 L 10.958 32.208 Z M 5 24.208 L 7.792 24.208 L 7.792 29.042 L 5 29.042 L 5 24.208 Z M 32.208 24.208 L 35 24.208 L 35 29.042 L 32.208 29.042 L 32.208 24.208 Z" />
            </svg>
          </button>

          <button
            className={`${styles.expand} ${styles.controlButton}`}
            id="expand"
            title="Expand Controls [E]"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
              if (teleprompterRef.current) {
                teleprompterRef.current.classList.toggle(styles.noscroll);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 40 40"
            >
              <path d="m20 25.625-10-10 1.958-1.958L20 21.708l8.042-8.041 1.958 2Z" />
            </svg>
          </button>

          <button
            className={styles.controlButton}
            id="keyboard-shortcuts"
            title="Keyboard Shortcuts [K]"
            onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 24 24"
            >
              <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
            </svg>
          </button>

          <div className={styles.drawer}>
            <div className={styles.controlGroup}>
              <input
                type="color"
                id="bg-color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                aria-label="Background color"
              />
              <div className={styles.disableSelect}>Background color</div>
            </div>

            <div className={styles.controlGroup}>
              <input
                type="color"
                id="text-color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                aria-label="Text color"
              />
              <div className={styles.disableSelect}>Text color</div>
            </div>

            <div className={styles.controlGroup}>
              <input
                id="text-size"
                type="range"
                min="30"
                max="180"
                value={textSize}
                step="1"
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                aria-label="Text size"
              />
              <div className={styles.disableSelect}>
                Text size: <span id="text-size-display">{textSize}</span>px
              </div>
            </div>

            <div className={styles.controlGroup}>
              <input
                id="margin"
                type="range"
                min="0"
                max="40"
                value={margin}
                step="1"
                onChange={(e) => setMargin(parseInt(e.target.value))}
                aria-label="Margin"
              />
              <div className={styles.disableSelect}>
                Margin: <span id="margin-display">{margin}</span>%
              </div>
            </div>

            <div className={styles.controlGroup}>
              <input
                id="speed"
                type="range"
                min="1"
                max="50"
                value={speed}
                step="1"
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                aria-label="Scroll speed"
              />
              <div className={styles.disableSelect}>
                Speed: <span id="speed-display">{speed}</span>
              </div>
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
          dangerouslySetInnerHTML={renderContent()}
          style={{
            textAlign: alignment,
            opacity: isPlaying ? 1 : 0.9,
            color: textColor, // Apply text color directly here
          }}
        ></div>

        <div
          className={`${styles.triangle} 
            ${isFlipX ? styles.shiftx : ""} 
            ${isFlipY ? styles.shifty : ""}`}
          style={{
            display: isPlaying && content.trim() ? "block" : "none",
          }}
        ></div>

        {showKeyboardShortcuts && (
          <div className={styles.keyboardShortcutsModal}>
            <div className={styles.keyboardShortcutsContent}>
              <h3>Keyboard Shortcuts</h3>
              <div className={styles.shortcutsList}>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>Space</span>
                  <span className={styles.shortcutDesc}>Play/Pause</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>↑</span>
                  <span className={styles.shortcutDesc}>Increase speed</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>↓</span>
                  <span className={styles.shortcutDesc}>Decrease speed</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>→</span>
                  <span className={styles.shortcutDesc}>
                    Increase text size
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>←</span>
                  <span className={styles.shortcutDesc}>
                    Decrease text size
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>A</span>
                  <span className={styles.shortcutDesc}>
                    Toggle text alignment
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>F</span>
                  <span className={styles.shortcutDesc}>
                    Toggle horizontal flip
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>V</span>
                  <span className={styles.shortcutDesc}>
                    Toggle vertical flip
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>M</span>
                  <span className={styles.shortcutDesc}>Decrease margin</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>Shift + M</span>
                  <span className={styles.shortcutDesc}>Increase margin</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>E</span>
                  <span className={styles.shortcutDesc}>
                    Toggle control panel
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>K</span>
                  <span className={styles.shortcutDesc}>
                    Toggle this shortcuts guide
                  </span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>Home</span>
                  <span className={styles.shortcutDesc}>Go to beginning</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>End</span>
                  <span className={styles.shortcutDesc}>Go to end</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>Page Up</span>
                  <span className={styles.shortcutDesc}>Scroll up</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>Page Down</span>
                  <span className={styles.shortcutDesc}>Scroll down</span>
                </div>
                <div className={styles.shortcutItem}>
                  <span className={styles.shortcutKey}>Esc</span>
                  <span className={styles.shortcutDesc}>
                    Stop playback / Close this guide
                  </span>
                </div>
              </div>
              <button
                className={styles.closeShortcutsButton}
                onClick={() => setShowKeyboardShortcuts(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeleprompterPage;

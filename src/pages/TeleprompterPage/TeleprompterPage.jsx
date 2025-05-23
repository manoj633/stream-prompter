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
      // Store the current cursor position
      const selection = window.getSelection();
      const range = selection.getRangeAt(0).cloneRange();

      // Update the content state with the current HTML
      setContent(contentRef.current.innerHTML);
      contentEdited.current = true;

      // After React updates the DOM, restore the cursor position
      setTimeout(() => {
        if (contentRef.current) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
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
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
              >
                <path
                  d="M42.1349 19.9579L16.2455 4.12205C15.7026 3.79106 15.0816 3.61005 14.4458 3.5975C13.8101 3.58495 13.1824 3.74131 12.6268 4.05061C12.0712 4.35991 11.6077 4.81108 11.2835 5.35808C10.9592 5.90507 10.7859 6.5283 10.7812 7.16415V38.8359C10.7859 39.4717 10.9592 40.0949 11.2835 40.6419C11.6077 41.1889 12.0712 41.6401 12.6268 41.9494C13.1824 42.2587 13.8101 42.4151 14.4458 42.4025C15.0816 42.39 15.7026 42.209 16.2455 41.878L42.1349 26.0421C42.657 25.7243 43.0884 25.2776 43.3878 24.7448C43.6873 24.212 43.8445 23.6112 43.8445 23C43.8445 22.3889 43.6873 21.788 43.3878 21.2552C43.0884 20.7224 42.657 20.2757 42.1349 19.9579ZM15.0938 37.5277V8.47228L38.8413 23L15.0938 37.5277Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                id="pause"
                xmlns="http://www.w3.org/2000/svg"
                height="46"
                width="46"
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
                height="46"
                width="46"
                viewBox="0 0 40 40"
              >
                <path d="M5 35v-2.792h30V35Zm0-6.792v-2.791h19.792v2.791Zm0-6.833v-2.75h30v2.75Zm0-6.792v-2.791h19.792v2.791Zm0-6.791V5h30v2.792Z" />
              </svg>
            ) : (
              <svg
                id="center"
                xmlns="http://www.w3.org/2000/svg"
                height="46"
                width="46"
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
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M18.6873 3.66745C17.8742 3.49641 17.027 3.61488 16.292 4.00238C15.557 4.38988 14.9806 5.02205 14.6623 5.78956C14.6497 5.81651 14.639 5.84526 14.6282 5.87222L3.85771 34.5881C3.63671 35.1335 3.55307 35.7249 3.61411 36.3103C3.67516 36.8957 3.87904 37.4571 4.20783 37.9452C4.53662 38.4333 4.98027 38.8333 5.49978 39.1098C6.0193 39.3864 6.59878 39.5311 7.18732 39.5313H17.9686C18.9217 39.5313 19.8358 39.1526 20.5097 38.4787C21.1837 37.8047 21.5623 36.8906 21.5623 35.9375V7.18753C21.5679 6.35784 21.2838 5.55221 20.7589 4.9096C20.2341 4.26699 19.5014 3.82768 18.6873 3.66745ZM17.2498 35.2188H8.22771L17.2498 11.1568V35.2188ZM42.1419 34.5881L31.3751 5.87222C31.3643 5.84526 31.3535 5.81651 31.3409 5.78956C31.018 5.02609 30.441 4.39773 29.7078 4.01096C28.9746 3.62418 28.1303 3.50277 27.3178 3.66729C26.5053 3.83181 25.7747 4.27216 25.2498 4.91371C24.7248 5.55526 24.4378 6.35857 24.4373 7.18753V35.9375C24.4373 36.8906 24.8159 37.8047 25.4899 38.4787C26.1639 39.1526 27.0779 39.5313 28.0311 39.5313H38.8123C39.401 39.5314 39.9807 39.3869 40.5005 39.1104C41.0202 38.834 41.4641 38.4341 41.7931 37.946C42.1221 37.4578 42.3261 36.8963 42.3873 36.3107C42.4484 35.7252 42.3648 35.1337 42.1437 34.5881H42.1419ZM28.7498 35.2188V11.1568L37.7719 35.2188H28.7498Z"
                fill="black"
              />
            </svg>
          </button>

          <button
            id="flipy"
            className={styles.controlButton}
            title="Mirror text vertically [V]"
            onClick={toggleFlipY}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
            >
              <path
                d="M10.0625 21.5625H38.8125C39.6416 21.5625 40.4452 21.2757 41.0871 20.7509C41.729 20.2261 42.1696 19.4955 42.3344 18.6829C42.4991 17.8703 42.3778 17.0258 41.9911 16.2924C41.6043 15.559 40.9759 14.9819 40.2123 14.6589L40.1296 14.6248L11.412 3.85789C10.8665 3.6369 10.2751 3.55325 9.68972 3.6143C9.10436 3.67535 8.54295 3.87922 8.05482 4.20801C7.56669 4.53681 7.16677 4.98045 6.89022 5.49997C6.61367 6.01948 6.46894 6.59896 6.46875 7.1875V17.9688C6.46875 18.9219 6.84738 19.836 7.52134 20.5099C8.19529 21.1839 9.10938 21.5625 10.0625 21.5625ZM10.7813 8.22789L34.8432 17.25H10.7813V8.22789ZM38.8125 24.4375H10.0625C9.10938 24.4375 8.19529 24.8161 7.52134 25.4901C6.84738 26.164 6.46875 27.0781 6.46875 28.0313V38.8125C6.46865 39.4012 6.61316 39.9809 6.88959 40.5006C7.16602 41.0204 7.5659 41.4643 8.05407 41.7933C8.54225 42.1223 9.10377 42.3263 9.68928 42.3875C10.2748 42.4486 10.8663 42.365 11.412 42.1439L40.1278 31.377L40.2105 31.3429C40.9751 31.0206 41.6046 30.4438 41.9922 29.7102C42.3798 28.9765 42.5017 28.1314 42.337 27.3182C42.1724 26.505 41.7315 25.7738 41.089 25.2487C40.4466 24.7236 39.6422 24.437 38.8125 24.4375ZM10.7813 37.7739V28.75H34.8432L10.7813 37.7739Z"
                fill="white"
              />
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
              height="46"
              width="46"
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
              height="46"
              width="46"
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

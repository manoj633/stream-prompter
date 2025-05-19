import React from "react";
import styles from "./HomePage.module.css";
import logoImage from "../../assets/images/logo.png";
import telepromaImage from "../../assets/images/teleproma.png";
import settingImage from "../../assets/images/setting.svg";
import speedImage from "../../assets/images/speed.svg";
import textImage from "../../assets/images/text.svg";
import themeImage from "../../assets/images/theme.svg";

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImage} alt="Logo" width="36" height="36" />
          Stream&nbsp;<strong> Prompter</strong>
        </div>

        <nav className={styles.nav}>
          <a href="#">Features</a>
          <a href="#">Blog</a>
          <a href="#">Use Cases</a>
          <a href="#">How It Works</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.badge}>
          Professional Online Streaming Teleprompter
        </div>
        <h1>
          <span className={styles.highlight}>The Online Teleprompter</span> For
          Seamless Script Reading, Anytime, Anywhere
        </h1>
        <div className={styles.teleprompterBox}>
          <textarea placeholder="Type in or paste your script here..."></textarea>
          <button>Stream Now →</button>
        </div>
      </section>

      <section className={`${styles.features} ${styles.section}`}>
        <h2>Designed for Creators</h2>
        <p className={styles.subtitle}>
          Everything you need for smooth presentations and seamless delivery
        </p>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.svgCircle}>
              <div className={styles.svgBackground}>
                <img
                  src={textImage}
                  alt="Adjustable Text Size"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Adjustable Text Size</h3>
            <p>Customize font size for optimal reading from any distance.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.svgCircle}>
              <div className={styles.svgBackground}>
                <img
                  src={speedImage}
                  alt="Flexible Speed Control"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Flexible Speed Control</h3>
            <p>Set your pace with precise scroll speed adjustments.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.svgCircle}>
              <div className={styles.svgBackground}>
                <img
                  src={settingImage}
                  alt="Custom Margins"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Custom Margins</h3>
            <p>Adjust text margins to fit your preferred reading style.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.svgCircle}>
              <div className={styles.svgBackground}>
                <img
                  src={themeImage}
                  alt="Multiple Themes"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Multiple Themes</h3>
            <p>Switch between light, dark, and creative color themes.</p>
          </div>
        </div>
        <div className={styles.cta}>
          <a href="#">Try it now →</a>
        </div>
      </section>

      <section className={`${styles.professional} ${styles.section}`}>
        <h2>A Professional Teleprompter in your Web Browser</h2>
      </section>

      <section className={styles.professionalSection}>
        <div className={styles.textContent}>
          <h2>Perform With Confidence</h2>
          <p>
            Whether you're recording videos, giving presentations, or practicing
            speeches, OnCueCanvas helps you deliver your message smoothly and
            professionally.
          </p>
          <ul className={styles.featureList}>
            <li>No registration or download required</li>
            <li>Works on any device with a web browser</li>
            <li>Completely free to use</li>
            <li>Privacy-focused - your scripts stay on your device</li>
          </ul>
        </div>
        <div className={styles.imageContainer}>
          <img src={telepromaImage} alt="Teleprompter UI" />
        </div>
      </section>

      <section className={styles.signupSection}>
        <div className={styles.signupText}>
          <h2>Stay in the tech loop.</h2>
          <p>
            Keep up to date with new products, all the goss, and anything else
            you might have missed on twitter.
          </p>
        </div>
        <form className={styles.signupForm}>
          <div className={styles.formInputGroup}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Sign Up</button>
          </div>
          <small>
            By clicking Sign Up you're confirming that you agree with our Terms
            and Conditions.
          </small>
        </form>
      </section>

      <footer className={styles.footer}>
        <p>© StreamPrompter.com | Privacy Policy | Cookies | Terms & Use</p>
      </footer>
    </div>
  );
};

export default HomePage;

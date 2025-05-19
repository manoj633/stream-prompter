import React from "react";
import styles from "./HowItWorksPage.module.css";

const HowItWorksPage = () => {
  return (
    <div className={styles.howItWorksContainer}>
      {/* Navigation */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            src="../assets/home/logo.png"
            alt="Logo"
            width="36"
            height="36"
          />
          Stream&nbsp;<strong>Prompter</strong>
        </div>

        <nav className={styles.nav}>
          <a href="#">Features</a>
          <a href="#">Blog</a>
          <a href="#">Use Cases</a>
          <a href="#">How It Works</a>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>
            Effortless Script Reading,
            <span className={styles.textPurple}>Made Simple</span>
          </h1>
          <p>
            StreamPrompter transforms the way you deliver spoken content with
            our intuitive teleprompter for Windows, Mac, iOS, and Android.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.btnPrimary}>Get Started</button>
            <button className={styles.btnOutline}>Watch Demo</button>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <h2>How Stream Prompter Works</h2>
          <div
            className={`${styles.featuresGrid} ${styles.featuresGridHowItWorks}`}
          >
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src="../assets/home/clip.png"
                  alt="Script Icon"
                  width="15"
                  height="15"
                />
              </div>
              <div className={styles.featureContent}>
                <p className={styles.featureStep}>Step 01</p>
                <h3>Write or Import Your Script</h3>
                <p>
                  Enter your text directly into the editor or import from
                  documents, notes, or clipboard. OnCueCanvas accepts plain text
                  and preserves formatting from common document types.
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src="../assets/home/clip.png"
                  alt="Script Icon"
                  width="15"
                  height="15"
                />
              </div>
              <div className={styles.featureContent}>
                <p className={styles.featureStep}>Step 01</p>
                <h3>Write or Import Your Script</h3>
                <p>
                  Enter your text directly into the editor or import from
                  documents, notes, or clipboard. OnCueCanvas accepts plain text
                  and preserves formatting from common document types.
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src="../assets/home/clip.png"
                  alt="Script Icon"
                  width="15"
                  height="15"
                />
              </div>
              <div className={styles.featureContent}>
                <p className={styles.featureStep}>Step 01</p>
                <h3>Write or Import Your Script</h3>
                <p>
                  Enter your text directly into the editor or import from
                  documents, notes, or clipboard. OnCueCanvas accepts plain text
                  and preserves formatting from common document types.
                </p>
              </div>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <img
                  src="../assets/home/clip.png"
                  alt="Script Icon"
                  width="15"
                  height="15"
                />
              </div>
              <div className={styles.featureContent}>
                <p className={styles.featureStep}>Step 01</p>
                <h3>Write or Import Your Script</h3>
                <p>
                  Enter your text directly into the editor or import from
                  documents, notes, or clipboard. OnCueCanvas accepts plain text
                  and preserves formatting from common document types.
                </p>
              </div>
            </div>
            {/* Add the remaining 3 feature cards in the same structure */}
          </div>
        </section>

        {/* Demo Section */}
        <section className={styles.demo}>
          <h1>See It In Action</h1>
          <p>
            Experience how StreamPrompter enhances your content delivery with
            its intuitive interface.
          </p>
          <div className={styles.videoPlaceholder}>
            <div className={styles.playButton}>
              <div className={styles.playIcon}></div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className={styles.keyFeatures}>
          <h2>Key Features</h2>
          <div className={styles.featuresGrid}>
            {/* 6 Feature Cards */}
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>{/* Icon SVG */}</div>
              <h3>Frictionless Design</h3>
              <p>
                Simple interface that lets you focus on delivery instead of
                technology.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>{/* Icon SVG */}</div>
              <h3>Frictionless Design</h3>
              <p>
                Simple interface that lets you focus on delivery instead of
                technology.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>{/* Icon SVG */}</div>
              <h3>Frictionless Design</h3>
              <p>
                Simple interface that lets you focus on delivery instead of
                technology.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>{/* Icon SVG */}</div>
              <h3>Frictionless Design</h3>
              <p>
                Simple interface that lets you focus on delivery instead of
                technology.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>{/* Icon SVG */}</div>
              <h3>Frictionless Design</h3>
              <p>
                Simple interface that lets you focus on delivery instead of
                technology.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>{/* Icon SVG */}</div>
              <h3>Frictionless Design</h3>
              <p>
                Simple interface that lets you focus on delivery instead of
                technology.
              </p>
            </div>
            {/* Repeat for other 5 features */}
          </div>
        </section>

        {/* Newsletter */}
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
              By clicking Sign Up you're confirming that you agree with our
              Terms and Conditions.
            </small>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© StreamPrompter.com | Privacy Policy | Cookies | Terms & Use</p>
      </footer>
    </div>
  );
};

export default HowItWorksPage;

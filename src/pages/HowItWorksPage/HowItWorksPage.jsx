import React from "react";
import styles from "./HowItWorksPage.module.css";
import logoImage from "../../assets/images/logo.png";
import clipImage from "../../assets/images/clip.png";
import { Link, useNavigate} from "react-router-dom";

const HowItWorksPage = () => {
  const navigate = useNavigate();
  const demoSectionRef = React.useRef(null);

  const handleGetStarted = () => {
    navigate("/");
  };

   const handleWatchDemo = () => {
    demoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={styles.howItWorksContainer}>
      {/* Navigation */}
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <img src={logoImage} alt="Logo" width="36" height="36" />
            Stream&nbsp;<strong>Prompter</strong>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link to="/">Features</Link>
          <Link to="/blog-list">Blog</Link>
          <Link to="/use-cases">Use Cases</Link>
          <Link to="/how-it-works">How It Works</Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>
            Effortless Script Reading,
            <span className={styles.textPurple}>&nbsp;Made Simple</span>
          </h1>
          <p>
            StreamPrompter transforms the way you deliver spoken content with
            our intuitive teleprompter for Windows, Mac, iOS, and Android.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.btnPrimary} onClick={handleGetStarted}>Get Started</button>
            <button className={styles.btnOutline} onClick={handleWatchDemo}>Watch Demo</button>
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
                <img src={clipImage} alt="Script Icon" width="15" height="15" />
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
                <img src={clipImage} alt="Script Icon" width="15" height="15" />
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
                <img src={clipImage} alt="Script Icon" width="15" height="15" />
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
                <img src={clipImage} alt="Script Icon" width="15" height="15" />
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
          </div>
        </section>

        {/* Demo Section */}
        <section className={styles.demo} ref={demoSectionRef}>
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

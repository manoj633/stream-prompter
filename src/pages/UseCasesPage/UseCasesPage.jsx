import React from "react";
import styles from "./UseCasesPage.module.css";
import logoImage from "../../assets/images/logo.png";

const UseCasesPage = () => {
  return (
    <div className={styles.useCasesContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImage} alt="Logo" width="36" height="36" />
          Stream&nbsp;<strong>Prompter</strong>
        </div>

        <nav className={styles.nav}>
          <a href="#">Features</a>
          <a href="#">Blog</a>
          <a href="#">Use Cases</a>
          <a href="#">How It Works</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <h1>Real Solutions for Real Creators</h1>
        <p>
          Teleprompter software that empowers content creators to create
          professional videos quickly and easily
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.btnPrimary}>Try it now</button>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h1>Who Uses Stream Prompter</h1>

          <div className={styles.cardGrid}>
            <div className={styles.card}>
              <div className={`${styles.cardHeader} ${styles.purple}`}>
                <div className={styles.cardEmoji}>🎬</div>
                <h3>Content Creators</h3>
              </div>
              <div className={styles.cardBody}>
                <p>
                  Learn how speakers prepare and present speeches and
                  presentations with confidence. Learn how speakers prepare and
                  present speeches and presentations with confidence.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={`${styles.cardHeader} ${styles.blue}`}>
                <div className={styles.cardEmoji}>🎤</div>
                <h3>Public Speaking</h3>
              </div>
              <div className={styles.cardBody}>
                <p>
                  Learn how speakers prepare and present speeches and
                  presentations with confidence. Learn how speakers prepare and
                  present speeches and presentations with confidence.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={`${styles.cardHeader} ${styles.orange}`}>
                <div className={styles.cardEmoji}>🎓</div>
                <h3>Education</h3>
              </div>
              <div className={styles.cardBody}>
                <p>
                  Learn how speakers prepare and present speeches and
                  presentations with confidence. Learn how speakers prepare and
                  present speeches and presentations with confidence.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <div className={`${styles.cardHeader} ${styles.green}`}>
                <div className={styles.cardEmoji}>💼</div>
                <h3>Business Presentations</h3>
              </div>
              <div className={styles.cardBody}>
                <p>
                  Learn how speakers prepare and present speeches and
                  presentations with confidence. Learn how speakers prepare and
                  present speeches and presentations with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.demo}>
        <div className={styles.container}>
          <h1>Stream Prompter in Action</h1>

          <div className={styles.demoItem}>
            <div className={styles.demoContent}>
              <h3>Professional Presentations</h3>
              <p>
                Deliver polished, engaging presentations that keep your audience
                captivated.
              </p>
              <ul>
                <li>
                  Easily adjust text size, scrolling speed, and background to
                  match your needs
                </li>
                <li>
                  Use keyboard shortcuts for seamless control during recording
                </li>
                <li>Mirror text for traditional teleprompter setups</li>
              </ul>
            </div>
            <div className={styles.demoImage}></div>
          </div>

          <div className={styles.demoItem}>
            <div className={styles.demoContent}>
              <h3>Professional Presentations</h3>
              <p>
                Deliver polished, engaging presentations that keep your audience
                captivated.
              </p>
              <ul>
                <li>
                  Easily adjust text size, scrolling speed, and background to
                  match your needs
                </li>
                <li>
                  Use keyboard shortcuts for seamless control during recording
                </li>
                <li>Mirror text for traditional teleprompter setups</li>
              </ul>
            </div>
            <div className={styles.demoImage}></div>
          </div>

          <div className={styles.demoItem}>
            <div className={styles.demoContent}>
              <h3>Professional Presentations</h3>
              <p>
                Deliver polished, engaging presentations that keep your audience
                captivated.
              </p>
              <ul>
                <li>
                  Easily adjust text size, scrolling speed, and background to
                  match your needs
                </li>
                <li>
                  Use keyboard shortcuts for seamless control during recording
                </li>
                <li>Mirror text for traditional teleprompter setups</li>
              </ul>
            </div>
            <div className={styles.demoImage}></div>
          </div>

          <div className={styles.demoItem}>
            <div className={styles.demoContent}>
              <h3>Professional Presentations</h3>
              <p>
                Deliver polished, engaging presentations that keep your audience
                captivated.
              </p>
              <ul>
                <li>
                  Easily adjust text size, scrolling speed, and background to
                  match your needs
                </li>
                <li>
                  Use keyboard shortcuts for seamless control during recording
                </li>
                <li>Mirror text for traditional teleprompter setups</li>
              </ul>
            </div>
            <div className={styles.demoImage}></div>
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <h1>What Our Users Say</h1>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>👤</div>
              <div>
                <h4>Sarah Thompson</h4>
                <p className={styles.userRole}>Content Creator</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              <em>
                OnCueCanvas has transformed my YouTube workflow. My delivery is
                more natural and I can focus on connecting with my audience
                rather than memorizing scripts.
              </em>
            </p>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>👤</div>
              <div>
                <h4>Michael Chen</h4>
                <p className={styles.userRole}>Public Speaker</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              <em>
                I use OnCueCanvas for all my keynote presentations. The
                customizable scroll speed helps me match my natural speaking
                pace perfectly.
              </em>
            </p>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>👤</div>
              <div>
                <h4>Priya Sharma</h4>
                <p className={styles.userRole}>Online Educator</p>
              </div>
            </div>
            <p className={styles.testimonialText}>
              <em>
                As someone who creates educational content, OnCueCanvas helps me
                deliver complex information clearly and confidently. The font
                customization is excellent for readability.
              </em>
            </p>
          </div>
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

      <div className={styles.poweredBy}>
        <div className={styles.footerLogo}>
          <img src={logoImage} alt="Stream Prompter Logo" />
          <span>Online Teleprompter by StreamPrompter</span>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>© StreamPrompter.com | Privacy Policy | Cookies | Terms & Use</p>
      </footer>
    </div>
  );
};

export default UseCasesPage;

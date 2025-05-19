import React from "react";
import "./HomePage.css";
const HomePage = () => {
  return (
    <>
      <header>
        <div className="logo">
          <img
            src="../assets/home/logo.png"
            alt="Logo"
            width="36"
            height="36"
          />
          Stream&nbsp;<strong> Prompter</strong>
        </div>

        <nav>
          <a href="#">Features</a>
          <a href="#">Blog</a>
          <a href="#">Use Cases</a>
          <a href="#">How It Works</a>
        </nav>
      </header>

      <section className="hero">
        <div className="badge">Professional Online Streaming Teleprompter</div>
        <h1>
          <span className="highlight">The Online Teleprompter</span> For
          Seamless Script Reading, Anytime, Anywhere
        </h1>
        <div className="teleprompter-box">
          <textarea placeholder="Type in or paste your script here..."></textarea>
          <button>Stream Now →</button>
        </div>
      </section>

      <section className="features section">
        <h2>Designed for Creators</h2>
        <p className="subtitle">
          Everything you need for smooth presentations and seamless delivery
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="svg-circle">
              <div className="svg-background">
                <img
                  src="../assets/home/text.svg"
                  alt="Adjustable Text Size"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Adjustable Text Size</h3>
            <p>Customize font size for optimal reading from any distance.</p>
          </div>
          <div className="feature-card">
            <div className="svg-circle">
              <div className="svg-background">
                <img
                  src="../assets/home//speed.svg"
                  alt="Flexible Speed Control"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Flexible Speed Control</h3>
            <p>Set your pace with precise scroll speed adjustments.</p>
          </div>

          <div className="feature-card">
            <div className="svg-circle">
              <div className="svg-background">
                <img
                  src="../assets/home//setting.svg"
                  alt="Custom Margins"
                  width="20"
                  height="20"
                />
              </div>
            </div>
            <h3>Custom Margins</h3>
            <p>Adjust text margins to fit your preferred reading style.</p>
          </div>

          <div className="feature-card">
            <div className="svg-circle">
              <div className="svg-background">
                <img
                  src="../assets/home//theme.svg"
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
        <div className="cta">
          <a href="#">Try it now →</a>
        </div>
      </section>

      <section className="professional section">
        <h2>A Professional Teleprompter in your Web Browser</h2>
      </section>
      <section className="professional-section">
        <div className="text-content">
          <h2>Perform With Confidence</h2>
          <p>
            Whether you're recording videos, giving presentations, or practicing
            speeches, OnCueCanvas helps you deliver your message smoothly and
            professionally.
          </p>
          <ul className="feature-list">
            <li>No registration or download required</li>
            <li>Works on any device with a web browser</li>
            <li>Completely free to use</li>
            <li>Privacy-focused - your scripts stay on your device</li>
          </ul>
        </div>
        <div className="image-container">
          <img src="../assets/home/teleproma.png" alt="Teleprompter UI" />
        </div>
      </section>

      <section className="signup-section">
        <div className="signup-text">
          <h2>Stay in the tech loop.</h2>
          <p>
            Keep up to date with new products, all the goss, and anything else
            you might have missed on twitter.
          </p>
        </div>
        <form className="signup-form">
          <div className="form-input-group">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Sign Up</button>
          </div>
          <small>
            By clicking Sign Up you're confirming that you agree with our Terms
            and Conditions.
          </small>
        </form>
      </section>

      <footer>
        <p>© StreamPrompter.com | Privacy Policy | Cookies | Terms & Use</p>
      </footer>
    </>
  );
};

export default HomePage;

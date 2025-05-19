import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BlogListPage.module.css";
import logoImage from "../../assets/images/logo.png";

const BlogListPage = () => {
  const navigate = useNavigate();

  const handleBlogClick = () => {
    navigate("/blog");
  };

  return (
    <div className={styles.blogListContainer}>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}>
            <img src={logoImage} alt="Logo" width="36" height="36" />
            Stream&nbsp;<strong>Prompter</strong>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link to="/">Features</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/use-cases">Use Cases</Link>
          <Link to="/how-it-works">How It Works</Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1>Blogs for Creators</h1>
          <p>
            Discover how OnCueCanvas is empowering professionals across diverse
            fields to deliver their message with confidence and clarity
          </p>
        </section>

        <section className={styles.latestPosts}>
          <h2>Latest Posts</h2>

          <div className={styles.postsGrid}>
            {/* Row 1 */}
            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Website with HTML and CSS</h3>
                <p>
                  Learn the fundamentals of web development to build your online
                  presence.
                </p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 15, 2025</span>
                  <span className={styles.readTime}>5 min read</span>
                </div>
              </div>
            </article>

            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Design a Professional Website with Figma</h3>
                <p>Master the design process before diving into code.</p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 14, 2025</span>
                  <span className={styles.readTime}>6 min read</span>
                </div>
              </div>
            </article>

            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Website with WordPress</h3>
                <p>Build a stunning website without writing code.</p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 13, 2025</span>
                  <span className={styles.readTime}>4 min read</span>
                </div>
              </div>
            </article>

            {/* Row 2 */}
            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Website with Webflow</h3>
                <p>
                  Design visually while maintaining developer-level control.
                </p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 12, 2025</span>
                  <span className={styles.readTime}>7 min read</span>
                </div>
              </div>
            </article>

            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Website with Squarespace</h3>
                <p>The all-in-one solution for beautiful websites.</p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 11, 2025</span>
                  <span className={styles.readTime}>5 min read</span>
                </div>
              </div>
            </article>

            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Build a Professional Website from Scratch</h3>
                <p>The comprehensive guide to web development.</p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 10, 2025</span>
                  <span className={styles.readTime}>10 min read</span>
                </div>
              </div>
            </article>

            {/* Row 3 */}
            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Blog in Notion</h3>
                <p>Turn your Notion workspace into a public-facing blog.</p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 9, 2025</span>
                  <span className={styles.readTime}>8 min read</span>
                </div>
              </div>
            </article>

            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Blog in Ghost</h3>
                <p>
                  The platform built specifically for professional publishing.
                </p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 8, 2025</span>
                  <span className={styles.readTime}>6 min read</span>
                </div>
              </div>
            </article>

            <article className={styles.postCard} onClick={handleBlogClick}>
              <div className={styles.postImage}></div>
              <div className={styles.postContent}>
                <h3>How to Create a Professional Blog in Medium</h3>
                <p>Reach a built-in audience with minimal setup.</p>
                <div className={styles.postMeta}>
                  <span className={styles.date}>May 7, 2025</span>
                  <span className={styles.readTime}>4 min read</span>
                </div>
              </div>
            </article>
          </div>

          <div className={styles.loadMore}>
            <button className={styles.loadMoreButton}>Load More Article</button>
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
              By clicking Sign Up you're confirming that you agree with our
              Terms and Conditions.
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
      </main>
    </div>
  );
};

export default BlogListPage;

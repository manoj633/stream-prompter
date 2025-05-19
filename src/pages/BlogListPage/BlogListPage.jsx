import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BlogListPage.module.css";
import logoImage from "../../assets/images/logo.png";

const BlogListPage = () => {
  const navigate = useNavigate();

  const allArticles = [
    {
      title: "How to Create a Professional Website with HTML and CSS",
      description:
        "Learn the fundamentals of web development to build your online presence.",
      date: "May 15, 2025",
      readTime: "5 min read",
    },
    {
      title: "How to Design a Professional Website with Figma",
      description: "Master the design process before diving into code.",
      date: "May 14, 2025",
      readTime: "6 min read",
    },
    {
      title: "How to Create a Professional Website with WordPress",
      description: "Build a stunning website without writing code.",
      date: "May 13, 2025",
      readTime: "4 min read",
    },
    {
      title: "How to Create a Professional Website with Webflow",
      description: "Design visually while maintaining developer-level control.",
      date: "May 12, 2025",
      readTime: "7 min read",
    },
    {
      title: "How to Create a Professional Website with Squarespace",
      description: "The all-in-one solution for beautiful websites.",
      date: "May 11, 2025",
      readTime: "5 min read",
    },
    {
      title: "How to Build a Professional Website from Scratch",
      description: "The comprehensive guide to web development.",
      date: "May 10, 2025",
      readTime: "10 min read",
    },
    {
      title: "How to Create a Professional Blog in Notion",
      description: "Turn your Notion workspace into a public-facing blog.",
      date: "May 9, 2025",
      readTime: "8 min read",
    },
    {
      title: "How to Create a Professional Blog in Ghost",
      description:
        "The platform built specifically for professional publishing.",
      date: "May 8, 2025",
      readTime: "6 min read",
    },
    {
      title: "How to Create a Professional Blog in Medium",
      description: "Reach a built-in audience with minimal setup.",
      date: "May 7, 2025",
      readTime: "4 min read",
    },
    {
      title: "How to Create a Professional Website with HTML and CSS",
      description:
        "Learn the fundamentals of web development to build your online presence.",
      date: "May 15, 2025",
      readTime: "5 min read",
    },
    {
      title: "How to Design a Professional Website with Figma",
      description: "Master the design process before diving into code.",
      date: "May 14, 2025",
      readTime: "6 min read",
    },
    {
      title: "How to Create a Professional Website with WordPress",
      description: "Build a stunning website without writing code.",
      date: "May 13, 2025",
      readTime: "4 min read",
    },
    {
      title: "How to Create a Professional Website with Webflow",
      description: "Design visually while maintaining developer-level control.",
      date: "May 12, 2025",
      readTime: "7 min read",
    },
    {
      title: "How to Create a Professional Website with Squarespace",
      description: "The all-in-one solution for beautiful websites.",
      date: "May 11, 2025",
      readTime: "5 min read",
    },
    {
      title: "How to Build a Professional Website from Scratch",
      description: "The comprehensive guide to web development.",
      date: "May 10, 2025",
      readTime: "10 min read",
    },
    {
      title: "How to Create a Professional Blog in Notion",
      description: "Turn your Notion workspace into a public-facing blog.",
      date: "May 9, 2025",
      readTime: "8 min read",
    },
    {
      title: "How to Create a Professional Blog in Ghost",
      description:
        "The platform built specifically for professional publishing.",
      date: "May 8, 2025",
      readTime: "6 min read",
    },
    {
      title: "How to Create a Professional Blog in Medium",
      description: "Reach a built-in audience with minimal setup.",
      date: "May 7, 2025",
      readTime: "4 min read",
    },
    // Add more articles as needed
  ];

  const [visibleArticles, setVisibleArticles] = useState(6);

  const handleLoadMore = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 6);
  };

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
          <Link to="/blog-list">Blog</Link>
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
            {allArticles.slice(0, visibleArticles).map((article, index) => (
              <article
                key={index}
                className={styles.postCard}
                onClick={handleBlogClick}
              >
                <div className={styles.postImage}></div>
                <div className={styles.postContent}>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className={styles.postMeta}>
                    <span className={styles.date}>{article.date}</span>
                    <span className={styles.readTime}>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleArticles < allArticles.length && (
            <div className={styles.loadMore}>
              <button
                className={styles.loadMoreButton}
                onClick={handleLoadMore}
              >
                Load More Articles
              </button>
            </div>
          )}
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

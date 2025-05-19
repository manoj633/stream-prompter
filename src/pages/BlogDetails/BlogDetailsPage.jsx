import React from "react";
import styles from "./BlogDetailsPage.module.css";
import logoImage from "../../assets/images/logo.png";
import beachHouseImage from "../../assets/images/beach_carnival.png";
import { Link } from "react-router-dom";
const BlogDetailsPage = () => {
  return (
    <div className={styles.blogDetailsContainer}>
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

      <section className={styles.hero}>
        <h1>
          How to Create a Professional <br />
          Teleprompter Setup at Home
        </h1>
        <div className={styles.meta}>
          <span>October 2024</span>
          <span className={styles.dot}>|</span>
          <span>5 min read</span>
        </div>
      </section>

      <main className={`${styles.blogContent} ${styles.container}`}>
        <div className={styles.userProfileHeader}>
          <div className={styles.profileLeft}>
            <div className={styles.avatar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className={styles.avatarIcon}
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.name}>Alex Johnson</div>
              <div className={styles.role}>Content Creator</div>
            </div>
          </div>
          <div className={styles.profileIcons}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className={styles.icon}
            >
              <path d="M11.47 1.72a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 01-1.06-1.06l3-3zM11.25 7.5V15a.75.75 0 001.5 0V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className={styles.icon}
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className={styles.blog}>
          <p>
            Ready to kick off 2025 with memories you'll cherish forever? Imagine
            a nice sea breeze, fireworks in the night sky, and music that lifts
            your spirits until dawn. There is no better place to experience this
            than Goa, the crown jewel of India's party destinations. Goa is
            India's #1 New Year celebration destination and is known for its
            electrifying nightlife, magnificent beaches, and rich cultural
            experiences. From energetic beach parties to classy private
            gatherings, every area of Goa is alive with activity. Whether you
            prefer the quiet charm of the South or the lively ambiance of the
            North, you will find the best New Year party in Goa to suit your
            taste. Let's take a look at the best celebration sites in Goa,
            complete with thrilling attractions and luxurious lodgings that
            promise an amazing start to the New Year.
          </p>

          <h2>The Basic Configuration You'll Need</h2>
          <p>
            During New Year's Eve Goa's charm lies in its ability to host the
            best New Year party in Goa, offering celebrations as diverse as its
            visitors. Every part of Goa will provide a unique celebration, from
            thrilling beach carnivals to opulent club nights.
          </p>

          <img src={beachHouseImage} alt="Teleprompter Setup" />

          <h2>
            1. Beach Carnival Extravaganza - Where Magic Meets the Shoreline
          </h2>
          <p>
            There is nothing like experiencing New Year on the beach with the
            rhythmic sound of waves, golden sands underfoot, and fireworks
            lighting up the night sky. The New Year Carnival on the Beach
            perfectly preserves Goa's festive soul and that makes it one of the
            most exciting New Year celebrations in Goa. Picture this: live music
            fills the air, fire dancers amaze the crowd, and DJs play beats that
            get everyone dancing under the stars. On the beaches of Baga,
            Calangute, and Anjuna there are also bars serving cocktails such as
            Mojitos and Margaritas as well as food stalls that serve fish curry,
            bebinca, and other Goan dishes. Whether you are dancing, eating, or
            just relaxing on the beach, we must say this carnival is one of the
            immaculate New Year events in Goa.
          </p>

          <img src={beachHouseImage} alt="Teleprompter Setup" />

          <h2>
            2. Love Passion Karma, Candolim - A Sparkling Fusion of Love and Fun
          </h2>

          <p>
            Cafe Mambo is the ultimate destination for party enthusiasts and is
            renowned for its vibrant atmosphere. With its stunning beachfront
            location and lively energy, it's the ideal place to welcome the New
            Year with fantastic music, tasty food, and an amazing crowd. Here
            guests can enjoy unlimited premium cocktails with a VIP experience
            and can be a part of this unforgettable night. Don't wait; mark your
            calendars and get your tickets immediately. Bid farewell to 2024 and
            usher in 2025 with an unforgettable celebration!
          </p>
          <h2>3. Goa New Year Cruise Party - Sailing into 2025</h2>
          <p>
            What better time to embark on the legendary Goan cruise than New
            Year's! Boarding a luxury cruise is one of the most exclusive New
            Year events in Goa. You might plan to sail on any of the cruises
            that provide fantastic cruise parties for a big New Year's
            celebration in Goa. The lively ambiance is the first thing that will
            blow your mind, and what comes next will make it the most memorable
            cruise experience of your life! Paradise Cruise, Goa's most famous
            cruise line, will conduct two different parties on its boats on New
            Year's Eve to cater to the tastes of all sorts of partygoers and
            vacationers. Whether you're looking for a lively party atmosphere or
            a cozy romantic night, a cruise party offers the best New Year party
            in Goa for an unforgettable beginning to the year.
          </p>

          <img src={beachHouseImage} alt="Teleprompter Setup" />

          <h2>4. Cafe Mambos - Plunge into the Celebration</h2>
          <p>
            Cafe Mambo is the ultimate destination for party enthusiasts and is
            renowned for its vibrant atmosphere. With its stunning beachfront
            location and lively energy, it's the ideal place to welcome the New
            Year with fantastic music, tasty food, and an amazing crowd. Here
            guests can enjoy unlimited premium cocktails with a VIP experience
            and can be a part of this unforgettable night. Don't wait; mark your
            calendars and get your tickets immediately. Bid farewell to 2024 and
            usher in 2025 with an unforgettable celebration!
          </p>
          <h2>5. Club Titos - Dance into the Festive Groove</h2>
          <p>
            Get ready to dive into the electrifying vibes of the Bolo Bolo
            Bollywood Music Festival. It's happening at Tito's Lane, known for
            hosting one of the best New Year parties in Goa. From 26th to 29th
            December, this four-day festival features an exciting lineup of top
            Bollywood artists and DJs. DJ Syrah will get the party started with
            the latest Bollywood hits, followed by a star-studded performance by
            Bhumicka Singh and DJ Kriss. This event promises high-energy beats,
            amazing music, and a joyful and exciting atmosphere, making it one
            of the top choices for a New Year party in Goa.
          </p>
        </div>
      </main>

      <section className={`${styles.relatedBlogs} ${styles.container}`}>
        <h3>You may also like</h3>
        <div className={styles.relatedGrid}>
          <div className={styles.relatedCard}>Another Blog 1</div>
          <div className={styles.relatedCard}>Another Blog 2</div>
          <div className={styles.relatedCard}>Another Blog 3</div>
        </div>
      </section>

      <section className={styles.newsletter}>
        <h4>Stay in the tech loop.</h4>
        <p>
          Keep up to date with new products, all the goods, and anything else
          you might have missed the first time.
        </p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Sign Up</button>
        </form>
      </section>

      <footer className={styles.footer}>
        <p>© StreamPrompter.com | Privacy Policy | Cookies | Terms & Use</p>
      </footer>
    </div>
  );
};

export default BlogDetailsPage;

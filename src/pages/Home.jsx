import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SearchBox from "../components/SearchBox";
import AppDownload from "../components/AppDownload";

const TILES = [
  { icon: "🍽️", label: "Find Restaurants" },
  { icon: "📍", label: "Locations" },
  { icon: "📅", label: "Reservations" },
  { icon: "🏷️", label: "Special Offers" },
  { icon: "🧾", label: "Management Software" },
];

const OFFERS = [
  { title: "50% OFF", text: "On your first table booking", tone: "orange" },
  { title: "SUPER DELICIOUS FOOD", text: "Book the best tables in town", tone: "dark" },
  { title: "50% OFF", text: "Weekend dinner reservations", tone: "orange" },
  { title: "FREE BOOKING", text: "No fee on every reservation", tone: "dark" },
];

const NEWS = [
  { date: "Nov 10, 2026", title: "Top 5 fine dining restaurants to try this season" },
  { date: "Nov 12, 2026", title: "How to plan the perfect group dinner reservation" },
  { date: "Nov 14, 2026", title: "Why booking a table ahead saves time and money" },
];

const FAQS = [
  {
    q: "How does the online table system work?",
    a: "Choose a state and city, pick a restaurant, then select a day and time slot. Your booking is saved instantly.",
  },
  {
    q: "What is your cancellation policy?",
    a: "You can plan changes with the restaurant directly. Bookings made on this site are free of charge.",
  },
  {
    q: "Do you have special booking requirements?",
    a: "Bookings can be made up to a week in advance, for any of the listed time slots.",
  },
  {
    q: "Can I book for large groups?",
    a: "Yes. Reserve several slots or contact the restaurant for larger parties.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="home">
      <section className="hero" id="find">
        <div className="hero-copy">
          <h2>
            Skip the wait! Reserve Online
            <span> Table Reservation</span>
          </h2>
          <p>
            Discover restaurants in your city, pick a time that suits you and
            book a table in a few clicks.
          </p>
          <a className="btn-primary hero-btn" href="/#reservations">
            Reserve Now
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          👨‍🍳
        </div>
      </section>

      <section className="search-card" id="locations">
        <SearchBox />
        <p className="looking-for">You may be looking for</p>
        <ul className="tiles">
          {TILES.map((tile) => (
            <li key={tile.label} className="tile">
              <span className="tile-icon" aria-hidden="true">
                {tile.icon}
              </span>
              <span>{tile.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="offers" id="offers">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 980: { slidesPerView: 3 } }}
        >
          {OFFERS.map((offer, index) => (
            <SwiperSlide key={index}>
              <div className={`offer-card ${offer.tone}`}>
                <strong>{offer.title}</strong>
                <span>{offer.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="about" id="reservations">
        <div className="about-logo" aria-hidden="true">
          <span>🍴</span>
          <strong>Restaurant</strong>
          <small>Food &amp; Drinks</small>
        </div>
        <div className="about-copy">
          <p className="eyebrow">Introducing the easiest way</p>
          <h2>
            Table <span>Reservation</span>
          </h2>
          <p>
            Skip the phone calls. See which restaurants have tables and reserve
            yours without any booking fee.
          </p>
          <ul className="checks">
            <li>Easy online booking</li>
            <li>Special offers on bookings</li>
            <li>Instant confirmation</li>
          </ul>
        </div>
      </section>

      <section className="news">
        <h2 className="section-heading">Read Our Latest News</h2>
        <div className="news-grid">
          {NEWS.map((item) => (
            <article className="news-card" key={item.title}>
              <div className="news-image" aria-hidden="true">
                🍲
              </div>
              <p className="news-date">{item.date}</p>
              <p className="news-title">{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="promo-band" id="software">
        <div>
          <p className="eyebrow">Restaurants and diners</p>
          <h2>
            Table <span>Booking</span>
          </h2>
          <p>
            Fill your tables and keep guests happy with simple online
            reservations.
          </p>
        </div>
        <div className="promo-art" aria-hidden="true">
          👩‍🍳 👨‍🍳
        </div>
      </section>

      <section className="faq">
        <h2 className="section-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((item, index) => (
            <div className="faq-item" key={item.q}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <span>{item.q}</span>
                <span aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <AppDownload />
    </div>
  );
}

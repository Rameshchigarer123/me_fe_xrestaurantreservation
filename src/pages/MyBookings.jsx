import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppDownload from "../components/AppDownload";
import { formatRating, normalizeRestaurant } from "../utils/api";
import { formatBookingDate, getBookings } from "../utils/bookings";

function describe(booking, index) {
  const fallback = normalizeRestaurant(booking, index);
  return {
    key: `${booking.restaurantId || fallback.id}-${booking.bookingDate}-${booking.bookingTime}-${index}`,
    name: booking.restaurantName || fallback.name,
    address: booking.restaurantAddress || fallback.address,
    city: booking.restaurantCity || fallback.city,
    state: booking.restaurantState || fallback.state,
    rating:
      booking.restaurantRating !== undefined
        ? booking.restaurantRating
        : fallback.rating,
    date: booking.bookingDate,
    time: booking.bookingTime,
  };
}

export default function MyBookings() {
  const [query, setQuery] = useState("");
  const bookings = useMemo(
    () => getBookings().map((booking, index) => describe(booking, index)),
    []
  );

  const visible = bookings.filter((b) =>
    b.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="bookings-page">
      <section className="bookings-head">
        <h1>My Bookings</h1>
        <input
          type="search"
          className="bookings-search"
          placeholder="Search By Restaurant Name"
          aria-label="Search bookings by restaurant name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </section>

      <section className="results-body">
        <div className="results-list">
          {bookings.length === 0 ? (
            <p className="status-text">
              You have no bookings yet. <Link to="/">Find a restaurant</Link> to
              make one.
            </p>
          ) : visible.length === 0 ? (
            <p className="status-text">No bookings match your search.</p>
          ) : (
            visible.map((booking) => (
              <article className="restaurant-card" key={booking.key}>
                <div className="restaurant-main">
                  <div className="restaurant-icon" aria-hidden="true">
                    🍽️
                  </div>
                  <div className="restaurant-info">
                    <h3>{booking.name}</h3>
                    <p className="restaurant-place">
                      {booking.city}, {booking.state}
                    </p>
                    <p className="restaurant-address">{booking.address}</p>
                    <span className="rating-badge">
                      ★ {formatRating(booking.rating)}
                    </span>
                  </div>
                  <div className="booking-tags">
                    <span className="tag tag-time">{booking.time}</span>
                    <span className="tag tag-date">
                      {formatBookingDate(booking.date)}
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="results-promo" aria-hidden="true">
          <div className="promo-card">
            <p>ARE YOU</p>
            <strong>HUNGRY?</strong>
            <span>Order now and get 50% off</span>
          </div>
        </aside>
      </section>

      <AppDownload />
    </div>
  );
}

import React, { useState } from "react";
import BookingPanel from "./BookingPanel";
import { formatRating } from "../utils/api";

export default function RestaurantCard({ restaurant }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="restaurant-card">
      <div className="restaurant-main">
        <div className="restaurant-icon" aria-hidden="true">
          🍽️
        </div>
        <div className="restaurant-info">
          <h3>{restaurant.name}</h3>
          <p className="restaurant-place">
            {restaurant.city}, {restaurant.state}
          </p>
          <p className="restaurant-address">{restaurant.address}</p>
          <span className="rating-badge">
            ★ {formatRating(restaurant.rating)}
          </span>
        </div>
        <div className="restaurant-actions">
          <span className="available">Available today</span>
          <button
            type="button"
            className="btn-primary"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            Book FREE Reservation
          </button>
        </div>
      </div>
      {open && <BookingPanel restaurant={restaurant} />}
    </article>
  );
}

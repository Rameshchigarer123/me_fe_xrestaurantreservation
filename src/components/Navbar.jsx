import React, { useState } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Find Restaurants", href: "/#find" },
  { label: "Locations", href: "/#locations" },
  { label: "Reservations", href: "/#reservations" },
  { label: "Special Offers", href: "/#offers" },
  { label: "Restaurant Management Software", href: "/#software" },
  { label: "Services", href: "/#services" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topbar">
        Reserve your table online and enjoy exclusive offers at top restaurants.
      </div>
      <nav className="navbar">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            🍴
          </span>
          <span className="brand-name">Table Reserve</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>

        <ul className={`nav-links${open ? " open" : ""}`}>
          {LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <Link
              to="/my-bookings"
              className="nav-cta"
              onClick={() => setOpen(false)}
            >
              My Bookings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

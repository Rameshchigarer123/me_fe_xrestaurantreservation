import React from "react";

const COLUMNS = [
  ["About Us", "Careers", "Press", "Blog", "Contact Us"],
  ["Find Restaurants", "Locations", "Reservations", "Special Offers"],
  ["Privacy Policy", "Terms of Use", "Help Center", "Sitemap"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand brand-light">
            <span className="brand-mark" aria-hidden="true">
              🍴
            </span>
            <span className="brand-name">Table Reserve</span>
          </div>
          <div className="socials" aria-hidden="true">
            <span>f</span>
            <span>t</span>
            <span>in</span>
            <span>y</span>
          </div>
        </div>
        {COLUMNS.map((column, index) => (
          <ul className="footer-col" key={index}>
            {column.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
      <p className="copyright">
        Copyright © {new Date().getFullYear()} Table Reserve. All rights
        reserved.
      </p>
    </footer>
  );
}

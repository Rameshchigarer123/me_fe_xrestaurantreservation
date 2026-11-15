import React, { useState } from "react";

export default function AppDownload() {
  const [note, setNote] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setNote("Demo only: no message is sent.");
  };

  return (
    <section className="app-download" id="services">
      <div className="phone-mock" aria-hidden="true">
        <div className="phone-screen">
          <span>🍽️</span>
        </div>
      </div>
      <div className="app-copy">
        <h2>
          Download the <span>Restaurant Booking</span> App
        </h2>
        <p>Get the link to download the app</p>
        <form className="app-form" onSubmit={handleSubmit}>
          <input type="tel" placeholder="Enter phone number" />
          <button type="submit" className="btn-primary">
            Send SMS
          </button>
        </form>
        {note && <p className="muted-note">{note}</p>}
        <div className="store-buttons" aria-hidden="true">
          <span>Google Play</span>
          <span>App Store</span>
        </div>
      </div>
    </section>
  );
}

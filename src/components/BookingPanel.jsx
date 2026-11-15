import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  addBooking,
  buildNextDays,
  formatBookingDate,
} from "../utils/bookings";

const PERIODS = [
  { name: "Morning", slots: ["11:30 AM"] },
  {
    name: "Afternoon",
    slots: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
  },
  { name: "Evening", slots: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"] },
];

export default function BookingPanel({ restaurant }) {
  const days = useMemo(() => buildNextDays(7), []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastBooked, setLastBooked] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSlot = (time) => {
    const day = days[selectedIndex];
    const { added } = addBooking(restaurant, day.iso, time);
    setLastBooked({ iso: day.iso, time });
    setMessage(
      added
        ? {
            type: "success",
            text: `Booked for ${formatBookingDate(day.iso)} at ${time}.`,
          }
        : {
            type: "info",
            text: `You have already booked ${time} on ${formatBookingDate(
              day.iso
            )}.`,
          }
    );
  };

  return (
    <div className="booking-panel">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={8}
        slidesPerView={3}
        breakpoints={{
          520: { slidesPerView: 4 },
          760: { slidesPerView: 5 },
          980: { slidesPerView: 7 },
        }}
        className="day-swiper"
      >
        {days.map((day, index) => (
          <SwiperSlide key={day.iso}>
            <button
              type="button"
              className={`day-chip${index === selectedIndex ? " active" : ""}`}
              onClick={() => setSelectedIndex(index)}
            >
              <p className="day-label">{day.label}</p>
              <p className="day-date">{day.short}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="periods">
        {PERIODS.map((period) => (
          <div className="period" key={period.name}>
            <p className="period-name">{period.name}</p>
            <div className="slots">
              {period.slots.map((time) => {
                const isBooked =
                  lastBooked &&
                  lastBooked.iso === days[selectedIndex].iso &&
                  lastBooked.time === time;
                return (
                  <button
                    type="button"
                    key={time}
                    className={`slot${isBooked ? " slot-booked" : ""}`}
                    onClick={() => handleSlot(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className={`booking-message ${message.type}`} role="status">
          <span>{message.text}</span>{" "}
          <Link to="/my-bookings">View My Bookings</Link>
        </div>
      )}
    </div>
  );
}

const STORAGE_KEY = "bookings";

export function getBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function writeBookings(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    // storage unavailable; ignore
  }
}

// Saves one booking. Returns { added: false } if the same slot is already booked.
export function addBooking(restaurant, bookingDate, bookingTime) {
  const list = getBookings();
  const duplicate = list.some(
    (b) =>
      b.restaurantId === restaurant.id &&
      b.bookingDate === bookingDate &&
      b.bookingTime === bookingTime
  );
  if (duplicate) return { added: false };

  list.push({
    ...restaurant.raw,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    restaurantAddress: restaurant.address,
    restaurantCity: restaurant.city,
    restaurantState: restaurant.state,
    restaurantRating: restaurant.rating,
    bookingDate,
    bookingTime,
  });
  writeBookings(list);
  return { added: true };
}

// "2026-11-20" in the user's local time (not UTC).
export function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Today plus the next (count - 1) days: bookings are allowed up to a week ahead.
export function buildNextDays(count = 7) {
  const now = new Date();
  const days = [];
  for (let i = 0; i < count; i += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    let label;
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else label = date.toLocaleDateString("en-US", { weekday: "short" });
    days.push({
      iso: toIsoDate(date),
      label,
      short: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
    });
  }
  return days;
}

export function formatBookingDate(iso) {
  const [year, month, day] = String(iso).split("-").map(Number);
  if (!year || !month || !day) return String(iso);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

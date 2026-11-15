const BASE_URL = "https://restaurantdata.onrender.com";

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

function firstArray(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const found = Object.values(data).find(Array.isArray);
    if (found) return found;
  }
  return [];
}

function toStringList(data) {
  return firstArray(data)
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        return item.state || item.city || item.name || Object.values(item)[0];
      }
      return item == null ? "" : String(item);
    })
    .filter(Boolean);
}

// Lower-cases a key and drops spaces/underscores so "Restaurant Name",
// "restaurant_name" and "restaurantName" all become "restaurantname".
const simplify = (key) => String(key).toLowerCase().replace(/[^a-z]/g, "");

function pick(raw, candidates) {
  const lookup = {};
  Object.keys(raw).forEach((key) => {
    lookup[simplify(key)] = raw[key];
  });
  for (const candidate of candidates) {
    const value = lookup[candidate];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return "";
}

export function normalizeRestaurant(raw, index = 0) {
  const source = raw && typeof raw === "object" ? raw : {};
  const name = String(pick(source, ["restaurantname", "name"]));
  const address = String(pick(source, ["address"]));
  const city = String(pick(source, ["city"]));
  const state = String(pick(source, ["state"]));
  const rating = pick(source, ["overallrating", "rating"]);
  const id = String(
    pick(source, ["id", "_id"]) || `${name}-${address}-${index}`
  );
  return { id, name, address, city, state, rating, raw: source };
}

export function formatRating(rating) {
  if (rating === "" || rating === null || rating === undefined) return "N/A";
  const number = Number(rating);
  return Number.isNaN(number) ? String(rating) : number.toFixed(1);
}

export async function fetchStates() {
  return toStringList(await getJson(`${BASE_URL}/states`));
}

export async function fetchCities(state) {
  return toStringList(
    await getJson(`${BASE_URL}/cities/${encodeURIComponent(state)}`)
  );
}

export async function fetchRestaurants(state, city) {
  const data = await getJson(
    `${BASE_URL}/restaurants?state=${encodeURIComponent(
      state
    )}&city=${encodeURIComponent(city)}`
  );
  return firstArray(data).map((item, index) => normalizeRestaurant(item, index));
}

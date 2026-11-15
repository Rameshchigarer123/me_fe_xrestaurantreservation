import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import RestaurantCard from "../components/RestaurantCard";
import AppDownload from "../components/AppDownload";
import { fetchRestaurants } from "../utils/api";

export default function SearchResults() {
  const [params] = useSearchParams();
  const state = params.get("state") || "";
  const city = params.get("city") || "";

  const [status, setStatus] = useState("loading");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (!state || !city) {
      setStatus("idle");
      return undefined;
    }
    let cancelled = false;
    setStatus("loading");
    fetchRestaurants(state, city)
      .then((list) => {
        if (cancelled) return;
        setRestaurants(list);
        setStatus("done");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [state, city]);

  return (
    <div className="results-page">
      <div className="results-search">
        <SearchBox
          key={`${state}-${city}`}
          initialState={state}
          initialCity={city}
        />
      </div>

      <section className="results-body">
        <div className="results-list">
          {status === "idle" && (
            <p className="status-text">
              Select a state and city to find restaurants.
            </p>
          )}

          {status === "loading" && (
            <p className="status-text">
              Loading restaurants... the server can take up to a minute to wake
              up.
            </p>
          )}

          {status === "error" && (
            <p className="status-text error" role="alert">
              Something went wrong while loading restaurants. Please try again.
            </p>
          )}

          {status === "done" && (
            <>
              <h1 className="results-heading">
                {`${restaurants.length} restaurants available in ${city}`}
              </h1>
              <p className="results-sub">
                Book your table now. Reservations are free of charge.
              </p>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
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

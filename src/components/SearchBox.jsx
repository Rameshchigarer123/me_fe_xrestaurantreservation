import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { fetchCities, fetchStates } from "../utils/api";

export default function SearchBox({ initialState = "", initialCity = "" }) {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState(initialState);
  const [city, setCity] = useState(initialCity);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchStates()
      .then((list) => {
        if (cancelled) return;
        setStates(list);
        setLoadingStates(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Could not load states. Please refresh and try again.");
        setLoadingStates(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!state) {
      setCities([]);
      return undefined;
    }
    let cancelled = false;
    setLoadingCities(true);
    fetchCities(state)
      .then((list) => {
        if (cancelled) return;
        setCities(list);
        setLoadingCities(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Could not load cities. Please try again.");
        setLoadingCities(false);
      });
    return () => {
      cancelled = true;
    };
  }, [state]);

  const handleStateChange = (value) => {
    setState(value);
    setCity("");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!state || !city) {
      setError("Please select a state and a city.");
      return;
    }
    setError("");
    navigate(
      `/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className="search-fields">
        <Dropdown
          id="state"
          placeholder="State"
          options={states}
          value={state}
          onChange={handleStateChange}
          loading={loadingStates}
        />
        <Dropdown
          id="city"
          placeholder="City"
          options={cities}
          value={city}
          onChange={setCity}
          disabled={!state}
          loading={loadingCities}
        />
        <button type="submit" id="searchBtn" className="btn-primary">
          Search
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

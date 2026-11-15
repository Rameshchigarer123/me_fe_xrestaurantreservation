import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useInRouterContext,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MyBookings from "./pages/MyBookings";
import "./App.css";

// Only add a router if the app is not already wrapped in one.
function RouterShell({ children }) {
  const inRouter = useInRouterContext();
  return inRouter ? children : <BrowserRouter>{children}</BrowserRouter>;
}

export default function App() {
  return (
    <RouterShell>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </RouterShell>
  );
}

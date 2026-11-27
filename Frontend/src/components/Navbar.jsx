import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const { user } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleToyVerseClick = () => {
    window.location.reload();
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div onClick={handleToyVerseClick} className="nav-brand" style={{ cursor: 'pointer' }}>
          <span className="nav-brand-mark">T</span>
          <span>ToyVerse</span>
        </div>

        {/* Categories by Age */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/")}`}>
            Home
          </Link>
          <Link
            to="/category/0-2"
            className={`nav-link ${isActive("/category/0-2")}`}
          >
            0-2 Years
          </Link>
          <Link
            to="/category/3-5"
            className={`nav-link ${isActive("/category/3-5")}`}
          >
            3-5 Years
          </Link>
          <Link
            to="/category/6-8"
            className={`nav-link ${isActive("/category/6-8")}`}
          >
            6-8 Years
          </Link>
          <Link
            to="/category/9-plus"
            className={`nav-link ${isActive("/category/9-plus")}`}
          >
            9+ Years
          </Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>
            Contact
          </Link>
        </div>

        {/* Actions & Theme Switcher */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title="Toggle Theme"
            style={{ border: "none", outline: "none" }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <Link to="/wishlist" className="btn-icon" title="Wishlist">
            ♡
          </Link>

          <Link to="/cart" className="btn-icon badge-container" title="Cart">
            🛒
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </Link>
          <Link to="/profile" className="btn-icon" title="Profile">
            👤
          </Link>
        
          {user ? (
            <span>Welcome, {user?.userName?.charAt(0).toUpperCase() + user?.userName?.slice(1)} </span>
          ) : (
            <div>
            <Link to="/signin" className="btn btn-ghost btn-sm">
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
            Sign up
          </Link> </div>
          )}
          
        </div>
      </div>
    </nav>
  );
}
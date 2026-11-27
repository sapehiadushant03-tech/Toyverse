import { Link } from "react-router-dom";

const SOCIALS = [
  { icon: "𝕏", label: "Twitter" },
  { icon: "▷", label: "YouTube" },
  { icon: "⊙", label: "Instagram" },
];

export default function Footer() {
  const handleToyVerseClick = () => {
    window.location.reload();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand" onClick={handleToyVerseClick} style={{ cursor: 'pointer' }}>
              <span className="nav-brand-mark">T</span>
              <span>ToyVerse</span>
            </div>
            <p className="footer-brand-desc">
              Unlocking imagination, creativity, and STEM skills for kids across India. Premium, child-safe learning toys.
            </p>
            <div className="flex gap-3" style={{ marginTop: '1.5rem' }}>
              {SOCIALS.map(s => (
                <button key={s.label} className="btn-icon" style={{ fontSize: '1rem' }} title={s.label}>{s.icon}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Shop by Age</div>
            <Link to="/category/0-2" className="footer-link">0-2 Years</Link>
            <Link to="/category/3-5" className="footer-link">3-5 Years</Link>
            <Link to="/category/6-8" className="footer-link">6-8 Years</Link>
            <Link to="/category/9-plus" className="footer-link">9+ Years</Link>
          </div>
          <div>
            <div className="footer-col-title">About Us</div>
            <span className="footer-link">Our Story</span>
            <span className="footer-link">Pedagogy & Design</span>
            <span className="footer-link">Safety Protocols</span>
            <span className="footer-link">Parent Reviews</span>
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            <Link to="/contact" className="footer-link">Parent Helpdesk</Link>
            <Link to="/cart" className="footer-link">Track Gift Order</Link>
            <Link to="/contact" className="footer-link">Easy Replacements</Link>
            <Link to="/contact" className="footer-link">FAQ</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ToyVerse. All rights reserved.</span>
          <span>Crafted with ♥ for Curious Minds</span>
        </div>
      </div>
    </footer>
  );
}
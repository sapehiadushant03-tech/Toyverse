import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">Fresh drops for curious minds</div>
            <h1 className="hero-title">
              Big play.<br /><em>Brave ideas.</em>
            </h1>
            <p className="hero-subtitle">
              Toys chosen for imagination, movement and real learning — because play should never feel ordinary.
            </p>
            <div className="hero-cta">
              <a href="#categories" className="btn btn-primary btn-lg">Shop all toys →</a>
              <Link to="/category/9-plus" className="btn btn-lg">Explore STEM</Link>
            </div>
            <div className="hero-proof">
              <div className="proof-stat"><strong>10K+</strong><span>playful finds</span></div>
              <div className="proof-stat"><strong>4.9★</strong><span>parent loved</span></div>
              <div className="proof-stat"><strong>100%</strong><span>kid safe</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-blob">
              <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=85" alt="Colorful children's toys" />
            </div>
            <div className="hero-card hero-card-one"><strong>Build & imagine</strong><span>Creative play / ages 3–8</span></div>
            <div className="hero-card hero-card-two"><strong>New in!</strong><span>Summer collection</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productServices";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isSaved } = useWishlist();

  useEffect(() => {
    setNotFound(false);
    getProductById(id)
      .then((response) => setProduct({
        ...response.data.data,
        id: response.data.data._id,
        description: response.data.data.description || response.data.data.desc,
        images: response.data.data.images?.length ? response.data.data.images : [response.data.data.image],
        originalPrice: response.data.data.originalPrice || Math.round(response.data.data.price * 1.2),
        features: response.data.data.features?.length ? response.data.data.features : ["Child-safe design", "Development expert approved"],
        rating: response.data.data.rating || 4.8,
        reviews: response.data.data.reviews || 0,
      }))
      .catch((error) => {
        if (error.response?.status === 404) setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper container"><h1>Product not found</h1></div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper container"><p className="text-muted">Loading product...</p></div>
        <Footer />
      </>
    );
  }

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.floor(product.rating) ? "★" : "☆"
  );

  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <div className="product-detail-grid anim-fadein-up">
          {/* Gallery */}
          <div>
            <img src={product.images[activeImg]} alt={product.name} className="detail-img" />
            <div className="detail-thumbs">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className={`detail-thumb ${activeImg === i ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="anim-fadein-up delay-1">
            <div className="detail-badge">● Child Safe EN71 Certified</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: '#f97316', fontSize: '1rem', letterSpacing: '0.05em' }}>{stars.join('')}</span>
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="detail-price">₹{product.price.toLocaleString('en-IN')}</div>
              <span style={{ color: 'var(--color-text-muted)', textDecoration: 'line-through', fontSize: '1rem' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>
                {product.originalPrice > 0 ? Math.round((1 - (product.price || 0) / product.originalPrice) * 100) : 0}% OFF
              </span>
            </div>

            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '2rem' }}>{product.description}</p>

            {/* Features */}
            <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
              {product.features.map(f => (
                <span key={f} className="feature-chip">{f}</span>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => addToCart({ ...product, id: Number(id) || product.name }, qty)}>
                Add to Cart
              </button>
              <button className="btn-icon" title={isSaved(product.id) ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(product)}>
                {isSaved(product.id) ? "♥" : "♡"}
              </button>
            </div>
            <button className="btn btn-ghost w-full">Buy Now — Instant Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
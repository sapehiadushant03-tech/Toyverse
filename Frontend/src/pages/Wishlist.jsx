import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { addToCart } = useCart();
  const { items, toggleWishlist } = useWishlist();
  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <div className="anim-fadein-up" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 800 }}>Saved Toys</h1>
          <p className="text-muted">Toys saved for birthday or holiday gifts</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-4 gap-6 anim-fadein-up">
            {items.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={() => addToCart(p, 1)}
                onAddToWishlist={() => toggleWishlist(p)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state glass-card">
            <div className="empty-state-icon">🧸</div>
            <h2 style={{ marginBottom: '0.75rem' }}>Your toy list is empty</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>Browse the shop to save toys here.</p>
            <a href="/category/6-8" className="btn btn-primary">Start Browsing →</a>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
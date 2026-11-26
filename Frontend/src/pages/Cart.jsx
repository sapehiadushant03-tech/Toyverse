import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <div className="anim-fadein-up" style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 800 }}>Your Toy Box (Cart)</h1>
          <p className="text-muted">{items.length} custom toys inside</p>
        </div>

        <div className="cart-grid">
          {/* Items */}
          <div className="flex flex-col gap-4 anim-fadein-up">
            {items.length === 0 ? (
              <div className="cart-item" style={{ justifyContent: 'center', textAlign: 'center' }}>
                <div>
                  <div className="cart-item-name">Your cart is empty</div>
                  <div className="text-muted" style={{ marginTop: '0.5rem' }}>Add a few toys and they will appear here instantly.</div>
                </div>
              </div>
            ) : items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div style={{ flex: 1 }}>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>Quantity: {item.quantity}</div>
                  <div className="cart-item-price">₹{((item.price || 0) * (item.quantity || 0)).toLocaleString('en-IN')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }} onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="anim-fadein-up delay-2">
            <div className="order-summary">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{(subtotal || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Eco Shipping</span>
                <span style={{ color: shipping === 0 ? '#10b981' : 'inherit' }}>
                  {shipping === 0 ? 'Free ✓' : `₹${shipping}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax (18% GST)</span>
                <span>₹{Math.round((subtotal || 0) * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="divider"></div>
              <div className="summary-total">
                <span>Total</span>
                <span className="summary-total-price">₹{((total || 0) + Math.round((subtotal || 0) * 0.18)).toLocaleString('en-IN')}</span>
              </div>

              <div style={{ padding: '1.25rem 0', marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <div className="flex gap-2">
                    <input type="text" className="form-input" placeholder="Promo code" />
                    <button className="btn btn-ghost">Apply</button>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary w-full btn-lg">
                Proceed to Checkout →
              </button>
              <p className="text-muted text-center" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
                🔒 Secure 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
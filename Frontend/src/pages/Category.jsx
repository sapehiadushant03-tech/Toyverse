import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductsWithoutAuth } from "../services/productServices";
import { useWishlist } from "../context/WishlistContext";

const AGE_INFO = {
  "0-2": { name: "Infants & Toddlers", desc: "Sensory stimuli, soft textures, and basic motor skill development toys." },
  "3-5": { name: "Preschool Explorers", desc: "Creative roleplay, interactive alphabet charts, and vibrant magnetic building blocks." },
  "6-8": { name: "Young Logic Builders", desc: "Beginner electronics kits, gravity wooden mazes, and logical reasoning games." },
  "9-plus": { name: "Advanced Innovators", desc: "Complex mechanics, robotics kits, solar system scale projects, and coding guides." }
};

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function Category() {
  const { id } = useParams();
  const [sort, setSort] = useState("Featured");
  const { addToCart } = useCart();
  
  const { toggleWishlist } = useWishlist();
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentKey = AGE_INFO[id] ? id : "0-2";
  const info = AGE_INFO[currentKey];
  useEffect(() => {
    setLoading(true);
    getProductsWithoutAuth(currentKey)
      .then((response) => setToys((response.data.data || []).map((product) => ({ ...product, id: product._id, description: product.description || product.desc }))))
      .catch(() => setToys([]))
      .finally(() => setLoading(false));
  }, [currentKey]);

  let sortedToys = [...toys];

  if (sort === "Price: Low to High") {
    sortedToys.sort((a, b) => a.price - b.price);
  } else if (sort === "Price: High to Low") {
    sortedToys.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(236, 72, 153, 0.08))', borderBottom: '1px solid var(--color-border)', padding: '3.5rem 0', marginBottom: '3rem' }}>
          <div className="container">
            <p className="section-eyebrow anim-fadein-up" style={{ marginBottom: '0.5rem' }}>✦ Age Category</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.75rem', fontWeight: 800 }} className="anim-fadein-up delay-1">
              Toys for {id === "9-plus" ? "9+ Years" : `${id} Years`}
            </h1>
            <p className="text-muted anim-fadein-up delay-2" style={{ marginTop: '0.5rem' }}>{info.desc}</p>
          </div>
        </div>

        <div className="container">
          {/* Toolbar */}
          <div className="flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>{sortedToys.length} exclusive toys found</div>
            <div className="flex items-center gap-3">
              <span className="text-muted" style={{ fontSize: '0.875rem' }}>Sort by:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="form-input"
                style={{ width: 'auto', padding: '0.5rem 1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-main)' }}
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-6 anim-fadein-up">
            {loading ? (
              <div className="text-muted">Loading toys...</div>
            ) : sortedToys.map(p => (
              <ProductCard 
                key={p.id} 
                product={p}
                onAddToCart={() => addToCart(p, 1)}
                onAddToWishlist={() => toggleWishlist(p)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const TOY_CATEGORIES = [
  { id:"0-2", name:"Little Explorers", count:"1,200", image:"https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=700&q=85" },
  { id:"3-5", name:"Big Imaginations", count:"3,400", image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=85" },
  { id:"6-8", name:"Builders Club", count:"2,900", image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85" },
  { id:"9-plus", name:"Future Makers", count:"1,800", image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=85" }
];

const TRENDING_TOYS = [
  { id:1,name:"RoboCoder STEM Kit",description:"Build, code and bring a smart robot to life.",price:4999,badge:"Bestseller",image:"https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=700&q=85" },
  { id:2,name:"Magnetic Dream Castle",description:"A 60-piece set for wildly colourful creations.",price:3299,badge:"New",image:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=85" },
  { id:3,name:"Wooden Marble Run",description:"Gravity-powered, hands-on engineering.",price:2499,image:"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=85" },
  { id:4,name:"Solar System Lab",description:"Paint, build and explore our cosmic neighbours.",price:1899,image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=85" }
];

const SAFETY_PROMISES = [
  {icon:"◉",title:"Safe by design",sub:"Tested & certified"},
  {icon:"＋",title:"Learning-led",sub:"Expert developed"},
  {icon:"↻",title:"Easy returns",sub:"30-day window"},
  {icon:"♧",title:"Planet aware",sub:"Low-waste picks"}
];

export default function Home() {
  const { addToCart } = useCart();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="marquee" aria-label="Store highlights">
          <div className="marquee-track">
            {[1,2].map(set => (
              <span key={set}>Free delivery over ₹999 ✦ New weekly drops ✦ Expert-picked toys ✦ 30-day returns ✦</span>
            ))}
          </div>
        </div>

        <section className="container" style={{paddingTop:"40px"}}>
          <div className="trust-bar">
            {SAFETY_PROMISES.map(p => (
              <div className="trust-item" key={p.title}>
                <div className="trust-icon">{p.icon}</div>
                <div><div className="trust-title">{p.title}</div><div className="trust-sub">{p.sub}</div></div>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" className="section container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Find their world</div>
              <h2 className="section-title">Shop by age.</h2>
              <p className="section-subtitle">Every stage brings a new kind of wonder. Start with the right kind of play.</p>
            </div>
            <a href="/category/9-plus" className="btn">View all →</a>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {TOY_CATEGORIES.map(c => <CategoryCard key={c.id} category={c}/>)}
          </div>
        </section>

        <section className="section container" style={{paddingTop:"20px"}}>
          <div className="section-header">
            <div><div className="section-eyebrow">Most wanted</div><h2 className="section-title">The play list.</h2></div>
            <a href="/category/9-plus" className="btn btn-ghost">Explore collection →</a>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {TRENDING_TOYS.map(toy => (
              <ProductCard key={toy.id} product={toy} onAddToCart={() => addToCart(toy,1)} onAddToWishlist={() => alert(`Added ${toy.name} to wishlist!`)}/>
            ))}
          </div>
        </section>

        <section className="container" style={{padding:"20px 0 86px"}}>
          <div className="promo">
            <div className="promo-copy">
              <div className="promo-kicker">First-play offer</div>
              <h2>Make room for wonder.</h2>
              <p>Take 20% off your first educational toy with code <strong>PLAY20</strong>.</p>
              <a href="/signup" className="btn btn-primary" style={{width:"fit-content"}}>Claim the offer →</a>
            </div>
            <div className="promo-art" aria-label="20 percent discount"></div>
          </div>
        </section>

        <section className="container" style={{paddingBottom:"86px"}}>
          <div className="newsletter-section">
            <div className="section-eyebrow">The ToyVerse list</div>
            <h2 className="section-title">Good play, delivered.</h2>
            <p className="text-muted" style={{marginTop:"12px"}}>Fresh finds, play ideas and members-only drops.</p>
            <div className="newsletter-input-group">
              <input type="email" className="form-input" placeholder="Email address" />
              <button className="btn btn-dark">Join the list</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

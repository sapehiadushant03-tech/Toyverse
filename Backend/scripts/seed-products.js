import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { Product } from "../api/models/product.Schema.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const products = [
  ["1","Sensory Elephant Plush","BPA-free organic cotton plush toy with sensory textures.","0-2",999,1199,"Eco Friendly","https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=700&q=85"],
  ["2","Wooden Rainbow Stacker","Natural wooden stacking rings with child-safe finishes.","0-2",1299,1599,"Organic","https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=700&q=85"],
  ["3","Musical Infant Playgym","A soft developmental gym with touch-activated piano play.","0-2",3499,3999,"Best for Discovery","https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=85"],
  ["4","Organic Cotton Grip Teether","Soft hand-crocheted teether for soothing little gums.","0-2",599,799,"Eco Friendly","https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=85"],
  ["5","3D Magnetic Dream Castle","A 60-piece magnetic building set for creative play.","3-5",3299,3999,"Trending","https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=85"],
  ["6","Classic Chef Wooden Kitchen","A pretend kitchen with realistic dials and utensil play.","3-5",5999,6999,"Popular","https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=85"],
  ["7","Phonics Alphabet Interactive Board","An interactive chart for letters, spelling and sounds.","3-5",1599,1999,"Learning","https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=700&q=85"],
  ["8","Organic Modeling Dough Set","Wheat-free, food-grade modeling dough for sensory play.","3-5",899,1099,"New","https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85"],
  ["9","Vintage Wooden Marble Run","A gravity-powered maze for logical reasoning play.","6-8",2499,2999,"STEM","https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=85"],
  ["10","Kids' Snap Circuit Explorer","Build working alarms, radios and light displays safely.","6-8",1999,2499,"STEM","https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=700&q=85"],
  ["11","Kinetic Moving Sand","Hydrophobic modeling sand that flows like liquid magic.","6-8",1499,1799,"Sensory","https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85"],
  ["12","Programmable Smart Car","A beginner-friendly robot car for hands-on coding concepts.","6-8",4499,4999,"Coding","https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=85"],
  ["13","RoboCoder STEM Robot Kit","Build and program a smart robot with obstacle detection.","9-plus",4999,5999,"Bestseller","https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=700&q=85"],
  ["14","SkyExplorer Solar System Kit","Paint, build and animate an electronic solar system.","9-plus",1899,2499,"Science","https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=85"],
  ["15","Technic Mechanical Rally Buggy","An advanced mechanical build with working steering.","9-plus",7999,8999,"Advanced","https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=700&q=85"],
  ["16","Hydraulic Robotic Arm","A fluid-powered robotic arm build with no batteries.","9-plus",3999,4499,"Engineering","https://images.unsplash.com/photo-1617791160505-6f006e121980?auto=format&fit=crop&w=700&q=85"],
];

const seed = async () => {
  if (!process.env.MONGO_URL) throw new Error("MONGO_URL is required");
  await mongoose.connect(process.env.MONGO_URL);
  await Product.deleteMany({});

  const documents = products.map(([id, name, description, category, price, originalPrice, badge, image]) => ({
    name,
    desc: description,
    description,
    category,
    price,
    originalPrice,
    badge,
    image,
    images: [image],
    features: ["Child-safe design", "Development expert approved", "Premium materials"],
    rating: 4.8,
    reviews: 320,
  }));

  await Product.insertMany(documents);
  console.log(`Seeded ${documents.length} ToyVerse products`);
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});

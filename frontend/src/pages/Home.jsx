import Benefits from "../components/Benefits";
import ProductCategory from "../components/ProductCategory";
import News from "../components/News";
import Slider from "../components/Slider";
import RingProduct from "../components/RingProduct";
import BraceletProduct from "../components/BraceletProduct";
import NecklaceProduct from "../components/NecklaceProduct";
import EarringProduct from "../components/EarringProduct";
export default function Home() {
  return (
    <div className="relative">
      <Slider />
      <Benefits />
      <ProductCategory />
      <RingProduct />
      <BraceletProduct />
      <NecklaceProduct />
      <EarringProduct />
      <News />
    </div>
  );
}

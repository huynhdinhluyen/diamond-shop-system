import Benefits from "../components/Benefits";
import ProductCategory from "../components/ProductCategory";
import ProductList from "../components/ProductList";
import News from "../components/News";
import Slider from "../components/Slider";
export default function Home() {
  return (
    <div className="relative">
      <Slider />
      <Benefits />
      <ProductCategory />
      <ProductList />
      <News />
    </div>
  );
}

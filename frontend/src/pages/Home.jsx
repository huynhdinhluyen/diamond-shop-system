import Benefits from "../components/Benefits";
import ProductCategory from "../components/ProductCategory";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";
export default function Home() {
  return (
    <div>
      <Slider />
      <Benefits />
      <ProductCategory />
      <ProductList />
    </div>
  );
}

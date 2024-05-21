import Banner from "../components/Banner";
import Benefits from "../components/Benefits";
import ProductCategory from "../components/ProductCategory";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <Banner />
      <Benefits />
      <ProductCategory />
      <ProductList />
    </div>
  );
}

import { useState, useEffect } from "react";
import { CircularProgress, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import { getProducts } from "../service/productService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(4); // Số lượng sản phẩm hiển thị ban đầu

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4); // Tăng số lượng sản phẩm hiển thị
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-center mb-4">
        <div className="w-96 border-t border-gray-300"></div>
        <h1 className="text-2xl text-center font-bold mb-4 mx-8 text-nowrap text-accent">
          SẢN PHẨM NỔI BẬT
        </h1>
        <div className="w-96 border-t border-gray-300"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {visibleProducts < products.length && (
            <div className="flex justify-center mt-8">
              <Button
                variant="contained"
                color="primary"
                onClick={loadMoreProducts}
              >
                Xem thêm
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;

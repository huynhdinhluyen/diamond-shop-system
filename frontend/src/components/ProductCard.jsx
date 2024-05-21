import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
    >
      <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-2 flex justify-between p-4">
          <div>
            <h3 className="text-lg text-gray-900 font-medium tracking-tight">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-lg font-semibold text-red-500">
              {product.salePrice.toLocaleString("vi-VN")} VNĐ
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    salePrice: PropTypes.number.isRequired,
    diamondCasing: PropTypes.shape({
      material: PropTypes.string.isRequired,
      size: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }), // Make diamondCasing optional
  }).isRequired,
};

export default ProductCard;

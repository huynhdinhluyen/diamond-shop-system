/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Price from "../components/Price"

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="w-full max-w-sm mx-auto rounded-lg shadow-md overflow-hidden"
    >
      <div key={product.id} className="group relative text-center p-3 rounded-2xl border-2 border-gray-50 hover:border hover:border-accent transition duration-300 ease-in-out">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl group-hover:scale-105 lg:aspect-none lg:h-96 transform transition duration-300 ease-in-out">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-2 flex justify-between p-4">
          <div>
            <h3 className="text-lg text-gray-900 font-medium tracking-tight mb-5">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <div className="mt-1 text-lg font-semibold text-red-500">
              {product.discountPrice > 0 ?
                <div className="flex gap-x-10">
                  <Price price={product.discountPrice} />
                  <div className="text-gray-500 text-[14px] line-through">
                    <Price price={product.salePrice} />
                  </div>
                </div>
                : <Price price={product.salePrice} />}
            </div>
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
    }),
  }).isRequired,
};

export default ProductCard;

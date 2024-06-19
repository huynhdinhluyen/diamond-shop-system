/* eslint-disable react/prop-types */
import RingProduct from "./RingProduct";
import BraceletProduct from "./BraceletProduct"
import EarringProduct from "./EarringProduct"

const SimilarProduct = ({ category }) => {
    switch (category.toLowerCase()) {
        case 'nhẫn':
            return <RingProduct />;
        case 'vòng tay':
            return <BraceletProduct />;
        case 'bông tai':
            return <EarringProduct />;
        // Thêm các case cho các category khác tương tự như vậy
        default:
            return null;
    }
}

export default SimilarProduct;

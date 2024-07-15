/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { CircularProgress, Button, TextField } from "@mui/material";
import ProductCard from "./ProductCard";
import { getProducts } from "../service/productService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
};

function RingProduct() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const filteredProducts = products.filter((product) =>
        product.category.name.toLowerCase().includes("Nhẫn".toLowerCase())
    );

    const categoryId = filteredProducts.length > 0 ? filteredProducts[0].category.id : null;
    const categoryName = filteredProducts.length > 0 ? filteredProducts[0].category.name : null;

    return (
        <div className="container mx-auto mt-8">
            <img src="https://cdn-media.glamira.com/media/catalog/category/product_image_top_banner_plain_rings_uk.jpg" alt="" className="w-full lg:h-96 h-auto object-cover" />
            <div className="flex items-center justify-between my-4 text-center">
                <h1 className="text-xl text-center font-bold text-nowrap text-accent mx-auto">
                    {categoryName}
                </h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <div className="slider-container">
                    <Slider {...settings}>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="p-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Slider>
                    <div className="text-center mt-3">
                        <Link to={`/products?category=${categoryId}`} className="border-2 py-2 px-3 hover:text-accent transition-all duration-200">Xem thêm</Link>
                    </div>
                </div>
            )}

        </div>
    );
}

export default RingProduct;

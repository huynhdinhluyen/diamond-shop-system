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
                slidesToShow: 1,
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

    // Filter products based on the keyword
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes("nhẫn".toLowerCase())
    );
    const categoryId = filteredProducts.length > 0 ? filteredProducts[0].category.id : null;
    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center justify-between mb-4 mx-2">
                <h1 className="text-xl text-center font-bold text-nowrap text-accent">
                    NHẪN
                </h1>
                <Link to={`/products?category=${categoryId}`} className="underline hover:text-accent transition-all duration-200">Xem thêm</Link>
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
                </div>
            )}
        </div>
    );
}

export default RingProduct;

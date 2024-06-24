import { useEffect, useState } from "react";
import { CircularProgress, Typography, Grow } from "@mui/material";
import { getCategories } from "../service/categoryService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        setTimeout(() => {
          setShow(true);
        }, 500);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container mx-auto my-8">
      <div className="flex items-center justify-center mb-4">
        <div className="w-96 border-t border-gray-300"></div>
        <h1 className="text-2xl text-center font-bold mb-4 mx-8 text-nowrap text-accent">
          DANH MỤC SẢN PHẨM
        </h1>
        <div className="w-96 border-t border-gray-300"></div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : categories.length === 0 ? (
          <Typography variant="body1">Không có danh mục sản phẩm</Typography>
        ) : (
          <div className="flex justify-around">
            {categories.map((category) => (
              <Grow in={show} timeout={1500} key={category.id}>
                <div className="flex justify-center">
                  <Link to={`/products?category=${category.id}`} className="text-center">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-44 h-44 object-cover rounded-full transition-transform duration-300 hover:scale-105 mx-auto"
                    />
                    <p className="mt-4 text-md font-semibold">{category.name}</p>
                  </Link>
                </div>
              </Grow>
            ))
            }
          </div>
        )}
      </div>
    </div>
  );
}

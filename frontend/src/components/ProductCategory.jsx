import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Grow } from "@mui/material";
import { getCategories } from "../api/api";
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
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
        {isLoading ? (
          <div className="flex flex-1">
            <div className="mx-auto">
              <CircularProgress />
            </div>
          </div>
        ) : categories.length === 0 ? (
          <Typography variant="body1">Không có danh mục sản phẩm</Typography>
        ) : (
          categories.map((category) => (
            <Grow in={show} timeout={1500} key={category.id}>
              <Box className="flex flex-col items-center mx-8">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-52 h-52 mr-2 rounded-full transition-transform duration-300 hover:scale-105"
                />
                <Typography
                  variant="body1"
                  component={Link}
                  to={`/categories/${category.name}`}
                  className="!text-xl"
                >
                  {category.name}
                </Typography>
              </Box>
            </Grow>
          ))
        )}
      </div>
    </div>
  );
}

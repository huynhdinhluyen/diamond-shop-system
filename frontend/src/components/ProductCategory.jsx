import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Grow } from "@mui/material";
import { getCategories } from "../api/api";
import { Link } from "react-router-dom";

export default function ProductCategory() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    return <div>Error loading categories: {error.message}</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
      {categories.map((category) => (
        <Grow in={true} timeout={1000} key={category.id}>
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
      ))}
    </div>
  );
}

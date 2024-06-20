import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { getProductsByCategory, getProducts } from "../service/productService";
import { getCategories } from "../service/categoryService";
import ProductCard from "../components/ProductCard";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const query = useQuery();
    const categoryId = query.get("category");
    const searchQuery = query.get("query");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                const categoriesWithCounts = await Promise.all(categoriesData.map(async (category) => {
                    const products = await getProductsByCategory(category.id);
                    return { ...category, productCount: products.length };
                }));
                setCategories(categoriesWithCounts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let data;
                if (searchQuery) {
                    data = await getProducts();
                    data = data.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
                } else {
                    data = categoryId ? await getProductsByCategory(categoryId) : await getProducts();
                }
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, searchQuery]);

    const handleCategoryClick = (id) => {
        navigate(`/products?category=${id}`);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-center mb-8">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="mx-2 border px-3 py-1 "
                    >
                        <div className="flex justify-center items-center gap-x-2">
                            <img src={category.imageUrl} className="w-8 h-8 object-cover" />
                            {category.name} ({category.productCount})
                        </div>
                    </button>
                ))}
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : products.length === 0 ? (
                <Typography variant="body1">Không có sản phẩm</Typography>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="my-3">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

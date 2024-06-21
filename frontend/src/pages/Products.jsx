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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState("Tất cả sản phẩm");
    const [totalProductCount, setTotalProductCount] = useState(0);
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
                setSelectedCategory(categoryId);

                // Tính tổng số lượng sản phẩm
                const totalCount = await getProducts();
                setTotalProductCount(totalCount.length);

                // Thiết lập tên category đã chọn
                if (categoryId) {
                    const category = categories.find(cat => cat.id === parseInt(categoryId));
                    setSelectedCategoryName(category ? category.name : "Tất cả sản phẩm");
                } else {
                    setSelectedCategoryName("Tất cả sản phẩm");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, searchQuery, categories]);

    const handleCategoryClick = (id, name) => {
        setSelectedCategory(id);
        setSelectedCategoryName(name);
        navigate(`/products?category=${id}`);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-between">
                <div className="w-1/4">
                    <div className="flex flex-col mt-16 mr-3">
                        <h3 className="h4 mb-2 text-accent mx-auto">DANH MỤC SẢN PHẨM</h3>
                        <button
                            onClick={() => handleCategoryClick(null, "Tất cả sản phẩm")}
                            className={`my-2 border px-3 py-1 ${selectedCategory === null ? 'border-accent' : 'border-gray-300'}`}
                        >
                            <div className="flex items-center gap-x-2">
                                <span className="font-semibold text-lg">Tất cả sản phẩm</span>
                                <span>({totalProductCount})</span>
                            </div>
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id, category.name)}
                                className={`my-2 border px-3 py-1 ${selectedCategory === category.id ? 'border-accent' : 'border-gray-300'}`}
                            >
                                <div className="flex items-center gap-x-2">
                                    <img src={category.imageUrl} className="w-8 h-8 object-cover" />
                                    <div className="font-semibold text-lg">
                                        {category.name} ({category.productCount})
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-3/4">
                    <h3 className="text-2xl font-bold mb-4 text-accent uppercase text-center">{selectedCategoryName}</h3>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <CircularProgress />
                        </div>
                    ) : products.length === 0 ? (
                        <Typography variant="body1">Không có sản phẩm</Typography>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="my-3">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

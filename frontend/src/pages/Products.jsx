import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const query = useQuery();
    const categoryId = query.get("category");
    const searchQuery = query.get("query");
    const priceRangeQuery = query.get("priceRange");
    const navigate = useNavigate();

    const priceRanges = [
        { label: "Dưới 10 triệu", value: "0-10000000" },
        { label: "10 triệu - 30 triệu", value: "10000000-30000000" },
        { label: "30 triệu - 50 triệu", value: "30000000-50000000" },
        { label: "Trên 50 triệu", value: "50000000-1000000000" },
    ];

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
                let data = await getProducts();
                if (categoryId) {
                    data = data.filter(product => product.category.id === parseInt(categoryId));
                }
                if (searchQuery) {
                    data = data.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
                }
                setProducts(data);
                setFilteredProducts(data); // Initially, all products are shown
                setSelectedCategory(categoryId);

                // Tính tổng số lượng sản phẩm
                setTotalProductCount(data.length);

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

    useEffect(() => {
        if (priceRangeQuery) {
            const [minPrice, maxPrice] = priceRangeQuery.split('-').map(Number);
            const filtered = products.filter(product => {
                const price = product.salePrice;
                return (!isNaN(minPrice) ? price >= minPrice : true) && (isNaN(maxPrice) ? true : price <= maxPrice);
            });
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Show all products if no price range is selected
        }
    }, [priceRangeQuery, products]);

    const handleCategoryClick = (id, name) => {
        setSelectedCategory(id);
        setSelectedCategoryName(name);
        navigate(`/products?category=${id}${priceRangeQuery ? `&priceRange=${priceRangeQuery}` : ""}${searchQuery ? `&query=${searchQuery}` : ""}`);
    };

    const handlePriceRangeClick = (range) => {
        setSelectedPriceRange(range);
        navigate(`/products?priceRange=${range}${categoryId ? `&category=${categoryId}` : ""}${searchQuery ? `&query=${searchQuery}` : ""}`);
    };

    return (
        <div className="container mx-auto my-8">
            <div className="flex justify-between">
                <div className="w-1/4">
                    <div className="flex flex-col mt-16 mr-3">
                        <h3 className="h4 mb-2 text-accent mx-auto">DANH MỤC SẢN PHẨM</h3>
                        <Link
                            to="/products"
                            className={`my-2 border px-3 py-1 ${selectedCategory === null ? 'border-accent' : 'border-gray-300'}`}
                        >
                            <div className="flex items-center gap-x-2">
                                <span className="font-normal text-md">Tất cả sản phẩm</span>
                                <span>({totalProductCount})</span>
                            </div>
                        </Link>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id, category.name)}
                                className={`my-2 border px-3 py-1 ${selectedCategory === category.id ? 'border-accent' : 'border-gray-300'}`}
                            >
                                <div className="flex items-center gap-x-2">
                                    <img src={category.imageUrl} className="w-8 h-8 object-cover" alt={category.name} />
                                    <div className="font-normal text-md">
                                        {category.name} ({category.productCount})
                                    </div>
                                </div>
                            </button>
                        ))}
                        <h3 className="h4 mb-2 text-accent mx-auto mt-8">KHOẢNG GIÁ</h3>
                        {priceRanges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => handlePriceRangeClick(range.value)}
                                className={`my-2 border px-3 py-1 ${selectedPriceRange === range.value ? 'border-accent' : 'border-gray-300'}`}
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="font-normal text-md">{range.label}</span>
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
                    ) : filteredProducts.length === 0 ? (
                        <Typography variant="body1">Không có sản phẩm</Typography>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {filteredProducts.map((product) => (
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

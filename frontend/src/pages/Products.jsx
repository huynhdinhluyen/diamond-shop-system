/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductsByCategory, getProducts } from "../service/productService";
import { getCategories } from "../service/categoryService";
import ProductCard from "../components/ProductCard";
import { CircularProgress, Typography } from "@mui/material";
import Pagination from "../components/Pagination";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState("Tất cả sản phẩm");
    const [totalProductCount, setTotalProductCount] = useState(0);
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCaratWeight, setSelectedCaratWeight] = useState('');
    const [selectedCut, setSelectedCut] = useState('');
    const [selectedClarity, setSelectedClarity] = useState('');
    const [selectedDiamondCasingMaterial, setSelectedDiamondCasingMaterial] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 20;
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstPost = indexOfLastProduct - productPerPage;
    const totalProducts = totalProductCount;
    const currentProducts = filteredProducts.slice(indexOfFirstPost, indexOfLastProduct);
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

    const colors = ["D", "E", "F", "G", "H"];
    const caratWeights = ["0.5", "0.75", "1", "1.25", "1.5", "1.75", "2", "2.25", "2.5", "2.75", "3", "3.5", "4.0", "4.5", "5.0"];
    const cuts = ["Tuyệt hảo (Excellent)", "Rất tốt (Very Good)", "Tốt (Good)"];
    const clarities = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
    const materials = ["Vàng trắng 10K", "Vàng trắng 14K", "Vàng trắng 18K", "Vàng vàng 14K", "Vàng vàng 18K", "Bạc", "Bạch kim"];

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
                setSelectedCategory(categoryId || '');

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
            setSelectedPriceRange(priceRangeQuery);
        } else {
            setFilteredProducts(products); // Show all products if no price range is selected
            setSelectedPriceRange('');
        }
    }, [priceRangeQuery, products]);

    useEffect(() => {
        let filtered = products;

        if (priceRangeQuery) {
            const [minPrice, maxPrice] = priceRangeQuery.split('-').map(Number);
            filtered = filtered.filter(product => {
                const price = product.salePrice;
                return (!isNaN(minPrice) ? price >= minPrice : true) && (isNaN(maxPrice) ? true : price <= maxPrice);
            });
        }

        if (selectedColor) {
            filtered = filtered.filter(product => product.mainDiamond.color === selectedColor);
        }

        if (selectedCaratWeight) {
            filtered = filtered.filter(product => product.mainDiamond.caratWeight === parseFloat(selectedCaratWeight));
        }

        if (selectedCut) {
            filtered = filtered.filter(product => product.mainDiamond.cutType === selectedCut);
        }

        if (selectedClarity) {
            filtered = filtered.filter(product => product.mainDiamond.clarity === selectedClarity);
        }

        if (selectedDiamondCasingMaterial) {
            filtered = filtered.filter(product => product.diamondCasing.material === selectedDiamondCasingMaterial);
        }

        setFilteredProducts(filtered);
    }, [priceRangeQuery, selectedColor, selectedCaratWeight, selectedCut, selectedClarity, products, selectedDiamondCasingMaterial]);


    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
        navigate(`/products?category=${selectedCategoryId}${priceRangeQuery ? `&priceRange=${priceRangeQuery}` : ""}${searchQuery ? `&query=${searchQuery}` : ""}`);
    };

    const handlePriceRangeChange = (event) => {
        const selectedPriceRange = event.target.value;
        setSelectedPriceRange(selectedPriceRange);
        navigate(`/products?priceRange=${selectedPriceRange}${categoryId ? `&category=${categoryId}` : ""}${searchQuery ? `&query=${searchQuery}` : ""}`);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleCaratWeightChange = (event) => {
        setSelectedCaratWeight(event.target.value);
    };

    const handleCutChange = (event) => {
        setSelectedCut(event.target.value);
    };

    const handleClarityChange = (event) => {
        setSelectedClarity(event.target.value);
    };

    const handleDiamondCasingMaterialChange = (event) => {
        setSelectedDiamondCasingMaterial(event.target.value);
    }

    return (
        <div className="container mx-auto lg:my-8">
            <div className="flex flex-wrap lg:mt-10 mb-10 mr-3 gap-x-3 items-center justify-center">
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Loại trang sức</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name} ({category.productCount})
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-accent"
                    value={selectedPriceRange}
                    onChange={handlePriceRangeChange}
                >
                    <option value="">Giá</option>
                    {priceRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                            {range.label}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedColor}
                    onChange={handleColorChange}
                >
                    <option value="">Màu</option>
                    {colors.map((color) => (
                        <option key={color} value={color}>
                            {color}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedCaratWeight}
                    onChange={handleCaratWeightChange}
                >
                    <option value="">Trọng lượng</option>
                    {caratWeights.map((caratWeight) => (
                        <option key={caratWeight} value={caratWeight}>
                            {caratWeight}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedCut}
                    onChange={handleCutChange}
                >
                    <option value="">Giác cắt</option>
                    {cuts.map((cut) => (
                        <option key={cut} value={cut}>
                            {cut}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedClarity}
                    onChange={handleClarityChange}
                >
                    <option value="">Độ trong suốt</option>
                    {clarities.map((clarity) => (
                        <option key={clarity} value={clarity}>
                            {clarity}
                        </option>
                    ))}
                </select>
                <select
                    className="block w-full sm:w-64 md:w-52 mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedDiamondCasingMaterial}
                    onChange={handleDiamondCasingMaterialChange}
                >
                    <option value="">Chất liệu vỏ kim cương</option>
                    {materials.map((material) => (
                        <option key={material} value={material}>
                            {material}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-full">
                <h3 className="text-2xl font-bold mb-4 text-accent uppercase text-center">{selectedCategoryName}</h3>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <CircularProgress />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <Typography variant="body1">Không có sản phẩm</Typography>
                ) : (
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="my-3">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
                <Pagination
                    totalPosts={totalProducts}
                    postsPerPage={productPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

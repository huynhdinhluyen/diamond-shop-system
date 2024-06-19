import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useCart } from "../hooks/useCart";
import Price from "../components/Price";
import { useAuth } from "../hooks/useAuth";
import { getProductById } from "../service/productService";
import { getSizesByCategory } from "../service/sizeService";
import SimilarProduct from "../components/SimilarProduct";

export default function Product() {
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { productId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(productId).then(product => {
            setProduct(product);

            if (product && product.category && product.category.id && !["kim cương viên", "bông tai", "hoa tai"].includes(product.category.name.toLowerCase())) {
                getSizesByCategory(product.category.id).then(setSizes);
            }
        }).catch(error => {
            console.error("Error fetching product:", error);
        });
    }, [productId]);

    const handleAddToCart = () => {
        const isSizeNotRequiredCategory = ["kim cương viên", "bông tai", "hoa tai"].includes(product?.category?.name.toLowerCase());

        if (!isSizeNotRequiredCategory && !selectedSize) {
            alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng");
            return;
        }

        addToCart({
            userId: user.id,
            productId: productId,
            quantity: quantity,
            size: selectedSize?.name || "N/A",
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setOpen(false);
    };

    const handleBuyNow = () => {
        const isSizeNotRequiredCategory = ["kim cương viên", "bông tai", "hoa tai"].includes(product?.category?.name.toLowerCase());

        if (!isSizeNotRequiredCategory && !selectedSize) {
            alert("Vui lòng chọn kích thước trước khi mua hàng");
            return;
        }

        const order = {
            userId: user.id,
            deliveryFee: 50000,
            discountPrice: 0,
            totalPrice: product.costPrice * quantity,
            createdAt: new Date().toISOString(),
            customerName: `${user.lastName} ${user.firstName}`,
            shippingAddress: user.address,
            phoneNumber: user.phoneNumber,
            orderDetails: [
                {
                    productId: product.id,
                    quantity: quantity,
                    unitPrice: product.costPrice,
                    size: selectedSize?.name || "N/A",
                }
            ]
        };

        navigate('/payment', { state: { order } });
    };

    const renderSizeText = (size) => {
        if (product.category.id === 3) {
            return `Size ${size.name} - Chiều dài: ${size.length} cm`;
        } else {
            return `Size ${size.name} - Đường kính: ${size.diameter} mm`;
        }
    };

    const isSizeNotRequiredCategory = ["kim cương viên", "bông tai", "hoa tai"].includes(product?.category?.name.toLowerCase());

    const renderSizeGuideLink = (category) => {
        const sizeGuides = {
            'nhẫn': '/ring-size',
            'dây chuyền': '/necklace-size',
            'vòng tay': '/bracelet-size',
        };

        return sizeGuides[category.toLowerCase()] || null;
    };


    return (
        <div className="mt-10">
            {!product ? (
                <NotFound message="Không tìm thấy sản phẩm!" linkText="Quay lại trang chính" />
            ) : (
                <div className="container">
                    <div className="flex justify-center gap-x-5">
                        <div className="">
                            <img src={product.imageUrl} alt={product.name} className="h-full object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col gap-y-3 ml-4">
                            <h3 className="h3">{product.name}</h3>
                            <h3 className="h3 text-accent">
                                <Price price={product.costPrice} />
                            </h3>
                            <div className="flex">
                                <p className="">Vận chuyển:</p>
                                <i className="ri-truck-fill text-accent ml-8 mr-2"></i>
                                <span className="text-black">Miễn phí vận chuyển</span>
                            </div>
                            <div className="flex">
                                <p className="">Vận chuyển tới:</p>
                                <i className="ri-flag-fill ml-8 mr-2 text-accent"></i>
                                <span className="text-black text-wrap">{user?.address}</span>
                            </div>
                            <div className="flex gap-x-3">
                                <p className="">Số lượng: </p>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stockQuantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-16 text-center border rounded"
                                />
                                <span>(Số lượng có sẵn: {product.stockQuantity})</span>
                            </div>
                            {!isSizeNotRequiredCategory && (
                                <button className="border border-accent rounded-md uppercase font-semibold text-accent-secondary" onClick={handleClickOpen}>
                                    Chọn Kích Thước (Size)
                                </button>
                            )}
                            {selectedSize && (
                                <div className="mt-2">
                                    <strong>Kích thước đã chọn:</strong> {renderSizeText(selectedSize)}
                                </div>
                            )}
                            {product.category && renderSizeGuideLink(product.category.name) && (
                                <div className="mt-2">
                                    <Link to={renderSizeGuideLink(product.category.name)} className="text-blue-500 underline">
                                        Hướng dẫn chọn kích cỡ cho {product.category.name}
                                    </Link>
                                </div>
                            )}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle className="text-accent uppercase">Chọn kích thước</DialogTitle>
                                <DialogContent>
                                    <Grid container spacing={2}>
                                        {sizes.map((size) => (
                                            <Grid item xs={6} key={size.id}>
                                                <button
                                                    onClick={() => handleSizeSelect(size)}
                                                    className="w-full rounded-md flex justify-center items-center py-2 border border-accent"
                                                >
                                                    {renderSizeText(size)}
                                                </button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <button onClick={handleClose} className="px-3 text-accent text-md">
                                        Đóng
                                    </button>
                                </DialogActions>
                            </Dialog>
                            <div className="flex justify-start gap-x-4">
                                <button onClick={handleAddToCart} className=" bg-accent p-2 text-white hover:bg-accent-secondary w-56 text-[16px] rounded-lg"><i className="ri-shopping-cart-line mr-2"></i>Thêm vào giỏ hàng</button>
                                <button onClick={handleBuyNow} className=" bg-accent p-2 text-white hover:bg-accent-secondary w-56 rounded-lg text-[16px]">Mua ngay</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h4 className="h4 text-accent mb-4 uppercase">Chi tiết sản phẩm</h4>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Thuộc tính</th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Phân loại</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.category?.name || "Không có"}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Chất liệu</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.diamondCasing?.material || "Không có"}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Viên chính</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {product.mainDiamond ? (
                                            <ul className="ml-4 list-disc">
                                                <li>Màu: {product.mainDiamond.color}</li>
                                                <li>Xuất xứ: {product.mainDiamond.origin}</li>
                                                <li>Trọng lượng carat: {product.mainDiamond.caratWeight}</li>
                                                <li>Kiểu cắt: {product.mainDiamond.cutType}</li>
                                                <li>Độ trong: {product.mainDiamond.clarity}</li>
                                                <li>Chứng chỉ GIA: {product.mainDiamond.giaCertificate}</li>
                                            </ul>
                                        ) : (
                                            "Không có"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Viên phụ</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {product.auxiliaryDiamonds ? (
                                            <ul className="ml-4 list-disc">
                                                {product.auxiliaryDiamonds.map((diamond, index) => (
                                                    <li key={index}>
                                                        Màu: {diamond.color}, Xuất xứ: {diamond.origin}, Trọng lượng carat: {diamond.caratWeight}, Kiểu cắt: {diamond.cutType}, Độ trong: {diamond.clarity}, Chứng chỉ GIA: {diamond.giaCertificate}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            "Không có"
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3 className="h3 text-accent text-center uppercase mt-10">Sản phẩm tương tự</h3>
                        <SimilarProduct category={product.category.name} />
                    </div>
                </div>
            )}
        </div>
    );
}

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
import { toast } from "react-toastify";
import FullScreenImageModal from "../components/FullScreenImage";

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
    const [isImageModalOpen, setImageModalOpen] = useState(false);

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
        if (!user) {
            toast.error("Đăng nhập trước khi thêm vào giỏ hàng!");
            return;
        }
        const isSizeNotRequiredCategory = ["kim cương viên", "bông tai", "hoa tai"].includes(product?.category?.name.toLowerCase());

        if (!isSizeNotRequiredCategory && !selectedSize) {
            toast.error("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng");
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
        if (!user) {
            toast.error("Đăng nhập trước khi đặt hàng!");
            return;
        }
        const isSizeNotRequiredCategory = ["kim cương viên", "bông tai", "hoa tai"].includes(product?.category?.name.toLowerCase());

        if (!isSizeNotRequiredCategory && !selectedSize) {
            toast.error("Vui lòng chọn kích thước trước khi mua hàng");
            return;
        }

        const basePrice = product.discountPrice > 0 ? product.discountPrice : product.salePrice;
        const deliveryFee = basePrice * quantity > 50000000 ? 0 : 50000;
        const discountPrice = (basePrice * quantity + deliveryFee) * user.membershipLevel.discountRate;
        const order = {
            userId: user.id,
            discountPrice: discountPrice,
            deliveryFee: deliveryFee,
            totalPrice: discountPrice > 0 ? (basePrice + deliveryFee - discountPrice) * quantity : basePrice + deliveryFee * quantity,
            createdAt: new Date().toISOString(),
            customerName: `${user.lastName} ${user.firstName}`,
            shippingAddress: user.address,
            phoneNumber: user.phoneNumber,
            orderDetails: [
                {
                    productId: product.id,
                    quantity: quantity,
                    unitPrice: product.discountPrice > 0 ? product.discountPrice : product.salePrice,
                    size: selectedSize?.name || "N/A",
                }
            ]
        };
        navigate('/payment', { state: { order } });
    };

    const renderSizeText = (size) => {
        if (product.category.name.toLowerCase().includes("dây chuyền".toLowerCase())) {
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

    const renderSizeGuideImage = (category) => {
        const sizeGuideImages = {
            'nhẫn': "https://candyshop88.vn/wp-content/uploads/2022/04/cach-do-size-nhan-2.jpg",
            'dây chuyền': "https://caohungdiamond.com/wp-content/uploads/2022/06/tham-khao-cac-size-day-chuyen-dep.jpg",
            'vòng tay': "https://caohungdiamond.com/wp-content/uploads/2022/06/bang-do-kich-thuoc-vong-tay-chuan-nhat.jpg",
        };

        return sizeGuideImages[category.toLowerCase()] || null;
    }

    const handleImageClick = () => {
        setImageModalOpen(true);
    };

    const handleCloseModal = () => {
        setImageModalOpen(false);
    };

    return (
        <div className="lg:mt-16 mt-0">
            {!product ? (
                <NotFound message="Không tìm thấy sản phẩm!" linkText="Quay lại trang chính" />
            ) : (
                <div className="container">
                    <div className="flex lg:flex-row flex-col justify-center gap-x-5 gap-y-5">
                        <div className="lg:w-1/2 w-full">
                            <img src={product.imageUrl} alt={product.name} className="object-cover rounded-md max-w-full mx-auto h-96" />
                        </div>
                        <div className="lg:w-1/2 flex flex-col gap-y-3 w-full">
                            <h3 className="h3">{product.name}</h3>
                            <h3 className="h3 text-accent">
                                {product.discountPrice > 0 ?
                                    <div className="flex gap-x-10">
                                        <Price price={product.discountPrice} />
                                        <div className="text-gray-500 text-[20px] line-through">
                                            <Price price={product.salePrice} />
                                        </div>
                                    </div>
                                    : <Price price={product.salePrice} />}
                            </h3>
                            <div className="flex-col md:flex md:flex-row">
                                <p className="">Vận chuyển:</p>
                                <i className="ri-truck-fill text-accent ml-8 mr-2"></i>
                                <span className="text-black">Miễn phí với hóa đơn trên 50.000.000đ</span>
                            </div>
                            <div className="flex-col xl:flex xl:flex-row">
                                <p className="text-nowrap">Vận chuyển tới:</p>
                                <i className="ri-flag-fill ml-8 mr-2 text-accent"></i>
                                <span className="text-black text-wrap">{user?.address}</span>
                            </div>
                            <div className="flex-col sm:flex sm:flex-row gap-x-3">
                                <span className="">Số lượng: </span>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stockQuantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-16 text-center border rounded mr-3"
                                    disabled={product.stockQuantity === 0}
                                />
                                {product.stockQuantity === 0 ? (
                                    <span className="text-red-500">(Hết hàng)</span>
                                ) : (
                                    <span>(Số lượng có sẵn: {product.stockQuantity})</span>
                                )}
                            </div>
                            {!isSizeNotRequiredCategory && (
                                <button className="border border-accent rounded-md uppercase font-semibold text-accent-secondary" onClick={handleClickOpen}>
                                    Chọn Kích Thước (Size)
                                </button>
                            )}
                            {selectedSize && (
                                <div className="mt-2">
                                    <span className="text-base">Kích thước đã chọn:</span> {renderSizeText(selectedSize)}
                                </div>
                            )}
                            {product.category && renderSizeGuideLink(product.category.name) && renderSizeGuideImage(product.category.name) && (
                                <div className="mt-2">
                                    <div className="flex-col xl:flex xl:flex-row gap-x-2 mb-2">
                                        <Link to={renderSizeGuideLink(product.category.name)} className="text-blue-500 underline text-nowrap">
                                            Hướng dẫn chọn kích cỡ cho {product.category.name}:
                                        </Link>
                                        <img src={renderSizeGuideImage(product.category.name)} alt={`Hướng dẫn chọn kích cỡ cho ${product.category.name}`} className="max-w-80 rounded-md" />
                                    </div>
                                    <Link to="/privacy-warranty" className="text-blue-500 underline">
                                        Chính sách bảo hành sản phẩm
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
                            <div className="flex-col md:flex md:flex-row justify-start gap-x-4 md:mx-0 mx-auto">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-accent p-2 text-white hover:bg-accent-secondary w-full md:w-56 text-[16px] rounded-lg md:mb-0 mb-2"
                                    disabled={product.stockQuantity === 0}
                                >
                                    <i className="ri-shopping-cart-line mr-2"></i>Thêm vào giỏ hàng
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-accent p-2 text-white hover:bg-accent-secondary w-full md:w-56 rounded-lg text-[16px]"
                                    disabled={product.stockQuantity === 0}
                                >
                                    Mua ngay
                                </button>
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
                                                <li>Trọng lượng: {product.mainDiamond.caratWeight} carat</li>
                                                <li>Kiểu cắt: {product.mainDiamond.cutType}</li>
                                                <li>Độ trong: {product.mainDiamond.clarity}</li>
                                            </ul>
                                        ) : (
                                            "Không có"
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-gray-200">Viên phụ</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        {product.auxiliaryDiamond ? (
                                            <ul className="ml-4 list-disc">
                                                <li>Màu: {product.auxiliaryDiamond.color}</li>
                                                <li>Xuất xứ: {product.auxiliaryDiamond.origin}</li>
                                                <li>Trọng lượng: {product.auxiliaryDiamond.caratWeight} carat</li>
                                                <li>Kiểu cắt: {product.auxiliaryDiamond.cutType}</li>
                                                <li>Độ trong: {product.auxiliaryDiamond.clarity}</li>
                                            </ul>
                                        ) : (
                                            "Không có"
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <img
                            src="/src/assets/img/GIA/GIA.png"
                            alt="" className="w-[80%] mx-auto cursor-pointer"
                            onClick={handleImageClick}
                        />
                    </div>
                    <div>
                        <h3 className="h3 text-accent text-center uppercase mt-10">Sản phẩm tương tự</h3>
                        <SimilarProduct category={product.category.name} />
                    </div>
                    <FullScreenImageModal
                        isOpen={isImageModalOpen}
                        onClose={handleCloseModal}
                        imageUrl="/src/assets/img/GIA/GIA.png"
                    />
                </div>
            )}
        </div>
    );
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { useCart } from "../hooks/useCart";
import Price from "../components/Price";
import { useAuth } from "../hooks/useAuth";
import { useOrder } from "../hooks/useOrder";
import { getProductById } from "../service/productService";
import { getSizesByCategory } from "../service/sizeService";

export default function Product() {
    const { user } = useAuth();
    const { addOrder } = useOrder();
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [open, setOpen] = useState(false);
    const { productId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng");
            return;
        }

        addToCart({
            userId: user.id,
            productId: productId,
            quantity: 1,
            size: selectedSize.name,
        });
    };

    useEffect(() => {
        getProductById(productId).then(product => {
            setProduct(product);
            if (product && product.category && product.category.id) {
                getSizesByCategory(product.category.id).then(setSizes);
            }
        }).catch(error => {
            console.error("Error fetching product:", error);
        });
    }, [productId]);

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

    const handleBuyNow = async () => {
        if (!selectedSize) {
            alert("Vui lòng chọn kích thước trước khi mua hàng");
            return;
        }
        try {
            const order = {
                customer_id: user.id,
                transaction_id: null,
                deliveryFee: 50000,
                discountPrice: 0,
                totalPrice: product.costPrice,
                createdAt: new Date().toISOString(),
                customerName: user.lastName + " " + user.firstName,
                shippingAddress: user.address,
                phoneNumber: user.phoneNumber,
                orderDetails: [
                    {
                        productId: product.id,
                        quantity: 1,
                        unitPrice: product.costPrice,
                        size: selectedSize.name,
                    }
                ]
            };
            const newOrder = await addOrder(order);
            if (newOrder && newOrder.id) {
                navigate(`/payment/${newOrder.id}`);
            }
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    const renderSizeText = (size) => {
        if (product.category.id === 2) {
            // Dây chuyền
            return `Size ${size.name} - Chiều dài: ${size.length} cm`;
        } else {
            // Các loại khác
            return `Size ${size.name} - Đường kính: ${size.diameter} mm`;
        }
    };

    const renderSizeGuideLink = (category) => {
        const sizeGuides = {
            'nhẫn': '/ring-size',
            'dây chuyền': '/necklace-size',
            'vòng tay': 'bracelet-size',
        };

        return sizeGuides[category.toLowerCase()] || null;
    };

    return (
        <div className="mt-10">
            {!product ? (
                <NotFound message="Không tìm thấy sản phẩm!" linkText="Quay lại trang chính" />
            ) : (
                <div className="container">
                    <div className="flex justify-center">
                        <div className="w-1/2">
                            <img src={product.imageUrl} alt={product.name} className="h-full object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col gap-y-3 ml-4">
                            <h3 className="h3">{product.name}</h3>
                            <h4 className="h4 text-accent">
                                <Price price={product.costPrice} />
                            </h4>
                            {product.diamondCasing && (
                                <h5 className="h5">Chất liệu: {product.diamondCasing.material}</h5>
                            )}
                            {product.mainDiamond && (
                                <div>
                                    <h5 className="h5">Viên chính:</h5>
                                    <ul className="ml-10">
                                        <li className="list-disc list-inside">Màu: {product.mainDiamond.color}</li>
                                        <li className="list-disc list-inside">Xuất xứ: {product.mainDiamond.origin}</li>
                                        <li className="list-disc list-inside">Trọng lượng carat: {product.mainDiamond.caratWeight}</li>
                                        <li className="list-disc list-inside">Kiểu cắt: {product.mainDiamond.cutType}</li>
                                        <li className="list-disc list-inside">Độ trong: {product.mainDiamond.clarity}</li>
                                        <li className="list-disc list-inside">Chứng chỉ GIA: {product.mainDiamond.giaCertificate}</li>
                                    </ul>
                                </div>
                            )}
                            {product.auxiliaryDiamonds != null && (
                                <div>
                                    <h5 className="h5">Viên phụ:</h5>
                                    <ul>
                                        {product.auxiliaryDiamonds.map((diamond, index) => (
                                            <li key={index}>
                                                Màu: {diamond.color},
                                                Xuất xứ: {diamond.origin},
                                                Trọng lượng carat: {diamond.caratWeight},
                                                Kiểu cắt: {diamond.cutType},
                                                Độ trong: {diamond.clarity},
                                                Chứng chỉ GIA: {diamond.giaCertificate}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <h5 className="h5">Số lượng tồn kho: {product.stockQuantity}</h5>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Chọn Kích Thước (Size)
                            </Button>
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
                                <DialogTitle>Chọn kích thước</DialogTitle>
                                <DialogContent>
                                    <List>
                                        {sizes.map((size) => (
                                            <ListItem button key={size.id} onClick={() => handleSizeSelect(size)}>
                                                <ListItemText primary={renderSizeText(size)} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Đóng
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <button onClick={handleAddToCart} className="btn-accent btn-sm rounded-lg">Thêm vào giỏ hàng</button>
                            <button onClick={handleBuyNow} className="btn-accent btn-sm rounded-lg">Mua ngay</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useCart } from "../hooks/useCart";
import Price from "../components/Price";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addOrder } from '../service/orderService';

export default function Cart() {
    const { cart, getProductFromCart, changeQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            getProductFromCart();
        }
    }, [user]);

    useEffect(() => {
        if (cart.items != null) {
            const selectedProducts = cart.items.filter((item) => selectedItems.includes(item.productId));
            const newTotalQuantity = selectedProducts.reduce((total, item) => total + item.quantity, 0);
            const newTotalPrice = selectedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
            setTotalQuantity(newTotalQuantity);
            setTotalPrice(newTotalPrice);
        }
    }, [selectedItems, cart.items]);

    const handleQuantityChange = (productId, newQuantity) => {
        const product = cart.items.find(item => item.productId === productId);
        if (newQuantity < 1) {
            toast.error("Số lượng sản phẩm phải lớn hơn 0");
            return;
        }
        if (newQuantity > product.stockQuantity) {
            toast.error("Số lượng sản phẩm không được vượt quá tồn kho");
            return;
        }
        changeQuantity(productId, newQuantity);
    };

    const handleRemove = (productId) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(productId);
                Swal.fire({
                    title: "Thành công!",
                    text: "Sản phẩm đã được xóa",
                    icon: "success",
                });
                window.location.reload();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Đã hủy",
                    text: "Sản phẩm chưa xóa",
                    icon: "error",
                });
            }
        });
    }

    const handleCheckboxChange = (productId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(productId)) {
                return prevSelectedItems.filter((id) => id !== productId);
            } else {
                return [...prevSelectedItems, productId];
            }
        });
    };

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            toast.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
            return;
        }

        const orderItems = cart.items.filter((item) => selectedItems.includes(item.productId));
        const order = {
            userId: user.id,
            transaction_id: null, // Transaction ID sẽ được cập nhật sau khi chọn phương thức thanh toán
            deliveryFee: 50000, // Ví dụ phí giao hàng
            discountPrice: 0, // Ví dụ giá giảm
            totalPrice: orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
            createdAt: new Date().toISOString(),
            customerName: user.lastName + " " + user.firstName, // Giả sử user object có field name
            shippingAddress: user.address, // Giả sử user object có field address
            phoneNumber: user.phoneNumber, // Giả sử user object có field phone
            orderDetails: orderItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.price,
                size: item.size
            }))
        };

        try {
            const newOrder = await addOrder(order);
            if (newOrder) {
                orderItems.forEach(item => removeFromCart(item.productId));
                navigate("/payment", { state: { order } });
            }
        } catch (error) {
            console.error("Failed to place order:", error);
            toast.error("Đặt hàng không thành công, vui lòng thử lại.");
        }
    };

    return (
        <div className="lg:mt-10">
            {!cart.items || cart.items.length === 0
                ? <NotFound message="Giỏ hàng của bạn đang trống" />
                : (
                    <div className="container mx-auto px-4">
                        <ul className="flex flex-col gap-4">
                            {cart.items.map((item) => (
                                <li key={item.productId} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-md">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.productId)}
                                        onChange={() => handleCheckboxChange(item.productId)}
                                    />
                                    <img src={item.image} className="w-[100px] md:w-32 h-32 object-cover" alt={item.productName} />
                                    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
                                        <span className="text-lg text-center">
                                            {item.productName}
                                        </span>
                                        <span className="text-lg text-center">
                                            Kích cỡ: {item.size}
                                        </span>
                                        <div className="flex">
                                            <span className="md:flex mr-2">Giá:</span>
                                            <Price price={item.price} />
                                        </div>
                                        <div className="flex gap-x-2">
                                            <span className="md:flex">Số lượng</span>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                                className="w-16 text-center border rounded"
                                            />
                                        </div>
                                        <button className="px-4 py-2 text-white rounded-xl bg-accent hover:bg-accent-secondary cursor-pointer" onClick={() => handleRemove(item.productId)}>Xóa</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col items-center gap-5 p-4 mt-4 ">
                            <div className="text-center">
                                <div className="text-lg font-semibold">
                                    Tổng số lượng sản phẩm:
                                    <span className="ml-2">{totalQuantity}</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    Tổng thanh toán:
                                    <span className="ml-2">
                                        <Price price={totalPrice} />
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="btn-accent p-3 rounded-lg text-white bg-primary hover:bg-primary-dark transition"
                            >
                                Tiến hành đặt hàng
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useCart } from "../hooks/useCart";
import Price from "../components/Price";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Cart() {
    const { cart, getProductFromCart, changeQuantity, removeFromCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getProductFromCart();
        }
    }, [user]);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            toast.error("Số lượng sản phẩm phải lớn hơn 0");
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

    return (
        <div className="lg:mt-10">
            {!cart.items || cart.items.length === 0
                ? <NotFound message="Giỏ hàng của bạn đang trống" />
                : (
                    <div className="container mx-auto px-4">
                        <ul className="flex flex-col gap-4">
                            {cart.items.map((item) => (
                                <li key={item.productId} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-md">
                                    <img src={item.image} className="w-[100px] md:w-32 h-32 object-cover" alt={item.productName} />
                                    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
                                        <span className="text-lg text-center">
                                            {item.productName}
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
                                    <span className="ml-2">{cart.totalCount}</span>
                                </div>
                                <div className="text-lg font-semibold">
                                    Tổng thanh toán:
                                    <span className="ml-2">
                                        <Price price={cart.totalPrice} />
                                    </span>
                                </div>
                            </div>
                            <Link to="/checkout" className="btn-accent p-3 rounded-lg text-white bg-primary hover:bg-primary-dark transition">
                                Tiến hành thanh toán
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

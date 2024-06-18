import { useOrder } from "../hooks/useOrder";
import NotFound from "./NotFound";
import Price from "../components/Price"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function MyOrder() {
    const { user } = useAuth();
    const { orders } = useOrder();
    const { getUserOrders } = useOrder();
    useEffect(() => {
        if (user) {
            getUserOrders();
        }
    }, [user]);
    return (
        <div className="w-full ml-5 mt-10">
            <div>
                <h3 className="h3 mb-3">Đơn hàng của tôi</h3>
            </div>
            <hr className="w-full text-gray-300" />
            {!orders || orders.length === 0 ? (
                <div className="mt-10">
                    <NotFound message="Bạn chưa có đơn hàng nào" />
                </div>
            ) : (
                <div className="container mx-auto px-4">
                    <ul className="flex flex-col gap-4 mt-10">
                        {orders.map((order) => (
                            <Link key={order.id} to={`/order-detail/${order.id}`}>
                                <li className="flex flex-col p-4 border rounded-lg cursor-pointer hover:shadow-lg shadow-md">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-lg">Đơn hàng #{order.id}</span>
                                        <div className="flex justify-end mt-2">
                                            Ngày đặt hàng:<span className="font-semibold ml-2"> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        Tổng tiền: <span className="font-semibold ml-2"> <Price price={order.totalPrice} /> </span>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        Trạng thái đơn hàng: <span className="ml-2 font-semibold"> {order.status.name}</span>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}

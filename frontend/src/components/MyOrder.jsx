import { useOrder } from "../hooks/userOrder";
import NotFound from "./NotFound";

export default function MyOrder() {
    const { orders } = useOrder();

    return (
        <div className="w-full ml-5">
            <div>
                <h3 className="h3">Đơn hàng của tôi</h3>
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
                            <li key={order.id} className="flex flex-col p-4 border rounded-lg shadow-md">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-lg">Đơn hàng #{order.id}</span>
                                    <span className="text-gray-500">Ngày: {new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <span className="font-semibold">Tổng tiền: {order.totalPrice}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
}

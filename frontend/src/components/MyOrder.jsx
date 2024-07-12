import { useOrder } from "../hooks/useOrder";
import NotFound from "./NotFound";
import Price from "../components/Price";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MyOrder() {
    const { orders, getProductFromOrder } = useOrder();
    const [orderProducts, setOrderProducts] = useState({});
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    useEffect(() => {
        const fetchOrderProducts = async () => {
            try {
                const allOrderProducts = await Promise.all(orders.map(async (order) => {
                    const products = await getProductFromOrder(order);
                    return { orderId: order.id, products };
                }));

                const orderProductsMap = {};
                allOrderProducts.forEach(({ orderId, products }) => {
                    orderProductsMap[orderId] = products;
                });
                setOrderProducts(orderProductsMap);
            } catch (error) {
                console.error('Failed to fetch order products:', error);
            }
        };

        if (orders.length > 0) {
            fetchOrderProducts();
        }
    }, [orders, getProductFromOrder]);

    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="w-full lg:ml-5 lg:mt-5">
            <div>
                <h3 className="h3 mb-3 text-center lg:text-left">Đơn hàng của tôi</h3>
            </div>
            <hr className="w-full text-gray-300" />
            {!sortedOrders || sortedOrders.length === 0 ? (
                <div className="mt-10 text-center">
                    <NotFound message="Bạn chưa có đơn hàng nào" />
                </div>
            ) : (
                <div className="container mx-auto px-4">
                    <ul className="flex flex-col gap-4 mt-10">
                        {sortedOrders.map((order) => (
                            <Link key={order.id} to={`/order-detail/${order.id}`}>
                                <li className="flex flex-col p-4 border rounded-lg cursor-pointer hover:shadow-lg shadow-md transition-shadow duration-300">
                                    <div className="flex-col md:flex md:flex-row justify-between items-center mb-2">
                                        <span className="font-semibold text-lg text-accent">Đơn hàng #{order.id}</span>
                                        <div className="text-gray-500">
                                            Ngày đặt hàng:<span className="font-semibold ml-2"> {new Date(order.createdAt).toLocaleDateString('vi-VN', options)}</span>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border border-gray-300">
                                            <thead>
                                                <tr className="w-full bg-gray-200 text-left">
                                                    <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Sản phẩm</th>
                                                    <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Kích cỡ</th>
                                                    <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Đơn giá</th>
                                                    <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Số lượng</th>
                                                    <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderProducts[order.id]?.map((product, index) => (
                                                    <tr key={index} className="hover:bg-gray-100">
                                                        <td className="py-3 px-4 border-b border-gray-300 text-nowrap text-[15px] whitespace-nowrap overflow-hidden overflow-ellipsis">{product.name}</td>
                                                        <td className="py-3 px-4 border-b border-gray-300 text-nowrap text-[15px]">
                                                            {["Dây chuyền", "Nhẫn", "Vòng tay"].includes(product.category.name) ?
                                                                (product.category.name === "Dây chuyền" ? product.size + "cm" : product.size + "mm")
                                                                : "N/A"}
                                                        </td>
                                                        <td className="py-3 px-4 border-b border-gray-300 text-nowrap"><Price price={product.unitPrice} /></td>
                                                        <td className="py-3 px-4 border-b border-gray-300 text-nowrap">{product.quantity}</td>
                                                        <td className="py-3 px-4 border-b border-gray-300 text-nowrap"><Price price={product.unitPrice * product.quantity} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex flex-wrap justify-end text-gray-500 mt-2">
                                        Tổng tiền: <span className="font-semibold ml-2"> <Price price={order.totalPrice} /> </span>
                                    </div>
                                    <div className="flex flex-col ml-auto sm:flex sm:flex-row justify-end items-center text-gray-500 mt-2">
                                        <p className="mr-3">Trạng thái đơn hàng:</p>
                                        {order.status.name === "PENDING" && (<p className='px-3 py-2 bg-gray-400 text-white text-center rounded-md'>Đang chờ xác nhận</p>)}
                                        {order.status.name === "CONFIRMED" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đã xác nhận đơn hàng</p>)}
                                        {order.status.name === "SHIPPING" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đơn hàng đang giao đến bạn</p>)}
                                        {order.status.name === "WAITING_FOR_PICKUP" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đợi đơn vị vận chuyển lấy hàng</p>)}
                                        {order.status.name === "CANCELLED" && (<p className='px-3 py-2 bg-red-500 text-white text-center rounded-md'>Đơn hàng đã hủy</p>)}
                                        {order.status.name === "COMPLETED" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đơn hàng được giao thành công</p>)}
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

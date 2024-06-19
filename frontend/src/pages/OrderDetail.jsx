/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '../service/orderService';
import Price from '../components/Price';
import { useOrder } from '../hooks/useOrder';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const { getProductFromOrder } = useOrder();
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const fetchedOrder = await getOrderById(orderId);
                setOrder(fetchedOrder);
                const products = await getProductFromOrder(orderId);
                setOrderDetails(products);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchOrder();
    }, [orderId, getProductFromOrder]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const totalAmount = orderDetails.reduce((total, product) => total + product.unitPrice * product.quantity, 0);
    const shippingFee = order.deliveryFee || 0;
    const totalPayment = totalAmount + shippingFee - order.discountPrice;
    const transactionId = order.transaction;
    const orderStatus = order.status.name;

    return (
        <div>
            {!transactionId ? (
                <div className="container mt-10 bg-gray-50 p-5 rounded-xl">
                    <h3 className='h3 text-accent uppercase my-4 text-center'>Đơn hàng của bạn chưa được cập nhật phương thức thanh toán</h3>
                </div>
            ) : (
                <div className="container mt-10 bg-gray-50 p-5 rounded-xl grid grid-cols-12 gap-4">
                    <div className='col-span-12'>
                        <h3 className='h3 text-accent uppercase my-4 text-center'>Đơn hàng của bạn đã đặt thành công <i className="ri-check-fill text-green-500"></i></h3>
                        <h4 className='text-center h4'>Mã đơn hàng của bạn là: <span className="font-semibold">#{order.id}</span></h4>
                        <h4 className='h4 font-semibold mb-4'>Đơn hàng của bạn</h4>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="w-full bg-gray-200 text-left">
                                    <th className="py-3 px-4 border-b border-gray-300">Sản phẩm</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Kích cỡ</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Đơn giá</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Số lượng</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-3 px-4 border-b border-gray-300 text-[18px] hover:text-accent transition-all duration-300">
                                            <Link to={`/product/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-300 text-[15px]">{product.size}</td>
                                        <td className="py-3 px-4 border-b border-gray-300"><Price price={product.unitPrice} /></td>
                                        <td className="py-3 px-4 border-b border-gray-300">{product.quantity}</td>
                                        <td className="py-3 px-4 border-b border-gray-300"><Price price={product.unitPrice * product.quantity} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {order.note != null && (
                            <p className='mt-3'>Ghi chú của khách hàng: {order.note}</p>
                        )}
                        <div className="mt-4">
                            <h4 className="font-semibold">Chi tiết thanh toán</h4>
                            <hr className='my-2' />
                            <div className="flex justify-between">
                                <span>Tổng tiền hàng:</span>
                                <span><Price price={totalAmount} /></span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span><Price price={shippingFee} /></span>
                            </div>
                            <div className="flex justify-between">
                                <span>Giảm giá:</span>
                                <span><Price price={order.discountPrice} /></span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Tổng thanh toán:</span>
                                <span><Price price={totalPayment} /></span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className='flex justify-between'>
                                <h4 className="font-semibold">Hình thức giao hàng</h4>
                                <p>Giao hàng tận nơi: <span className="font-semibold">{order.shippingAddress}</span></p>
                            </div>
                            <div className='flex justify-between'>
                                <h4 className="font-semibold">Phương thức thanh toán</h4>
                                <p>{transactionId === 1 ? 'Trả tiền mặt sau khi nhận hàng' : 'Chuyển khoản'}</p>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <h4 className="font-semibold">Trạng thái đơn hàng:</h4>
                            {orderStatus == "PENDING" && (<p>Đã nhận được đơn hàng</p>)}
                            {orderStatus == "PROCESSING" && (<p>Đang xử lý</p>)}
                            {orderStatus == "SHIPPED" && (<p>Đã giao hàng cho đơn vị vận chuyển</p>)}
                            {orderStatus == "DELIVERED" && (<p>Đơn hàng đã được giao thành công</p>)}
                            {orderStatus == "CANCELLED" && (<p></p>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetail;

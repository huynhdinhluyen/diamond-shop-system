/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getOrderById, cancelOrder } from '../service/orderService';
import Price from '../components/Price';
import { useOrder } from '../hooks/useOrder';
import { Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const { getProductFromOrder } = useOrder();
    const [orderDetails, setOrderDetails] = useState([]);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const fetchOrder = async () => {
        try {
            const fetchedOrder = await getOrderById(orderId);
            setOrder(fetchedOrder);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    useEffect(() => {
        if (order) {
            const fetchProducts = async () => {
                try {
                    const products = await getProductFromOrder(order);
                    setOrderDetails(products);
                } catch (error) {
                    console.error('Failed to fetch product details:', error);
                }
            };

            fetchProducts();
        }
    }, [order, getProductFromOrder]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const totalAmount = orderDetails.reduce((total, product) => total + product.unitPrice * product.quantity, 0);
    const shippingFee = order.deliveryFee || 0;
    const totalPayment = totalAmount + shippingFee - order.discountPrice;
    const transactionId = order.transaction;
    const orderStatus = order.status.name;

    const handleCancelOrder = async () => {
        try {
            await cancelOrder(order.id, cancelReason);
            toast.success('Đơn hàng đã được hủy thành công!');
            fetchOrder();
        } catch (error) {
            toast.error('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
            console.error('Failed to cancel order:', error);
        }
        setOpenCancelDialog(false);
    };

    const reasons = [
        'Tôi đã tìm thấy giá tốt hơn ở nơi khác',
        'Tôi không còn muốn mua sản phẩm này nữa',
        'Tôi đặt nhầm sản phẩm',
        'Thời gian giao hàng quá lâu',
        'Lý do khác'
    ];

    return (
        <div className="container mx-auto lg:my-8 my-0">
            {!transactionId ? (
                <div className="bg-gray-50 p-5 rounded-xl text-center">
                    <h3 className='h3 text-accent uppercase my-4'>Đơn hàng của bạn chưa được cập nhật phương thức thanh toán</h3>
                </div>
            ) : (
                <div className="bg-gray-50 px-3 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-4 pb-3">
                    <div className='col-span-12'>
                        <h3 className='h3 text-accent uppercase my-4 text-center'>Đơn hàng của bạn đã đặt thành công <i className="ri-check-fill text-green-500"></i></h3>
                        <h4 className='text-center h4 mb-4'>Mã đơn hàng của bạn là: <span className="font-semibold">#{order.id}</span></h4>
                        <div className="overflow-x-auto">
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
                                            <td className="py-3 px-4 border-b border-gray-300 hover:text-accent transition-all duration-300">
                                                <Link to={`/product/${product.id}`}>
                                                    {product.name}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 border-b border-gray-300 text-[15px]">
                                                {["Dây chuyền", "Nhẫn", "Vòng tay"].includes(product.category.name) ?
                                                    (product.category.name === "Dây chuyền" ? product.size + "cm" : product.size + "mm")
                                                    : "N/A"}
                                            </td>
                                            <td className="py-3 px-4 border-b border-gray-300"><Price price={product.unitPrice} /></td>
                                            <td className="py-3 px-4 border-b border-gray-300">{product.quantity}</td>
                                            <td className="py-3 px-4 border-b border-gray-300"><Price price={product.unitPrice * product.quantity} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {order.note != null && (
                            <p className='mt-3'>Ghi chú của khách hàng: {order.note}</p>
                        )}
                        <div className="mt-4">
                            <h4 className="font-semibold">Chi tiết thanh toán</h4>
                            <hr className='my-2' />
                            <div className="flex justify-between items-center">
                                <span>Tổng tiền hàng:</span>
                                <span><Price price={totalAmount} /></span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Phí vận chuyển:</span>
                                <span><Price price={shippingFee} /></span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Giảm giá:</span>
                                <span>-<Price price={order.discountPrice} /></span>
                            </div>
                            <div className="flex justify-between items-center font-semibold">
                                <span>Tổng thanh toán:</span>
                                <span><Price price={totalPayment} /></span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className='flex-col lg:flex lg:flex-row justify-between items-center mb-3'>
                                <h4 className="font-semibold mb-2 lg:mb-0">Hình thức giao hàng:</h4>
                                <p>Giao hàng tận nơi: <span className="lg:font-semibold font-normal">{order.shippingAddress}</span></p>
                            </div>
                            <div className='flex-col md:flex md:flex-row justify-between items-center mb-3'>
                                <h4 className="font-semibold mb-2 lg:mb-0">Phương thức thanh toán:</h4>
                                <div>
                                    {order.transaction.paymentMethod}
                                </div>
                            </div>
                            <div className='flex-col md:flex md:flex-row justify-between items-center'>
                                <h4 className="font-semibold mb-2 lg:mb-0">Trạng thái đơn hàng:</h4>
                                {orderStatus === "PENDING" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đã nhận được đơn hàng</p>)}
                                {orderStatus === "CONFIRMED" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đã xác nhận đơn hàng</p>)}
                                {orderStatus === "SHIPPING" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đơn hàng đang giao đến bạn</p>)}
                                {orderStatus === "WAITING_FOR_PICKUP" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đợi đơn vị vận chuyển lấy hàng</p>)}
                                {orderStatus === "CANCELLED" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đơn hàng đã hủy</p>)}
                                {orderStatus === "COMPLETED" && (<p className='px-3 py-2 bg-accent text-white text-center rounded-md'>Đơn hàng được giao thành công</p>)}
                            </div>
                        </div>
                        {orderStatus === "PENDING" && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                                    onClick={() => setOpenCancelDialog(true)}
                                >
                                    Hủy Đơn Hàng
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
                <DialogTitle>Chọn lý do hủy đơn hàng</DialogTitle>
                <DialogContent>
                    <RadioGroup value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
                        {reasons.map((reason, index) => (
                            <FormControlLabel key={index} value={reason} control={<Radio />} label={reason} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCancelDialog(false)} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleCancelOrder} color="secondary" disabled={!cancelReason}>
                        Xác nhận hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderDetail;

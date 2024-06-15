import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById, updateTransactionId, updateOrderNote } from '../service/orderService';
import Input from "../components/Input";
import Price from '../components/Price';
import { useOrder } from '../hooks/useOrder';

const PaymentPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const { getProductFromOrder } = useOrder();
    const [orderDetails, setOrderDetails] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const fetchedOrder = await getOrderById(orderId);
                setOrder(fetchedOrder);
                setNote(fetchedOrder.note || '');
                const products = await getProductFromOrder(orderId);
                setOrderDetails(products);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchOrder();
    }, [orderId, getProductFromOrder]);

    const handleOrder = async () => {
        if (paymentMethod === '' || paymentMethod === 'Chọn phương thức thanh toán của bạn') {
            setError('Vui lòng chọn phương thức thanh toán.');
            return;
        }
        try {
            const transactionId = paymentMethod === 'Chuyển khoản' ? 2 : 1; // Giả sử 1 là Chuyển khoản, 2 là Trả tiền mặt
            await updateTransactionId(orderId, transactionId);
            if (note.trim() !== '') {
                const updatedNote = await updateOrderNote(orderId, note); // Cập nhật ghi chú của đơn hàng
                console.log(updatedNote);
                console.log('Updated note:', updatedNote); // Kiểm tra kết quả phản hồi từ API
            }
            console.log('Phương thức thanh toán và ghi chú đã được cập nhật');
            navigate(`/order-detail/${orderId}`);
        } catch (error) {
            console.error('Failed to process payment:', error);
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    const totalAmount = orderDetails.reduce((total, product) => total + product.unitPrice * product.quantity, 0);
    const shippingFee = order.deliveryFee || 0;
    const totalPayment = totalAmount + shippingFee - order.discountPrice;

    return (
        <div className="container mt-10 bg-gray-50 p-5 rounded-xl grid grid-cols-12 gap-4">
            <div className='col-span-8 bg-white p-3'>
                <h3 className='h3 text-accent uppercase my-4'>Xác nhận đơn hàng</h3>
                <div className='flex justify-between gap-x-2'>
                    <div className="mb-4 w-full">
                        <label htmlFor="" className="">Họ và tên: <span className='text-red-600'>*</span></label>
                        <Input value={order.customerName} onChange={(e) => setOrder({ ...order, customerName: e.target.value })} />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="" className="">Số điện thoại: <span className='text-red-600'>*</span></label>
                        <Input value={order.phoneNumber} onChange={(e) => setOrder({ ...order, phoneNumber: e.target.value })} />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="">Địa chỉ nhận hàng: <span className='text-red-600'>*</span></label>
                    <Input value={order.shippingAddress} onChange={(e) => setOrder({ ...order, shippingAddress: e.target.value })} />
                </div>
                <h4 className='h4 font-semibold mb-4'>Sản phẩm</h4>
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
                                <td className="py-3 px-4 border-b border-gray-300 text-[15px]">{product.name}</td>
                                <td className="py-3 px-4 border-b border-gray-300 text-[15px]">
                                    {product.category.name == "Dây chuyền" ? product.size + "cm" : product.size + "mm"}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-300"><Price price={product.unitPrice} /></td>
                                <td className="py-3 px-4 border-b border-gray-300">{product.quantity}</td>
                                <td className="py-3 px-4 border-b border-gray-300"><Price price={product.unitPrice * product.quantity} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4 className='h4 font-semibold my-4'>Chọn phương thức thanh toán</h4>
                <select
                    className="block w-full mt-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    value={paymentMethod}
                    onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        setError('');
                    }}
                >
                    <option>Chọn phương thức thanh toán của bạn</option>
                    <option value="Chuyển khoản">Chuyển khoản</option>
                    <option value="Trả tiền mặt sau khi nhận hàng">Trả tiền mặt sau khi nhận hàng</option>
                </select>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className='col-span-4 p-3 bg-white'>
                <textarea
                    className="block w-full mt-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    rows="4"
                    placeholder="Ghi chú đơn hàng (tùy chọn)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
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
                <button onClick={handleOrder} className='btn btn-accent btn-lg my-3 mx-auto w-[75%]'>Đặt hàng</button>
            </div>
        </div >
    );
};

export default PaymentPage;

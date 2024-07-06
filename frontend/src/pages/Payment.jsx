/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from "../components/Input";
import Price from '../components/Price';
import { getProductById } from '../service/productService';
import { useOrder } from '../hooks/useOrder';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const PaymentPage = () => {
    const location = useLocation();
    const { state } = location;
    const { order } = state;
    const { user, refreshUser } = useAuth();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { addOrder } = useOrder();
    const { removeFromCart } = useCart();
    const [products, setProducts] = useState([]);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [exchangeRate, setExchangeRate] = useState(25000);
    const [paypalPaymentCompleted, setPaypalPaymentCompleted] = useState(false);
    const totalAmount = products.reduce((total, product) => total + product.unitPrice * product.quantity, 0);
    const shippingFee = totalAmount >= 50000000 ? 0 : 50000;
    const discountAmount = order.discountPrice || (totalAmount * user.membershipLevel.discountRate);
    const totalPaymentVND = totalAmount - discountAmount;
    const totalPaymentUSD = (totalPaymentVND / exchangeRate).toFixed(2);
    const [orderDetails, setOrderDetails] = useState({
        customerName: order.customerName || '',
        phoneNumber: order.phoneNumber || '',
        shippingAddress: order.shippingAddress || '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productDetails = await Promise.all(
                    order.orderDetails.map(async (detail) => {
                        const product = await getProductById(detail.productId);
                        return { ...product, ...detail };
                    })
                );
                setProducts(productDetails);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };

        fetchProducts();
    }, [order]);

    const handleOrder = async (transactionStatus = 'INCOMPLETE') => {
        if (paymentMethod === '' || paymentMethod === 'Chọn phương thức thanh toán của bạn') {
            toast.error('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        if (paymentMethod === 'Chuyển khoản' && paypalPaymentCompleted === false) {
            toast.error('Vui lòng hoàn tất chuyển khoản qua PayPal trước khi đặt hàng.');
            return;
        }

        if (!orderDetails.customerName || !orderDetails.customerName.trim()) {
            toast.error('Vui lòng nhập họ và tên.');
            return;
        }

        if (!orderDetails.phoneNumber || !orderDetails.phoneNumber.trim()) {
            toast.error('Vui lòng nhập số điện thoại.');
            return;
        }

        if (!orderDetails.shippingAddress || !orderDetails.shippingAddress.trim()) {
            toast.error('Vui lòng nhập địa chỉ nhận hàng.');
            return;
        }

        try {
            const newOrder = {
                ...order,
                ...orderDetails,
                transaction: {
                    paymentMethod,
                    transactionDate: new Date().toISOString(),
                    transactionAmount: totalPaymentVND,
                    status: transactionStatus
                },
                note,
            };
            const addedOrder = await addOrder(newOrder);
            for (const detail of newOrder.orderDetails) {
                await removeFromCart(detail.productId);
            }
            await refreshUser(); // Làm mới thông tin người dùng sau khi đặt hàng
            navigate(`/order-detail/${addedOrder.id}`);
        } catch (error) {
            console.error('Failed to process payment:', error);
        }
    };


    useEffect(() => {
        if (paypalPaymentCompleted) {
            handleOrder('COMPLETE');
        }
    }, [paypalPaymentCompleted]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (products.length === 0) {
        return <div>Loading...</div>;
    }

    const translateMembershipLevel = (membershipLevel) => {
        switch (membershipLevel.name.toLowerCase()) {
            case 'platinum':
                return 'Bạch Kim';
            case 'diamond':
                return 'Kim Cương';
            case 'gold':
                return 'Vàng';
            case 'silver':
                return 'Bạc';
            case 'bronze':
                return 'Đồng';
            default:
                return membershipLevel.name;
        }
    };

    //Tài khoản đăng nhập Paypal: 
    //diamond@personal.example.com
    //12345678

    return (
        <PayPalScriptProvider options={{ "client-id": "AX4x0xZ5zRYc99ovorXk5ouwFOtobLBMYgGR6JaFiB31vvEH2Z2TAk-qUouX_H9y6ligOQpKYPkZzIVH" }}>
            <div className="container mt-0 lg:mt-10 bg-gray-50 p-5 rounded-xl lg:grid lg:grid-cols-12 gap-4 flex-col">
                <div className='lg:col-span-8 bg-white p-3'>
                    <h3 className='h3 text-accent uppercase my-4'>Xác nhận đơn hàng</h3>
                    <div className='lg:flex flex-col justify-between gap-x-2'>
                        <div className="mb-4 w-full">
                            <label htmlFor="customerName" className="">Họ và tên: <span className='text-red-600'>*</span></label>
                            <Input
                                name="customerName"
                                value={orderDetails.customerName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="phoneNumber" className="">Số điện thoại: <span className='text-red-600'>*</span></label>
                            <Input
                                name="phoneNumber"
                                value={orderDetails.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shippingAddress" className="">Địa chỉ nhận hàng: <span className='text-red-600'>*</span></label>
                        <Input
                            name="shippingAddress"
                            value={orderDetails.shippingAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3 text-accent'>
                        *Bạn đang là thành viên {translateMembershipLevel(user.membershipLevel)} - Giảm giá {user.membershipLevel.discountRate}% trên toàn hóa đơn
                    </div>
                    <h4 className='h4 font-semibold mb-4'>Sản phẩm</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="w-full bg-gray-200 text-left text-nowrap">
                                    <th className="py-3 px-4 border-b border-gray-300">Sản phẩm</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Kích cỡ</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Đơn giá</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Số lượng</th>
                                    <th className="py-3 px-4 border-b border-gray-300">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-3 px-4 border-b border-gray-300 text-[15px]">{product.name}</td>
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
                    <h4 className='h4 font-semibold my-4'>Chọn phương thức thanh toán</h4>
                    <select
                        className="block w-full mt-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        value={paymentMethod}
                        onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            setError('');
                        }}
                    >
                        <option value="" disabled hidden>Chọn phương thức thanh toán của bạn</option>
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Trả tiền mặt sau khi nhận hàng">Trả tiền mặt sau khi nhận hàng</option>
                    </select>
                    {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
                    {paymentMethod === 'Chuyển khoản' && (
                        <PayPalButtons
                            className='mt-10 flex'
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [{
                                        amount: {
                                            value: totalPaymentUSD,
                                        },
                                    }],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                const details = await actions.order.capture();
                                toast.success(`Chuyển khoản thành công!`);
                                setPaypalPaymentCompleted(true);
                            }}
                        />
                    )}
                </div>
                <div className='lg:col-span-4 p-3 bg-white'>
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
                        <div className="flex justify-between flex-wrap">
                            <span>Tổng tiền hàng:</span>
                            <span><Price price={totalAmount} /></span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            <span>Phí vận chuyển:</span>
                            <span><Price price={shippingFee} /></span>
                        </div>
                        <div className="flex justify-between flex-wrap">
                            <span>Giảm giá(đã bao gồm phí ship):</span>
                            <span>-<Price price={discountAmount} /></span>
                        </div>
                        <div className="flex justify-between font-semibold flex-wrap">
                            <span>Tổng thanh toán:</span>
                            <span><Price price={totalPaymentVND} /></span>
                        </div>
                    </div>
                    <button onClick={() => handleOrder()} className='btn btn-accent btn-lg my-3 mx-auto w-[75%]'>Đặt hàng</button>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default PaymentPage;

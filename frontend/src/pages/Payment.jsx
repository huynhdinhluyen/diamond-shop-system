/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from "../components/Input";
import Price from '../components/Price';
import { getProductById } from '../service/productService';
import { useOrder } from '../hooks/useOrder';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getExchangeRate } from '../service/exchangeService';
import { toast } from 'react-toastify';
import { useCart } from '../hooks/useCart';

const PaymentPage = () => {
    const location = useLocation();
    const { state } = location;
    const { order } = state;
    const [paymentMethod, setPaymentMethod] = useState('');
    const { addOrder } = useOrder();
    const { removeFromCart } = useCart();
    const [products, setProducts] = useState([]);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [orderDetails, setOrderDetails] = useState({
        customerName: order.customerName,
        phoneNumber: order.phoneNumber,
        shippingAddress: order.shippingAddress,
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

    useEffect(() => {
        const fetchExchangeRate = async () => {
            const rate = await getExchangeRate();
            if (rate) {
                setExchangeRate(rate);
            }
        };

        fetchExchangeRate();
    }, []);

    const handleOrder = async () => {
        const id = paymentMethod === 'Chuyển khoản' ? 2 : 1;
        if (paymentMethod === '' || paymentMethod === 'Chọn phương thức thanh toán của bạn') {
            setError('Vui lòng chọn phương thức thanh toán.');
            return;
        }
        try {
            const newOrder = {
                ...order,
                ...orderDetails,
                transaction: id,
                note,
            };
            console.log(newOrder);
            const addedOrder = await addOrder(newOrder);
            for (const detail of newOrder.orderDetails) {
                await removeFromCart(detail.productId);
            }
            navigate(`/order-detail/${addedOrder.id}`);
        } catch (error) {
            console.error('Failed to process payment:', error);
        }
    };

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

    const totalAmount = products.reduce((total, product) => total + product.unitPrice * product.quantity, 0);
    const shippingFee = totalAmount >= 50000000 ? 0 : 50000;
    const totalPaymentVND = totalAmount + shippingFee - order.discountPrice;
    const totalPaymentUSD = (totalPaymentVND / exchangeRate).toFixed(2);

    //Test paypal: 
    //sb-lmnov31265068@personal.example.com
    //l778,J@)

    return (
        <PayPalScriptProvider options={{ "client-id": "AX4x0xZ5zRYc99ovorXk5ouwFOtobLBMYgGR6JaFiB31vvEH2Z2TAk-qUouX_H9y6ligOQpKYPkZzIVH" }}>
            <div className="container mt-10 bg-gray-50 p-5 rounded-xl grid grid-cols-12 gap-4">
                <div className='col-span-8 bg-white p-3'>
                    <h3 className='h3 text-accent uppercase my-4'>Xác nhận đơn hàng</h3>
                    <div className='flex justify-between gap-x-2'>
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
                            {products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b border-gray-300 text-[15px]">{product.name}</td>
                                    <td className="py-3 px-4 border-b border-gray-300 text-[15px]">
                                        {product.category.name === "Dây chuyền" ? product.size + "cm" : product.size + "mm"}
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
                        <option value="" disabled hidden>Chọn phương thức thanh toán của bạn</option>
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Trả tiền mặt sau khi nhận hàng">Trả tiền mặt sau khi nhận hàng</option>
                    </select>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
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
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    toast.success(`Chuyển khoản thành công!`);
                                    handleOrder();
                                });
                            }}
                        />
                    )}
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
                            <span><Price price={totalPaymentVND} /></span>
                        </div>
                    </div>
                    <button onClick={handleOrder} className='btn btn-accent btn-lg my-3 mx-auto w-[75%]'>Đặt hàng</button>
                </div>
            </div >
        </PayPalScriptProvider>
    );
};

export default PaymentPage;

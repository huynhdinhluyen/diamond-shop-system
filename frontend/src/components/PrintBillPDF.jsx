/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useOrder } from '../hooks/useOrder';
import Price from './Price';

const PrintBillPDF = ({ order }) => {
    const warrantyRef = useRef(null);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const { getProductFromOrder } = useOrder();
    const [products, setProducts] = useState([]);

    const printPDF = () => {
        const element = warrantyRef.current;
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `Hóa đơn - order_${order.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        element.style.display = 'block';
        html2pdf().set(opt).from(element).save().then(() => {
            element.style.display = 'none'
        });
    };

    useEffect(() => {
        if (order) {
            const fetchProducts = async () => {
                try {
                    const products = await getProductFromOrder(order);
                    setProducts(products);
                } catch (error) {
                    console.error('Failed to fetch product details:', error);
                }
            };

            fetchProducts();
        }
    }, [getProductFromOrder, order]);

    return (
        <div className="">
            <div id="warranty" ref={warrantyRef} className='hidden'>
                <div>
                    <h3 className='text-[24px] text-center uppercase text-accent font-semibold'>Hóa đơn bán hàng</h3>
                    <div className='mt-4'>
                        <p><span className='font-semibold'>Ngày đặt hàng:</span> {new Date(order.createdAt).toLocaleDateString('vi-VN', options)}</p>
                        <p><span className='font-semibold'>Tên khách hàng:</span> {order.customerName}</p>
                        <p><span className='font-semibold'>Số điện thoại khách hàng:</span> {order.phoneNumber}</p>
                        <p><span className='font-semibold'>Địa chỉ:</span> {order.shippingAddress}</p>
                    </div>
                    <table className="bg-white border mt-4 w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b text-left">
                                <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Sản phẩm</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Kích cỡ</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Đơn giá</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Số lượng</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-nowrap">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b border-gray-300 hover:text-accent transition-all duration-300  whitespace-nowrap overflow-hidden overflow-ellipsis">
                                        {product.name}
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
                    <div className='flex flex-col mt-3 gap-y-4 text-right'>
                        <h5 className='h5'>Tổng tiền sản phẩm: <Price price={order.totalPrice} /></h5>
                        <h5 className='h5'>Phí ship: <Price price={order.deliveryFee} /></h5>
                        <h5 className='h5'>Giảm giá: -<Price price={order.discountPrice} /></h5>
                        <hr />
                        <h5 className='h5 font-semibold'>Tổng tiền thanh toán: <Price price={order.totalPrice} /></h5>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <img src="/src/assets/img/logo/logo.svg" className='w-[250px] h-[200px]' alt="" />
                    <div>
                        <div className='flex gap-x-2'>
                            <i className="ri-map-pin-line text-accent text-[24px]"></i>
                            <p>Long Thạnh Mỹ, Thành phố Thủ Đức</p>
                        </div>
                        <div className='flex gap-x-2'>
                            <i className="ri-phone-line text-accent text-[24px]"></i>
                            <div>(+84) 123123123</div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-accent btn-sm mt-3 ml-auto"
                onClick={printPDF}
            >
                <i className="ri-save-line mr-2"></i>
                In hóa đơn
            </button>
        </div>
    );
};

export default PrintBillPDF;

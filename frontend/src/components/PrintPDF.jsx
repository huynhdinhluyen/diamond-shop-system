/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useOrder } from '../hooks/useOrder';

const PrintOrderPDF = ({ order }) => {
    const warrantyRef = useRef(null);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const { getProductFromOrder } = useOrder();
    const [products, setProducts] = useState([]);

    const printPDF = () => {
        const element = warrantyRef.current;
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `Phiếu bảo hành - order_${order.id}.pdf`,
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

    const warrantyInfo = {
        'Nhẫn': {
            free: '- Nâng hạ size nhẫn miễn phí có thêm nguyên vật liệu (nếu chỉnh được và không vượt phí size nhẫn quy định). <br />- Tăng 1 size nhẫn miễn phí (nếu có thể chỉnh được và không thêm nguyên vật liệu). <br />- Hạ size nhẫn miễn phí nếu hạ được (phần vàng cắt ra dùng hàn và gia cố đai nhẫn).',
            paid: '- Sau 6 tháng mua hàng: Chỉnh size phải thêm nguyên vật liệu.<br />- Bị cong, méo hoặc gãy do va chạm nhưng không bị biến dạng.',
            none: '- Tăng hoặc giảm size nhẫn ngoài quy định, hoặc nhẫn có kiểu dáng phức tạp.<br />- Nhẫn bị biến dạng.'
        },
        'Hoa tai, mặt dây chuyền': {
            free: '- Hàn: Khoen, móc nối mòn.',
            paid: '- Thay: Khoen, móc nối, chốt hoa tai. Sửa chữa phải thêm nguyên vật liệu.',
            none: '- Sản phẩm bị biến dạng.'
        },
        'Dây chuyền, dây tay, lắc tay': {
            free: '- Dây bị đứt nếu có thể hàn lại được.<br />- Thay móc khóa hư (bảo hành 6 tháng khóa đã được thay).<br />- Hàn: Khoen, móc nối mòn.',
            paid: '- Hàn dây, móc nối mòn.<br />- Thay móc khóa hư (bảo hành 6 tháng khóa đã được thay).<br />- Sửa chữa phải thêm nguyên vật liệu.',
            none: '- Các móc nối bị mòn, giãn, biến dạng nhiều.<br />- Loại dây không hàn được.'
        },
        'Vòng tay': {
            free: '- Tăng hoặc giảm đường kính 2mm được miễn phí (nếu có thể làm được).',
            paid: '- Tăng đường kính 2mm sẽ tính phí (nếu có thể làm được).<br />- Sản phẩm bị biến dạng nhẹ.',
            none: '- Tăng hoặc giảm đường kính lớn hơn 2mm.<br />- Sản phẩm bị biến dạng nhiều.'
        }
    };

    const calculateWarrantyEndDate = (startDate) => {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 6);
        return endDate.toLocaleDateString('vi-VN', options);
    };

    return (
        <div className="">
            <div id="warranty" ref={warrantyRef} className='hidden'>
                <div>
                    <h3 className='text-[24px] text-center uppercase text-accent font-semibold'>Phiếu bảo hành</h3>
                    <div className='mt-4'>
                        <p><span className='font-semibold'>Tên khách hàng:</span> {order.customerName}</p>
                        <p><span className='font-semibold'>Ngày đặt hàng:</span> {new Date(order.createdAt).toLocaleDateString('vi-VN', options)}</p>

                        <p><span className='font-semibold'>Sản phẩm:</span> {products.map(product => product.name).join(', ')}</p>
                        {products.map((product, index) =>
                            <ul key={index}>
                                <li>{product.name}</li>
                            </ul>)
                        }

                        <p><span className='font-semibold'>Thời hạn bảo hành:</span> {new Date(order.createdAt).toLocaleDateString('vi-VN', options)} - {calculateWarrantyEndDate(order.createdAt)}</p>
                    </div>
                    <table className="bg-white border mt-4" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-4 text-center font-semibold align-middle border-r text-sm text-nowrap text-gray-600">Loại sản phẩm</th>
                                <th className="py-2 px-4 text-center font-semibold align-middle border-r text-sm text-nowrap text-gray-600">Bảo hành miễn phí</th>
                                <th className="py-2 px-4 text-center font-semibold align-middle border-r text-sm text-nowrap text-gray-600">Bảo hành tính phí</th>
                                <th className="py-2 px-4 text-center font-semibold align-middle text-sm text-nowrap text-gray-600">Không nhận bảo hành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(warrantyInfo).map((key, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4 border-r">{key}</td>
                                    <td className="py-2 px-4 border-r" dangerouslySetInnerHTML={{ __html: warrantyInfo[key].free }}></td>
                                    <td className="py-2 px-4 border-r" dangerouslySetInnerHTML={{ __html: warrantyInfo[key].paid }}></td>
                                    <td className="py-2 px-4" dangerouslySetInnerHTML={{ __html: warrantyInfo[key].none }}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                In phiếu bảo hành
            </button>
        </div>
    );
};

export default PrintOrderPDF;

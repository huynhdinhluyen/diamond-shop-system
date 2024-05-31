import { useState } from "react";
import { prices } from "../pricesData";
import { useRef } from "react";
import { useEffect } from "react";

export default function TablePricesDiamond() {

    const [activeSize, setActiveSize] = useState(prices[0].size);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSize(entry.target.id);
                }
            });
        }, {
            threshold: 0.5
        });

        sectionRefs.current.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionRefs.current.forEach(section => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const handleSizeClick = (size) => {
        const targetSection = document.getElementById(size);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="mt-10 container">
            <h3 className="h3 text-center">Bảng giá kim cương thiên nhiên kiểm định quốc tế hôm nay 30/05/2024</h3>
            <p className="text-md text-center mt-5">
                Bảng giá hột xoàn tham khảo theo ly (mm), nước màu (color) & độ sạch. Nếu quý khách đang muốn mua trang sức nhẫn, dây chuyền, hoa tai… bằng kim cương nhưng chưa biết giá kim cương thiên nhiên hôm nay như thế nào, hãy tham khảo nhanh báo giá mới nhất mới cập nhật ngay dưới đây.
            </p>
            <p className="text-md text-center mt-5">(Đơn vị tiền tệ: VNĐ)</p>

            <div className="sticky top-0 bg-white p-2 z-10">
                <div className="flex overflow-x-auto">
                    {prices.map(price => (
                        <span
                            key={price.size}
                            className={`px-3 py-2 cursor-pointer ${activeSize === price.size ? 'bg-accent text-white' : 'bg-gray-200 text-black'} text-sm text-nowrap`}
                            onClick={() => handleSizeClick(price.size)}
                        >
                            {price.size}
                        </span>
                    ))}
                </div>
            </div>

            {prices.map((price, index) => (
                <div
                    id={price.size}
                    key={price.size}
                    ref={el => sectionRefs.current[index] = el}
                    className="mt-8"
                >
                    <h4 className="h4 text-center text-accent">Giá kim cương {price.size}</h4>
                    <table className="table-auto w-full mt-2 ">
                        <thead>
                            <tr>
                                <th className=" border border-gray-300 px-4 py-2 text-left">Clarity</th>
                                <th className=" border border-gray-300 px-4 py-2 text-left">D</th>
                                <th className=" border border-gray-300 px-4 py-2 text-left">E</th>
                                <th className=" border border-gray-300 px-4 py-2 text-left">F</th>
                                <th className=" border border-gray-300 px-4 py-2 text-left">J</th>
                            </tr>
                        </thead>
                        <tbody>
                            {price.values.map((value, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="px-4 py-2 border border-gray-300">{value.clarity}</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.D.toLocaleString()} VND</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.E.toLocaleString()} VND</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.F.toLocaleString()} VND</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.J.toLocaleString()} VND</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

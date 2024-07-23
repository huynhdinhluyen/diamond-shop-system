import { useState, useEffect, useRef } from "react";
import { getDiamonds } from "../service/diamondService";
import { CircularProgress } from "@mui/material";

export default function TablePricesDiamond() {
    const [activeSize, setActiveSize] = useState(null);
    const [diamonds, setDiamonds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const sectionRefs = useRef([]);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const currentDate = new Date().toLocaleString('vi-VN', options);

    useEffect(() => {
        const fetchDiamonds = async () => {
            try {
                const data = await getDiamonds();

                const groupedDiamonds = data.reduce((acc, diamond) => {
                    const size = diamond.size;
                    const clarity = diamond.clarity;
                    const color = diamond.color;
                    if (!acc[size]) {
                        acc[size] = {
                            size,
                            values: {}
                        };
                    }
                    if (!acc[size].values[clarity]) {
                        acc[size].values[clarity] = {};
                    }
                    acc[size].values[clarity][color] = diamond.price;
                    return acc;
                }, {});

                const diamondList = Object.values(groupedDiamonds).sort((a, b) => a.size - b.size);
                setDiamonds(diamondList);
                if (diamondList.length > 0) {
                    setActiveSize(diamondList[0].size);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiamonds();
    }, []);

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

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><CircularProgress /></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
    }

    const clarityLevels = ["IF", "VVS1", "VVS2", "VS1", "VS2"];
    const colorLevels = ["D", "E", "F", "J"];

    return (
        <div className="lg:mt-10 container bg-gray-50 lg:p-10">
            <img
                src="https://images.unsplash.com/photo-1584377334016-464803e03b80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="lg:hidden w-full h-[300px] object-cover mb-5" />
            <h3 className="h3 text-center">Bảng giá kim cương thiên nhiên kiểm định quốc tế hôm nay {currentDate}</h3>
            <h3 className="h3 text-center mt-4">**ROUND BRILLIANT CUT – EXCELLENT**</h3>
            <p className="text-md text-center mt-5">
                Bảng giá hột xoàn tham khảo theo ly (mm), nước màu (color) & độ sạch (Clarity). Nếu quý khách đang muốn mua trang sức nhẫn, dây chuyền, hoa tai… bằng kim cương nhưng chưa biết giá kim cương thiên nhiên hôm nay như thế nào, hãy tham khảo nhanh báo giá mới nhất mới cập nhật ngay dưới đây.
            </p>
            <p className="text-md text-center mt-5">(Đơn vị tiền tệ: VNĐ)</p>

            <div className="sticky top-0 bg-white p-2 z-10 overflow-x-auto">
                <div className="flex flex-wrap justify-center">
                    {diamonds.map(diamond => (
                        <span
                            key={diamond.size}
                            className={`px-3 py-2 cursor-pointer ${activeSize === diamond.size ? 'bg-accent text-white' : 'bg-gray-200 text-black'} text-sm text-nowrap`}
                            onClick={() => handleSizeClick(diamond.size)}
                        >
                            {diamond.size} ly
                        </span>
                    ))}
                </div>
            </div>

            {diamonds.map((diamond, index) => (
                <div
                    id={diamond.size}
                    key={diamond.size}
                    ref={el => sectionRefs.current[index] = el}
                    className="mt-8 overflow-x-auto"
                >
                    <h4 className="h4 text-center text-accent">Giá kim cương {diamond.size} ly</h4>
                    <table className="w-full mt-2 ">
                        <thead>
                            <tr>
                                <th className=" border border-gray-300 px-4 py-2 text-left text-accent">{diamond.size} ly</th>
                                {colorLevels.map(color => (
                                    <th key={color} className=" border border-gray-300 px-4 py-2 text-left">{color}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {clarityLevels.map(clarity => (
                                <tr key={clarity} className="border-t">
                                    <td className="px-4 py-2 border border-gray-300">{clarity}</td>
                                    {colorLevels.map(color => (
                                        <td key={color} className="px-4 py-2 border border-gray-300">
                                            {(diamond.values[clarity] && diamond.values[clarity][color])
                                                ? diamond.values[clarity][color].toLocaleString() + " VND"
                                                : "N/A"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

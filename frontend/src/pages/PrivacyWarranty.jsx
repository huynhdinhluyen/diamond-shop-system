import { Link } from "react-router-dom";

export default function PrivacyWarranty() {
    return (
        <div className="container lg:mt-10 px-4 ">
            <h3 className="h3 text-accent text-center uppercase mb-3">CHÍNH SÁCH BẢO HÀNH</h3>
            <h4 className="h4 text-center uppercase mb-5">Khi bảo hành, phiền quý khách mang theo hóa đơn mua hàng!</h4>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Nhóm hàng</th>
                        <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Điều khoản bảo hành miễn phí (Tính từ ngày mua hàng)</th>
                        <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Điều khoản bảo hành tính phí (Tính từ ngày mua hàng)</th>
                        <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Điều khoản không nhận bảo hành</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4 border-r">Nhẫn</td>
                        <td className="py-2 px-4 border-r">
                            - Thời gian bảo hành 6 tháng: Nâng hạ size nhẫn miễn phí có thêm nguyên vật liệu (nếu chỉnh được và không vượt phí size nhẫn quy định).<br />
                            - Tăng 1 size nhẫn miễn phí (nếu có thể chỉnh được và không thêm nguyên vật liệu).<br />
                            - Hạ size nhẫn miễn phí nếu hạ được (phần vàng cắt ra dùng hàn và gia cố đai nhẫn).
                        </td>
                        <td className="py-2 px-4 border-r">
                            - Sau 6 tháng mua hàng: Chỉnh size phải thêm nguyên vật liệu.<br />
                            - Bị cong, méo hoặc gãy do va chạm nhưng không bị biến dạng.
                        </td>
                        <td className="py-2 px-4">
                            - Tăng hoặc giảm size nhẫn ngoài quy định, hoặc nhẫn có kiểu dáng phức tạp.<br />
                            - Nhẫn bị biến dạng.
                        </td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 border-r">Hoa tai, mặt dây chuyền</td>
                        <td className="py-2 px-4 border-r">
                            - Thời gian bảo hành 6 tháng: Hàn: Khoen, móc nối mòn.
                        </td>
                        <td className="py-2 px-4 border-r">
                            - Thay: Khoen, móc nối, chốt hoa tai.<br />
                            - Sửa chữa phải thêm nguyên vật liệu.
                        </td>
                        <td className="py-2 px-4">
                            - Sản phẩm bị biến dạng.
                        </td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 border-r">Dây chuyền, dây tay, lắc tay</td>
                        <td className="py-2 px-4 border-r">
                            - Thời gian bảo hành 6 tháng: Dây bị đứt nếu có thể hàn lại được.<br />
                            - Thay móc khóa hư (bảo hành 6 tháng khóa đã được thay).<br />
                            - Hàn: Khoen, móc nối mòn.
                        </td>
                        <td className="py-2 px-4 border-r">
                            - Hàn dây, móc nối mòn.<br />
                            - Thay móc khóa hư (bảo hành 6 tháng khóa đã được thay).<br />
                            - Sửa chữa phải thêm nguyên vật liệu.
                        </td>
                        <td className="py-2 px-4">
                            - Các móc nối bị mòn, giãn, biến dạng nhiều.<br />
                            - Loại dây không hàn được.
                        </td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 border-r">Vòng tay</td>
                        <td className="py-2 px-4 border-r">
                            - Thời gian bảo hành 6 tháng: Tăng hoặc giảm đường kính 2mm được miễn phí (nếu có thể làm được).
                        </td>
                        <td className="py-2 px-4 border-r">
                            - Sau 6 tháng mua hàng: Tăng đường kính 2mm sẽ tính phí (nếu có thể làm được).<br />
                            - Sản phẩm bị biến dạng nhẹ.
                        </td>
                        <td className="py-2 px-4">
                            - Tăng hoặc giảm đường kính lớn hơn 2mm.<br />
                            - Sản phẩm bị biến dạng nhiều.
                        </td>
                    </tr>
                </tbody>
            </table>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/term-of-use" className="hover:text-accent duration-200 transition-all">Điều khoản sử dụng</Link>
        </div>
    )
}
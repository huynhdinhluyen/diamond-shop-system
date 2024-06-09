import { Link } from "react-router-dom";

export default function PrivacyShipping() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">CHÍNH SÁCH GIAO HÀNG</h3>
            <h4 className="h4 mb-2">1. Nội thành TP. Hồ Chí Minh</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Miễn phí giao hàng, kiểm tra, thanh toán.</li>
                <li className="list-disc list-inside">Đối với hàng thiết kế theo yêu cầu, quý khách vui lòng chuyển khoản trước 5.000.000 (năm triệu đồng), giao tận nơi thanh toán số tiền còn lại.</li>
                <li className="list-disc list-inside">Thời gian nhận hàng trong vòng 12 tiếng từ khi nhân viên DHL Diamond gọi xác nhận đơn hàng. (nếu quý khách đặt sau 20h thì đơn hàng sẽ được xử lí vào sáng hôm sau).</li>
            </ul>
            <h4 className="h4 mb-2">2. Các thành phố khác</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Miễn phí giao hàng với các hóa đơn trên 10.000.000 (mười triệu đồng).</li>
                <li className="list-disc list-inside">Quý khách chuyển khoản trước 5.000.000 (năm triệu đông), nhân viên của DHL Diamond sẽ giao tận nơi và thanh toán, không gởi hàng theo chính sách gởi đảm bảo.</li>
                <li className="list-disc list-inside">Thời gian nhận hàng trong vòng 72 tiếng (tùy khu vực).</li>
            </ul>
            <h4 className="h4 mb-2">Hình thức thanh toán</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Trả bằng tiền mặt khi nhân viên DHL Diamond giao tận nơi.</li>
                <li className="list-disc list-inside">Thanh toán qua số tài khoản: 123 345 6789 DHL (Vietcombank). Để lại thông tin: [HỌ VÀ TÊN] [ SĐT] [MÓN HÀNG].</li>
            </ul>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/privacy-warranty" className="hover:text-accent duration-200 transition-all">Chính sách bảo hành</Link>
        </div>
    )
}

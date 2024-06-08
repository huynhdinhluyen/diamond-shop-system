import { Link } from "react-router-dom";

export default function ExchangeAndReturn() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">Thu đổi sản phẩm</h3>
            <h4 className="h4 mb-2">ĐIỀU KIỆN THU ĐỔI</h4>
            <p className="text-left mb-3">
                1. ĐỐI VỚI KIM CƯƠNG
            </p>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Quý Khách cung cấp đủ 3 loại giấy tờ: giấy chứng nhận GIA, hóa đơn và giấy bảo hành.</li>
                <li className="list-disc list-inside">Tất cả 3 loại giấy tờ trên phải còn nguyên vẹn, không chấp vá, tẩy xóa, chỉnh sửa.</li>
                <li className="list-disc list-inside">Kim cương còn nguyên vẹn, không bị trầy xước hoặc nứt mẻ.</li>
            </ul>
            <p className="text-left mb-3">
                2. ĐỐI VỚI TRANG SỨC
            </p>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Quý khách cần cung cấp đủ 2 loại giấy: giấy bảo hành và hóa đơn.</li>
                <li className="list-disc list-inside">THóa đơn, giấy bảo hành phải còn nguyên vẹn, không chấp vá, tẩy xóa, sửa chữa.</li>
                <li className="list-disc list-inside">Trang sức phải còn nguyên vẹn, không bị hư hỏng, biến dạng, còn đủ số lượng kim cương tấm.</li>
            </ul>
            <h4 className="h4 mb-2">ĐỊA ĐIỂM THU ĐỔI</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Việc kiểm định và định giá sản phẩm thu đổi sẽ thực hiện trực tiếp tại cửa hàng.</li>
                <li className="list-disc list-inside">Hotline hỗ trợ: (+84) 123123123</li>
                <li className="list-disc list-inside">Thời gian tiếp nhận thu đổi: Từ 14h00 đến 17h00 (từ Thứ 2 đến Thứ 7).</li>
            </ul>
            <p className="text-left text-accent">
                Lưu ý:
            </p>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Trong trường hợp quý khách hàng không đáp ứng được điều kiện thu đổi, DHL Diamond sẽ thực hiện thu đổi sản phẩm theo giá thị trường.</li>
                <li className="list-disc list-inside">Quy trình có thể thay đổi theo từng chính sách của DHL Diamond tại từng thời điểm.</li>
                <li className="list-disc list-inside">Chính sách BẢO HÀNH và làm mới trọn đời cho khách hàng hoàn toàn miễn phí trọn đời.</li>
                <li className="list-disc list-inside">Quý khách hàng nên lựa chọn thật kỹ, DHL Diamond không giải quyết mọi trường hợp trả lại sản phẩm.</li>
            </ul>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/privacy-exchange-and-return" className="hover:text-accent duration-200 transition-all">Chính sách đổi trả</Link>
        </div>
    )
}

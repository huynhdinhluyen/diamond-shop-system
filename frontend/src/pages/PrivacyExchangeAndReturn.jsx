import { Link } from "react-router-dom";

export default function PrivacyExchangeAndReturn() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">CHÍNH SÁCH ĐỔI TRẢ SẢN PHẨM TẠI DHL DIAMOND</h3>
            <h4 className="h4 mb-2">Điều kiện đổi trả sản phẩm</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Xác định chính xác lỗi thuộc về nhà sản xuất <span className="font-semibold">(quan trọng nhất)</span>.</li>
                <li className="list-disc list-inside">Cần gửi trả lại sản phẩm cho DHL Diamond trong vòng 2 ngày (tính từ lúc quý khách nhận được sản phẩm).</li>
                <li className="list-disc list-inside">Sản phẩm đổi trả phải mới 100%, không có dấu hiệu đã qua sử dụng (vết trầy xước, vết bẩn..).</li>
                <li className="list-disc list-inside">Sản phẩm phải được hoàn trả cùng đầy đủ những vật phẩm đi kèm hoặc tặng kèm (hộp quà tặng, giấy chứng thực hoặc xác nhận…).</li>
                <li className="list-disc list-inside">Dấu đảm bảo, tem, hóa đơn phải còn nguyên vẹn và đầy đủ.</li>
                <li className="list-disc list-inside">Sản phẩm đổi trả phải đúng kích thước, màu sắc, kiểu dáng… như ban đầu.</li>
            </ul>
            <h4 className="h4 mb-2">Quy trình tiếp nhận và hoàn tiền</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Khi tiếp nhận sản phẩm đổi trả, DHL Diamond sẽ tiến hành kiểm tra và xác nhận khiếu nại của quý khách hàng có chính xác hay không.</li>
                <li className="list-disc list-inside">Nếu sản phẩm đáp ứng đủ các điều kiện trên và khiếu nại là đúng thì quý khách sẽ nhận được khoản hoàn lại trong vòng từ 4 – 5 ngày.</li>
            </ul>
            <h4 className="h4 mb-2">Lưu ý với thẻ thanh toán tín dụng</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Chỉ có thể hoàn trả lại cho thẻ thanh toán tín dụng và không thể xử lý để hoàn trả lại tiền.</li>
                <li className="list-disc list-inside">Khoản thanh toán tín dụng không được chuyển thành tiền mặt, chuyển qua cho người khác.</li>
                <li className="list-disc list-inside">Khoản thanh toán tín dụng không sử dụng cho các dịch vụ như vận chuyển nhanh hoặc lệ phí thay đổi kích cỡ.</li>
            </ul>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/exchange-and-return" className="hover:text-accent duration-200 transition-all">Thu đổi sản phẩm</Link>
        </div>
    )
}

import { Link } from "react-router-dom";

export default function CommitDiamond() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">CAM KẾT VỀ KIM CƯƠNG</h3>
            <p className="text-left mb-3">
                Nhằm mang tới sự an tâm cho khách hàng cũng như khẳng định chất lượng kim cương của mình, DHL Diamond – Chuyên Trang Sức Kim Cương Nam Nữ xin đưa ra các cam kết về toàn bộ kim cương tại showroom.            </p>
            <img
                src="https://www.geo.tv/assets/uploads/updates/2017-08-03/152264_8876833_updates.jpg"
                alt="Kim cương"
                className="mx-auto my-4"
            />
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Toàn bộ 100% kim cương có mặt tại Showroom của DHL Diamond đều là kim cương nhập khẩu chính hãng, có đầy đủ hóa đơn chứng từ chứng minh nguồn gốc xuất xứ.</li>
                <li className="list-disc list-inside">Mỗi viên kim cương của DHL Diamond đều đã trải qua quá trình kiểm tra nghiêm ngặt, được giám định bởi Viện ngọc học Hoa Kỳ GIA và IGI công nhận về chất lượng.</li>
                <li className="list-disc list-inside">DHL Diamond hiện đang là khách hàng VIP của KHO KIM CƯƠNG GIA hàng đầu thế giới.</li>
                <li className="list-disc list-inside">Kim cương tại Showroom chúng tôi đảm bảo về chất lượng và có giá trị trên phạm vi toàn cầu.</li>
                <li className="list-disc list-inside">Giá cả kim cương và trang sức kim cương do DHL Diamond cung cấp có giá cả tốt nhất thị trường.</li>
                <li className="list-disc list-inside">Có chính sách Thu mua – Thu đổi hợp lý, mang lại lợi ích tối ưu cho khách hàng.</li>
                <li className="list-disc list-inside">Có chính sách bảo hành và làm mới trọn đời cho tất cả trang sức kim cương tại cửa hàng.</li>
                <li className="list-disc list-inside">Đội ngũ tư vấn giàu kinh nghiệm, thân thiện, lịch sự với khách hàng, chăm sóc khách hàng chu đáo.</li>
                <li className="list-disc list-inside">Cam kết cung cấp dịch vụ chuyên nghiệp, chất lượng, cam kết CHÍNH TRỰC, MINH BẠCH, TẬN TÂM.</li>
                <li className="list-disc list-inside">Có các chương trình ưu đãi, chính sách hấp dẫn diễn ra thường xuyên.</li>
            </ul>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/commit-case" className="hover:text-accent duration-200 transition-all">Cam kết về vỏ trang sức</Link>
        </div>
    )
}

import { Link } from "react-router-dom";

export default function Preserved() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">Hướng dẫn bảo quản trang sức</h3>
            <h4 className="h4 mb-2">Trang sức kim cương</h4>
            <p className="text-left mb-3">
                Kim cương không thể bị mài mòn do các tác động bình thường vì nó có độ cứng rất cao nhưng cần phải giữ sạch để có được độ sáng vĩnh viễn. Bạn có thể ngâm trong nước xà phòng ấm khoảng 30 phút sau đó rửa lại bằng nước sạch rồi dùng vải mềm lau khô.
            </p>
            <p className="text-left mb-3">
                Vì kim cương có độ cứng rất cao nên nữ trang kim cương nên được bảo quản riêng biệt khỏi các đồ trang sức khác để tránh trầy xước.
            </p>
            <h4 className="h4 mb-2">Trang sức vàng</h4>
            <p className="text-left mb-3">
                Không nên để vàng tiếp xúc với thủy ngân, thuốc uốn tóc, nhuộm tóc và một số loại mỹ phẩm vì các chất này sẽ làm cho vàng bị ngả màu.
            </p>
            <p className="text-left mb-3">
                Để vàng luôn sáng đẹp, mỗi tuần nên dùng bàn chải đánh răng loại mềm nhúng vào xà phòng hoặc kem đánh răng chải rửa trong và ngoài món nữ trang để tẩy đi bụi bẩn và mồ hôi bám vào. Khi nữ trang bị ướt thì không nên để nữ trang tự khô mà phải dùng vải thun cotton hoặc giấy mềm lau khô.
            </p>
            <p className="text-left mb-3">
                Qua thời gian dài sử dụng, các món nữ trang có thể giảm đi độ sáng bóng, màu vàng bị nhạt, mờ. Để trở về trạng thái sáng bóng ban đầu chỉ có cách duy nhất là làm sạch, xi mới, đánh bóng bằng những dụng cụ chuyên ngành nữ trang. Tất cả các cửa hàng PNJ đều có dịch vụ đánh bóng, siêu âm làm sạch miễn phí vĩnh viễn cho các sản phẩm PNJ, riêng với dịch vụ xi mới, sản phẩm nhẫn cưới đươc miễn phí, còn các dòng sản phẩm khác khách hàng sẽ trả 1 mức phí hợp lý tùy theo chủng loại sản phẩm.
            </p>
            <h4 className="h4 mb-2">Trang sức bạc</h4>
            <p className="text-left mb-3">
                Trang sức bạc đeo lâu ngày có thể bị mờ đi. Bạc bị oxy hóa khi tiếp xúc với không khí, ánh sáng mạnh  và các hóa chất như keo xịt tóc, nước hoa, thuốc tẩy, nước biển,…
            </p>
            <p className="text-left mb-3">
                Để món trang sức bạc luôn sáng đẹp, bạn nên ngâm và rửa nhẹ nhàng trong nước tẩy rửa nhẹ (nước tẩy rửa chén đĩa, ly tách) pha với nước sạch. Sau đó, rửa lại bằng nước sạch và dùng khăn mềm lau khô thật kỹ. Tuyệt đối không sử dụng nước tẩy rửa có tính chất tẩy mạnh.
            </p>
            <p className="text-left mb-3">
                Để đảm bảo và duy trì vẻ đẹp của trang sức bạc, nên cất giữ và khi đeo tránh va chạm hoặc sử dụng bất kì dụng cụ nào tác động trực tiếp đến món trang sức.
            </p>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/commit-diamond" className="hover:text-accent duration-200 transition-all">Cam kết về kim cương</Link>
        </div>
    )
}

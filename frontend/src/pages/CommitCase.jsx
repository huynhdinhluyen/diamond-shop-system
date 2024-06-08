import { Link } from "react-router-dom";

export default function CommitCase() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">CAM KẾT VỀ VỎ TRANG SỨC</h3>
            <h4 className="h4 mb-2">Chất lượng vỏ trang sức tại DHL Diamond</h4>
            <p className="text-left mb-3">
                DHL Diamond không chỉ cam kết về chất lượng kim cương mà còn cam kết cả về chất lượng vỏ trang sức đi kèm. Tất cả các vỏ trang sức bông tai, nhẫn, vòng tay… tại showroom đều đáp ứng tiêu chuẩn chất lượng của hàng xoàn Italia, thỏa mãn các thông số từ độ bóng cho tới màu sắc.
            </p>
            <img
                src="https://senydajewelry.com/wp-content/uploads/2019/04/NHX028_1.jpg"
                alt="Vỏ kim cương"
                className="mx-auto my-4"
            />
            <p className="text-left mb-3">
                Hiện nay DHL Diamond đang sở hữu một xưởng gia công quy mô với các thiết bị, máy móc hiện đại cộng thêm đội ngũ thợ kim hoàn giàu kinh nghiệm, đã có hàng chục năm làm đồ xoàn. Vì vậy, các sản phẩm dù là vỏ trang sức hay hột tấm đều được gia công tỉ mỉ. Ổ vỏ trang sức ôm khít lấy kim cương, kể cả là loại 4 chấu hay 6 chấu.
            </p>
            <h4 className="h4 mb-2">Chất lượng kim cương cao, đạt tiêu chuẩn GIA</h4>
            <p className="text-left mb-3">
                Kim cương tại showroom DHL Diamond đều được nhập khẩu từ nước ngoài, có giấy kiểm định chất lượng quốc tế do tổ chức GIA hoặc IGI cấp. 100% kim cương đều chưa qua sử dụng, có độ tinh khiết cao, màu sắc đẹp, trong, ánh sáng lấp lánh nên có giá trị lớn và mang lại cho khách hàng sự may mắn.
            </p>
            <img
                src="https://4cs.gia.edu/wp-content/uploads/2017/05/Hero_DGR_700x394-01.jpg"
                alt="Vỏ kim cương"
                className="mx-auto my-4"
            />
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/commit-diamond" className="hover:text-accent duration-200 transition-all">Cam kết về kim cương</Link>
        </div>
    )
}

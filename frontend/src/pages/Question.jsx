import { Link } from "react-router-dom";

export default function Question() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">CÂU HỎI THƯỜNG GẶP</h3>
            <h4 className="h4 mb-2">DHL Diamond hiện đang ở tại địa chỉ nào?</h4>
            <p className="text-left mb-3">
                Hiện nay DHL Diamond đang nằm tại địa chỉ Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000.
            </p>
            <h4 className="h4 mb-2">DHL Diamond hỗ trợ thanh toán theo các hình thức nào?</h4>
            <p className="text-left">
                Khi khách hàng mua trang sức kim cương tại DHL Diamond có thể lựa chọn thành toán bằng các hình thức sau:
            </p>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">Thanh toán bằng tiền mặt</li>
                <li className="list-disc list-inside">Thanh toán qua chuyển khoản ngân hàng, VNPay</li>
            </ul>
            <h4 className="h4 mb-2">DHL Diamond có tính phí vận chuyển trang sức kim cương không?</h4>
            <p className="text-left mb-3">
                Không. Khi khách hàng mua trang sức kim cương của DHL Diamond và yêu cầu vận chuyển tới địa chỉ cung cấp sẽ được hỗ trợ vận chuyển hoàn toàn miễn phí trên phạm vi toàn quốc.
            </p>
            <h4 className="h4 mb-2">Cách thức chuyển hàng tận nơi khi mua trang sức kim cương tại DHL Diamond cho khách hàng ở xa, ngoại TPHCM như thế nào? </h4>
            <p className="text-left mb-3">
                Khi vận chuyển trang sức kim cương cho khách hàng ở ngoài TPHCM DHL Diamond sẽ đóng gói cẩn thận và bảo hiểm 100% cho sản phẩm. Tùy thuộc vào địa chỉ giao hàng mà chúng tôi sẽ sử dụng đơn vị vận chuyển phù hợp, đảm bảo an toàn. Để hiểu cụ thể hơn hoặc còn bất kỳ điều gì thắc mắc khách hàng có thể liên hệ với bộ phận CSKH của chúng tôi để được tư vấn, giải đáp.
            </p>
            <h4 className="h4 mb-2">Làm sao để nhận biết trang sức kim cương DHL Diamond giao có phải là sản phẩm mình đã chọn trên website?</h4>
            <p className="text-left mb-3">
                Với mỗi sản phẩm trang sức kim cương DHL Diamond đều có cung cấp kèm theo giấy chứng nhận GIA hoặc IGI. Trên trang sức và trên giấy chứng nhận đều có khắc mã số để khách hàng có thể dễ dàng kiểm tra và so sánh.
            </p>
            <h4 className="h4 mb-2">Làm sao để phân biệt được đâu là trang sức kim cương thật, giả?</h4>
            <p className="text-left mb-3">
                Khi khách hàng mua trang sức kim cương tại DHL Diamond sẽ được hỗ trợ kiểm tra chất lượng kim cương bằng các loại máy móc, thiết bị chuyên dụng. Bên cạnh đó, mỗi sản phẩm đều có giấy kiểm định chất lượng do tổ chức GIA hoặc IGI cấp – đây là 2 cơ quan kiểm định kim cương độc lập, uy tín trên thế giới.
            </p>
            <p className="text-left mb-3 mt-3">
                Trường hợp khách hàng mua hàng online chúng tôi cũng sẽ hỗ trợ kiểm tra chất lượng kim cương tại nhà và có kèm giấy kiểm định sản phẩm.
            </p>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/necklace-size" className="hover:text-accent duration-200 transition-all">Hướng dẫn đo size: Dây chuyền</Link>
        </div>
    )
}

import { Link } from "react-router-dom";

export default function NecklaceSize() {
    return (
        <div className="container lg:mt-10 px-6 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-3">HƯỚNG DẪN ĐO SIZE TRANG SỨC: DÂY CHUYỀN</h3>
            <p className="text-center">
                Dây chuyền hay vòng cổ là một loại trang sức vô cùng được yêu thích, đồng thời cũng là một gợi ý quà tặng rất ý nghĩa. Khi mua dây chuyền ngoài việc chọn mẫu dây chuyền đẹp, phù hợp với người đeo thì bạn còn phải quan tâm cả size dây chuyền. Size dây chuyền vừa vặn với người đeo mới có thể tôn lên vẻ đẹp của cả người đeo lẫn dây chuyền. Nếu bạn chưa biết xác định size dây chuyền như thế nào thì có thể tham khảo hướng dẫn sau!
            </p>
            <img
                src="https://bizweb.dktcdn.net/thumb/1024x1024/100/318/889/products/sd54114-min.jpg?v=1680513659750"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4 h-96"
            />
            <h3 className="h3">
                Hướng dẫn đo kích thước trang sức: Dây chuyền
            </h3>
            <p className="text-accent">
                Cách 1: Đo size dây chuyền bằng thước
            </p>
            <ul className="list-item mt-3 ml-4">
                <li className="list-disc list-inside">Bước 1: Sử dụng thước đo chiều dài của sợi dây chuyền có sẵn.</li>
                <li className="list-disc list-inside">Bước 2: Sau khi đã xác định được kích thước của sợi dây chuyền hãy đối chiếu với kích thước trong hình dưới đây. Kích thước đo được tính theo cm.</li>
                <li className="list-disc list-inside">Bước 3: Kích thước dây chuyền của bạn là số size được ghi dưới đường thẳng. Giờ bạn chỉ cần đối chiếu với size dây chuyền tại DHL Diamond và đặt mua.</li>
            </ul>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/06/bang-size-day-chuyen-vong-co-chuan.jpg"
                alt="Bảng đo size dây chuyền"
                className="mx-auto my-4"
            />
            <p className="text-accent">
                Cách 2: Đo size dây chuyền thủ công
            </p>
            <ul className="list-item mt-3 ml-4">
                <li className="list-disc list-inside">Bước 1: Lấy một tờ giấy A4 và cắt theo chiều dọc thành hình như sợi dây và quấn quanh cổ theo vòng dây muốn đeo rồi đánh dấu điểm giao giữa 2 đầu giấy.</li>
                <li className="list-disc list-inside">Bước 2: Trải mảnh giấy ra mặt phẳng và lấy thước kẻ đo độ dài từ điểm đầu tới điểm đánh dấu trên mảnh giấy.</li>
            </ul>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/06/tham-khao-cac-size-day-chuyen-dep.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <h3 className="h3">
                Độ dài dây chuyền, vòng cổ thông thường hiện nay
            </h3>
            <ul className="list-item mt-3 ml-4">
                <li className="list-disc list-inside">Từ 35 – 40cm: Dây chuyền có kích thước này khi đeo sẽ khá sát với chân cổ nhưng đảm bảo không hề gây khó chịu</li>
                <li className="list-disc list-inside">Từ 45cm: Khi đeo dây chuyền có kích thước này thì sợi dây sẽ chạm tới xương quai đòn. Rất nhiều người thích đeo dây chuyền kích thước này để làm nổi bật phần cổ, xương quai đòn và gương mặt</li>
                <li className="list-disc list-inside">Từ 50 – 55cm: Đeo dây chuyền kích thước này thì sợi dây sẽ nằm ở dưới xương quai đòn nhưng vẫn nằm cách phần ngực khoảng vài cm. Nếu bạn muốn đeo dây chuyền có mặt đi kèm thì nên chọn kích thước này</li>
                <li className="list-disc list-inside">Từ 60cm: Loại dây chuyền này tương đối dài, khi đeo sẽ chạm tới ngang ngực. Nếu bạn mặc các loại trang phục có phần ngực xẻ sâu thì có thể chọn dây chuyền kích thước này</li>
                <li className="list-disc list-inside">Từ 70cm trở lên: Kích thước dây chuyền này rất dài, khi đeo sẽ chạm tới ngang rốn. Thường các mẫu dây chuyền trơn hoặc xâu chuỗi hạt mới có kích thước này. Cũng có một số mẫu dây chuyền kèm mặt dài từ 70cm trở lên nhưng không nhiều</li>
            </ul>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/06/do-dai-day-chuyen-vong-co-pho-bien-hien-nay.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/bracelet-size" className="hover:text-accent duration-200 transition-all">Hướng dẫn đo size: Vòng tay</Link>
        </div>
    )
}

import { Link } from "react-router-dom";

export default function RingSize() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-3">HƯỚNG DẪN CÁCH ĐO NI NHẪN</h3>
            <p className="text-center">
                Để biết rõ hơn về cách chọn nhẫn sao cho phù hợp nhất, bạn cần phải biết chu vi ngón tay của mình. So sánh thông số dưới bảng để biết được kích thước của nhẫn so với ngón tay. Dưới đây là bảng size nhẫn (đường kính trong mm) phổ biến để bạn dễ dàng tham khảo.
            </p>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/09/bang-do-size-nhan.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <p className="text-left">
                Đo size nhẫn bằng giấy và thước
            </p>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-bang-giay-va-thuoc.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <p className="text-left">
                Đo size nhẫn bằng chiếc nhẫn đã có
            </p>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-bang-nhan.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <p className="text-left">
                Bảng Ni nhẫn theo cân nặng, chiều cao Nam và Nữ
            </p>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-size-nhan-theo-chieu-cao-can-nang.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <h4 className="h4">
                Những lưu ý khi tự đo size nhẫn tại nhà
            </h4>
            <ul className="list-item mt-3 ml-4">
                <li className="list-disc list-inside">Khi đo nhẫn hãy lưu ý đến thời tiết, nhiệt độ và đảm bảo đo trong điều kiện bình thường, vì chúng bị ảnh hưởng bởi nhiệt độ</li>
                <li className="list-disc list-inside">Lưu ý độ dày của nhẫn</li>
                <li className="list-disc list-inside">Lưu ý các khớp tay: Hảm bảo rằng nhẫn vẫn thoải mái và dễ đeo</li>
                <li className="list-disc list-inside">Đo kích cỡ nhẫn nhiều lần: Để có kết quả chính xác, nên đo size nhẫn nhiều lần trong ngày và ở trạng thái ngón tay bình thường</li>
                <li className="list-disc list-inside">Size nhẫn nữ và nam có sự chênh lệch</li>
            </ul>
            <img
                src="https://caohungdiamond.com/wp-content/uploads/2022/09/do-day-cua-nhan.jpg"
                alt="Bảng đo size nhẫn"
                className="mx-auto my-4"
            />
            <p className="text-left mb-4">
                Trên đây là toàn bộ thông tin hướng dẫn đo size nhẫn sao cho phù hợp với kích thước tay của mình một cách chuẩn nhất. Hy vọng bài viết có thể mang tới nhiều thông tin bổ ích dành cho bạn. Nếu bạn cần tìm địa chỉ mua nhẫn uy tín và chất lượng cao, hãy đến ngay với DHL Diamond.
            </p>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/necklace-size" className="hover:text-accent duration-200 transition-all">Hướng dẫn đo size: Dây chuyền</Link>
        </div>
    )
}

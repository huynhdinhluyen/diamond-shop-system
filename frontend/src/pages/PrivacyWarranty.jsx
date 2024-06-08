import { Link } from "react-router-dom";

export default function PrivacyWarranty() {
    return (
        <div className="container lg:mt-10 px-4 lg:px-40">
            <h3 className="h3 text-accent text-center uppercase mb-5">CHÍNH SÁCH BẢO HÀNH</h3>
            <h4 className="h4 mb-2">Đối với trang sức kim cương</h4>
            <ul className="list-item ml-4 mb-3">
                <li className="list-disc list-inside">MIỄN PHÍ làm mới, xi, đánh bóng, làm sạch đá trọn đời đối với các sản phẩm Nhẫn, Bông tai, Dây chuyền, Lắc tay.</li>
                <li className="list-disc list-inside">Hỗ trợ gắn lại hột tấm bị rớt hoặc bị mờ.</li>
                <li className="list-disc list-inside">Quý khách nên tới Showroom của DHL Diamond 02 tháng/ lần để vệ sinh trang sức</li>
            </ul>
            <span className="font-semibold mr-2 underline">Xem thêm:</span>
            <Link to="/term-of-use" className="hover:text-accent duration-200 transition-all">Điều khoản sử dụng</Link>
        </div>
    )
}
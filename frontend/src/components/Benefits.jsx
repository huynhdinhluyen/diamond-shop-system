import { Grow, Typography } from "@mui/material";
import { FaTruck, FaCreditCard, FaHeadphones } from "react-icons/fa";

export default function Benefits() {
  return (
    <div className="hidden md:block container mx-auto my-4">
      <div className="flex flex-col md:flex-row justify-evenly space-y-4 md:space-y-0 md:space-x-4 mb-8 md:rounded-b-xl shadow-md overflow-hidden py-5">
        <Grow in={true} timeout={1000}>
          <div className="flex items-center ">
            <FaTruck className="text-orange-500 mr-2" size={24} />
            <div>
              <Typography variant="body1">Miễn phí giao hàng</Typography>
              <Typography variant="body2" className="text-gray-500">
                với hóa đơn trên 50.000.000đ
              </Typography>
            </div>
          </div>
        </Grow>
        <Grow in={true} timeout={1000}>
          <div className="flex items-center">
            <FaCreditCard className="text-blue-500 mr-2" size={24} />
            <div>
              <Typography variant="body1">Thanh toán tối ưu</Typography>
              <Typography variant="body2" className="text-gray-500">
                Chuyển khoản hoặc sau khi nhận hàng
              </Typography>
            </div>
          </div>
        </Grow>
        <Grow in={true} timeout={1000}>
          <div className="flex items-center">
            <FaHeadphones className="text-green-500 mr-2" size={24} />
            <div>
              <Typography variant="body1">Hỗ trợ khách hàng 24/7</Typography>
              <Typography variant="body2" className="text-gray-500">
                Hỗ trợ tận tâm và nhiệt tình
              </Typography>
            </div>
          </div>
        </Grow>
      </div>
    </div>
  );
}

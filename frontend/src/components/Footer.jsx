
import {  Typography, Link, Box } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">

        <div className="md:w-1/4 mb-4 md:mb-0">
          <Typography variant="h6" component="h2" className="font-bold mb-4">
            Thông tin liên hệ
          </Typography>
          <Typography variant="body2" className="mb-2">
            Công ty TNHH Kim Cương DHL
          </Typography>
          <Typography variant="body2" className="mb-2">
            Địa chỉ: 123 Đường XYZ, Quận 1, TP.HCM
          </Typography>
          <Typography variant="body2" className="mb-2">
            Điện thoại: 0987654321
          </Typography>
          <Typography variant="body2">
            Email: dhldiamond@gmail.com
          </Typography>
        </div>

     
        <div className="md:w-1/4 mb-4 md:mb-0">
          <Typography variant="h6" component="h2" className="font-bold mb-4">
            Hỗ trợ khách hàng
          </Typography>
          <ul className="list-none">
            <li className="mb-2">
              <Link href="#" color="inherit">Câu hỏi thường gặp</Link>
            </li>
            <li className="mb-2">
              <Link href="#" color="inherit">Chính sách bảo hành</Link>
            </li>
            <li className="mb-2">
              <Link href="#" color="inherit">Chính sách đổi trả</Link>
            </li>
            <li>
              <Link href="#" color="inherit">Hướng dẫn đặt hàng</Link>
            </li>
          </ul>
        </div>

        <div className="md:w-1/4 mb-4 md:mb-0 text-center md:text-left">
          <Typography variant="h6" component="h2" className="font-bold mb-4">
            Kết nối với chúng tôi
          </Typography>
          <Box className="flex justify-center md:justify-start space-x-4">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} className="text-blue-600" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="text-blue-400" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="text-pink-600" />
            </Link>
          </Box>
        </div>

        <div className="md:w-1/4 text-center md:text-right">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Công ty TNHH Kim Cương DHL
          </Typography>
        </div>
      </div>
    </footer>
  )
}

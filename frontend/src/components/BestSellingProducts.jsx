import { useEffect, useState } from "react";
import { getBestSellingProducts } from "../service/productService";
import { toast } from "react-toastify";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function BestSellingProducts() {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestSellingProducts();
        setBestSellingProducts(data);
      } catch (error) {
        toast.error("Lỗi khi tải sản phẩm bán chạy: " + error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h2 className="font-bold text-xl">Sản Phẩm Bán Chạy</h2>
      <TableContainer
        component={Paper}
        className="mt-4 max-h-[500px] overflow-y-auto"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow className="sticky top-0 z-10 bg-white">
              <TableCell className="!font-bold">Sản Phẩm</TableCell>
              <TableCell align="right" className="!font-bold">
                Số Lượng Đã Bán
              </TableCell>
              <TableCell align="right" className="!font-bold">
                Doanh Thu
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bestSellingProducts.map((item) => (
              <TableRow key={item.productDTO.id}>
                <TableCell component="th" scope="row">
                  <div className="flex items-center">
                    <img
                      src={item.productDTO.imageUrl}
                      alt={item.productDTO.name}
                      className="w-12 h-12 object-cover rounded-full mr-2"
                    />
                    <span className="">{item.productDTO.name}</span>
                  </div>
                </TableCell>
                <TableCell align="right">{item.totalQuantity}</TableCell>
                <TableCell align="right">
                  {item.totalRevenue?.toLocaleString("vi-VN") || "0"} VNĐ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

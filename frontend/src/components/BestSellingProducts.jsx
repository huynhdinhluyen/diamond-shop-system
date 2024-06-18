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
  Typography,
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
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Sản phẩm bán chạy nhất</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="right">Số lượng đã bán</TableCell>
              <TableCell align="right">Doanh thu</TableCell>
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
    </Paper>
  );
}

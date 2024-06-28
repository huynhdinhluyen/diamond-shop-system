import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { getOrderById } from "../service/orderService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import statusTranslations from "../utils/statusTranslations";
import { completeOrder, pickUpOrder } from "../service/orderAssignmentService";
import { toast } from "react-toastify";

export default function OrderDetailOfDeliveryStaff() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const { getProductFromOrder } = useOrder();
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(orderId);
        setOrder(response);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (order) {
      const fetchProducts = async () => {
        try {
          const products = await getProductFromOrder(order);
          setOrderDetails(products);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      };

      fetchProducts();
    }
  }, [order, getProductFromOrder]);

  const handlePickUpOrder = async () => {
    try {
      await pickUpOrder(orderId);
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: { name: "SHIPPING" },
      }));
      toast.success("Đã nhận đơn hàng thành công!");
    } catch (error) {
      console.error("Error picking up order:", error);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      await completeOrder(orderId);
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: { name: "COMPLETED" },
      }));
      navigate("/delivery/orders");
      toast.success("Đã giao hàng thành công!");
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!order) {
    return <Typography variant="h6">Không tìm thấy đơn hàng.</Typography>;
  }
  return (
    <Box className="!p-4 !bg-gray-100">
      <Typography variant="h4" className="!font-bold !mb-4">
        Chi tiết đơn hàng #{order.id}
      </Typography>
      <Paper className="!p-4 !shadow-md !rounded-md bg-white">
        <Typography variant="h6" className="!font-bold !mb-2">
          Thông tin khách hàng
        </Typography>
        <Typography>Tên: {order.customerName}</Typography>
        <Typography>Số điện thoại: {order.phoneNumber}</Typography>
        <Typography>Địa chỉ: {order.shippingAddress}</Typography>
        <Typography variant="h6" className="!font-bold !mt-4 !mb-2">
          Chi tiết đơn hàng
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold">Sản phẩm</TableCell>
                <TableCell className="!text-right !font-bold">
                  Số lượng
                </TableCell>
                <TableCell className="!text-right !font-bold">
                  Đơn giá
                </TableCell>
                <TableCell className="!text-right !font-bold">
                  Thành tiền
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="!text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="!text-right">
                    {product.unitPrice?.toLocaleString() || "0"} VNĐ
                  </TableCell>
                  <TableCell className="!text-right">
                    {(product.unitPrice * product.quantity).toLocaleString() ||
                      "0"}{" "}
                    VNĐ
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="flex flex-col justify-end mt-4 text-right">
          <Typography variant="h6">
            Tổng tiền:{" "}
            <span className="font-bold text-red-600">
              {order.totalPrice?.toLocaleString() || "0"} VNĐ
            </span>
          </Typography>
          <Typography>
            Ngày đặt:{" "}
            <span className="text-gray-700">
              {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                locale: vi,
              })}
            </span>
          </Typography>
          <Typography>
            Trạng thái:{" "}
            <span className="uppercase text-blue-500">
              {statusTranslations[order.status.name] || order.status.name}
            </span>
          </Typography>
          <Typography className="!text-gray-600">
            Ghi chú: {order.note || "Không có"}
          </Typography>
          {(order.status.name === "WAITING_FOR_PICKUP" ||
            order.status.name === "SHIPPING") && (
            <div className="flex gap-4 mt-4 justify-end">
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePickUpOrder}
                disabled={order.status.name !== "WAITING_FOR_PICKUP"}
              >
                Nhận đơn
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={handleCompleteOrder}
                disabled={order.status.name !== "SHIPPING"}
              >
                Đã giao
              </Button>
            </div>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

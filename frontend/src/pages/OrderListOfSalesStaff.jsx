import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  assignOrderToDeliveryStaff,
  cancelOrder,
  confirmOrder,
  getOrdersByStaffId,
} from "../service/orderAssignmentService";
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
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import statusTranslations from "../utils/statusTranslations";

export default function OrderListOfSalesStaff() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await getOrdersByStaffId(user.id);
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const handleConfirmOrder = async (orderId) => {
    try {
      await confirmOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "CONFIRMED" } : order
        )
      );
      fetchOrders();
      toast.success("Đã xác nhận đơn hàng thành công!");
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

const handleAssignOrderToDeliveryStaff = async (orderId) => {
    try {
      await assignOrderToDeliveryStaff(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "WAITING_FOR_PICKUP" } : order
        )
      );
      fetchOrders();
      toast.success("Đã bàn giao đơn hàng thành công!");
    } catch (error) {
      console.error("Error assign order:", error);
    }
}

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      fetchOrders();
      toast.success("Đã hủy đơn hàng thành công!");
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <Box className="p-4 bg-gray-100">
      <Typography variant="h4" className="!font-bold !mb-4">
        Danh sách đơn hàng của bạn
      </Typography>

      <p className="text-red-600 mb-4">* Hãy kiểm tra đơn hàng cẩn thận trước khi xuất sản phẩm và bàn giao</p>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          className="shadow-md rounded-md bg-white"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Số điện thoại khách hàng</TableCell>
                <TableCell className="!text-right">Tổng tiền</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Trạng thái đơn hàng</TableCell>
                <TableCell className="!text-center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order.id}>
                  <TableCell>
                    <Link
                      to={`/sales-staff/orders/${order.order.id}`}
                      className="hover:cursor-pointer underline"
                    >
                      #{order.order.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(order.order.createdAt),
                      "dd/MM/yyyy HH:mm",
                      { locale: vi }
                    )}
                  </TableCell>
                  <TableCell>{order.order.customerName}</TableCell>
                  <TableCell>{order.order.phoneNumber}</TableCell>
                  <TableCell className="!text-right">
                    {order.order.totalPrice?.toLocaleString("vi-VN") || "0"} VNĐ
                  </TableCell>
                  <TableCell className="!italic">
                    {order.order?.note || "Không có"}
                  </TableCell>
                  <TableCell>
                    {statusTranslations[order.orderStatus.name] ||
                      order.orderStatus.name}
                  </TableCell>
                  <TableCell>
                    {order.orderStatus.name === "PENDING" && (
                      <div className="flex justify-center gap-4">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleConfirmOrder(order.order.id)}
                        >
                          Xác nhận
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelOrder(order.order.id)}
                        >
                          Hủy
                        </Button>
                      </div>
                    )}
                    {order.orderStatus.name === "CONFIRMED" && (
                      <div className="flex justify-center gap-4">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleAssignOrderToDeliveryStaff(order.order.id)}
                        >
                          Bàn giao
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelOrder(order.order.id)}
                        >
                          Hủy
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

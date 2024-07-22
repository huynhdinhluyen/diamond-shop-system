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
  TableSortLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
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
  const [sortBy, setSortBy] = useState("status.name");
  const [sortOrder, setSortOrder] = useState("des");
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersByStaffId(user.id);
      console.log(orders)
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
          order.id === orderId
            ? { ...order, status: "WAITING_FOR_PICKUP" }
            : order
        )
      );
      fetchOrders();
      toast.success("Đã bàn giao đơn hàng thành công!");
    } catch (error) {
      console.error("Error assign order:", error);
    }
  };

  const handleOpenCancelDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenCancelDialog(true);
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(selectedOrderId, cancelReason);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== selectedOrderId)
      );
      fetchOrders();
      toast.success("Đã hủy đơn hàng thành công!");
    } catch (error) {
      toast.error("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
      console.error("Error cancelling order:", error);
    } finally {
      setOpenCancelDialog(false);
    }
  };

  const compareBy = (a, b, orderBy) => {
    let aValue = a.order[orderBy];
    let bValue = b.order[orderBy];

    // Ưu tiên sắp xếp theo trạng thái CONFIRMED và PENDING
    if (
      a.orderStatus.name === "CONFIRMED" &&
      b.orderStatus.name !== "CONFIRMED"
    ) {
      return -1; // Đơn hàng CONFIRMED lên trước
    }
    if (
      a.orderStatus.name !== "CONFIRMED" &&
      b.orderStatus.name === "CONFIRMED"
    ) {
      return 1; // Đơn hàng CONFIRMED lên trước
    }
    if (a.orderStatus.name === "PENDING" && b.orderStatus.name !== "PENDING") {
      return -1; // Đơn hàng PENDING lên trước
    }
    if (a.orderStatus.name !== "PENDING" && b.orderStatus.name === "PENDING") {
      return 1; // Đơn hàng PENDING lên trước
    }

    // Nếu cùng trạng thái CONFIRMED, PENDING hoặc không phải cả hai, thì sắp xếp theo tiêu chí khác
    if (orderBy === "createdAt") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  };

  const sortedOrders = orders.sort((a, b) => compareBy(a, b, sortBy));

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const reasons = [
    'Khách hàng yêu cầu hủy',
    'Thông tin khách hàng không chính xác',
    'Sản phẩm không còn trong kho',
    'Các lý do khác'
  ];

  return (
    <Box className="p-4 bg-gray-100">
      <Typography variant="h4" className="!font-bold text-nowrap !mb-4">
        Danh sách đơn hàng của bạn
      </Typography>

      <p className="text-red-600 mb-4">
        * Hãy kiểm tra đơn hàng cẩn thận trước khi xuất sản phẩm và bàn giao
      </p>

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
                <TableCell className="!font-bold text-nowrap">Mã Đơn Hàng</TableCell>
                <TableCell className="!font-bold text-nowrap">
                  {" "}
                  <TableSortLabel
                    active={sortBy === "createdAt"}
                    direction={sortOrder}
                    onClick={() => handleSort("createdAt")}
                  >
                    Thời Gian Đặt Hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!font-bold text-nowrap">Tên Khách Hàng</TableCell>
                <TableCell className="!font-bold text-nowrap">Số Điện Thoại</TableCell>
                <TableCell className="!text-right !font-bold text-nowrap">
                  Tổng Tiền
                </TableCell>
                <TableCell className="!font-bold text-nowrap">
                  Trạng Thái Giao Dịch
                </TableCell>
                <TableCell className="!font-bold text-nowrap">Ghi Chú</TableCell>
                <TableCell className="!font-bold text-nowrap">
                  <TableSortLabel
                    active={sortBy === "orderStatus.name"}
                    direction={sortOrder}
                    onClick={() => handleSort("orderStatus.name")}
                  >
                    Trạng Thái Đơn Hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-center !font-bold text-nowrap">
                  Hành Động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => (
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
                  <TableCell className="text-nowrap">{order.order.customerName}</TableCell>
                  <TableCell className="text-nowrap">{order.order.phoneNumber}</TableCell>
                  <TableCell className="!text-right text-nowrap">
                    {order.order.totalPrice?.toLocaleString("vi-VN") || "0"} VNĐ
                  </TableCell>
                  {order.order.transaction.status === "INCOMPLETE" && (
                    <TableCell className="text-nowrap">Chưa thanh toán</TableCell>
                  )}
                  {order.order.transaction.status === "COMPLETE" && (
                    <TableCell className="text-nowrap">Đã thanh toán</TableCell>
                  )}
                  <TableCell className="!italic text-nowrap">
                    {order.order?.note || "Không có"}
                  </TableCell>
                  <TableCell>
                    {order.orderStatus.name === 'CANCELLED'
                      ? `${statusTranslations[order.orderStatus.name] || order.orderStatus.name} (Lý do: ${order.order.cancelReason === null ? "Không có" : order.order.cancelReason})`
                      : statusTranslations[order.orderStatus.name] || order.orderStatus.name}
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
                          onClick={() => handleOpenCancelDialog(order.order.id)}
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
                          onClick={() =>
                            handleAssignOrderToDeliveryStaff(order.order.id)
                          }
                        >
                          Bàn giao
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenCancelDialog(order.order.id)}
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
      <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
        <DialogTitle>Chọn lý do hủy đơn hàng</DialogTitle>
        <DialogContent>
          <RadioGroup value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
            {reasons.map((reason, index) => (
              <FormControlLabel key={index} value={reason} control={<Radio />} label={reason} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)} color="primary">
            Đóng
          </Button>
          <Button onClick={handleCancelOrder} color="secondary" disabled={!cancelReason}>
            Xác nhận hủy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

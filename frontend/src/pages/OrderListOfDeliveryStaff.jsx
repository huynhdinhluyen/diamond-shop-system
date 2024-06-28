import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import {
  getOrdersByStaffId,
  completeOrder,
  pickUpOrder,
} from "../service/orderAssignmentService";
import { toast } from "react-toastify";
import statusTranslations from "../utils/statusTranslations";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

export default function OrderListOfDeliveryStaff() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState("status.name");
  const [sortOrder, setSortOrder] = useState("des");

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

  const handlePickUpOrder = async (orderId) => {
    try {
      await pickUpOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "SHIPPING" } : order
        )
      );
      fetchOrders();
      toast.success("Đã nhận đơn hàng thành công!");
    } catch (error) {
      console.error("Error picking up order:", error);
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      await completeOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "COMPLETED" } : order
        )
      );
      fetchOrders();
      toast.success("Đã giao hàng thành công!");
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const compareBy = (a, b, orderBy) => {
    let aValue = a.order[orderBy];
    let bValue = b.order[orderBy];

    if (
      a.orderStatus.name === "SHIPPING" &&
      b.orderStatus.name !== "SHIPPING"
    ) {
      return -1;
    }
    if (
      a.orderStatus.name !== "SHIPPING" &&
      b.orderStatus.name === "SHIPPING"
    ) {
      return 1;
    }
    if (
      a.orderStatus.name === "WAITING_FOR_PICKUP" &&
      b.orderStatus.name !== "WAITING_FOR_PICKUP"
    ) {
      return -1;
    }
    if (
      a.orderStatus.name !== "WAITING_FOR_PICKUP" &&
      b.orderStatus.name === "WAITING_FOR_PICKUP"
    ) {
      return 1;
    }
    if (
      a.orderStatus.name === "COMPLETED" &&
      b.orderStatus.name !== "COMPLETED"
    ) {
      return -1;
    }
    if (
      a.orderStatus.name !== "COMPLETED" &&
      b.orderStatus.name === "COMPLETED"
    ) {
      return 1;
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

  return (
    <Box className="p-4 bg-gray-100">
      <Typography variant="h4" className="!font-bold !mb-4">
        Danh sách đơn hàng cần giao
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          className="!shadow-md !rounded-md bg-white !mt-4"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Địa chỉ giao hàng</TableCell>
                <TableCell>Số điện thoại khách hàng</TableCell>
                <TableCell>Thời gian đặt hàng</TableCell>
                <TableCell className="!text-right">Tổng tiền</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "orderStatus.name"}
                    direction={sortOrder}
                    onClick={() => handleSort("orderStatus.name")}
                  >
                    Trạng thái đơn hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow key={order.order.id}>
                  <TableCell>
                    <Link
                      to={`/delivery/orders/${order.order.id}`}
                      className="hover:cursor-pointer underline"
                    >
                      #{order.order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.order.customerName}</TableCell>
                  <TableCell>{order.order.shippingAddress}</TableCell>
                  <TableCell>{order.order.phoneNumber}</TableCell>
                  <TableCell>
                    {format(
                      new Date(order.order.createdAt),
                      "dd/MM/yyyy HH:mm",
                      { locale: vi }
                    )}
                  </TableCell>
                  <TableCell className="!text-right">
                    {order.order.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </TableCell>
                  <TableCell>
                    {statusTranslations[order.orderStatus.name] ||
                      order.orderStatus.name}
                  </TableCell>
                  <TableCell className="!flex !justify-center !gap-4">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handlePickUpOrder(order.order.id)}
                      disabled={order.orderStatus.name !== "WAITING_FOR_PICKUP"}
                    >
                      Nhận đơn
                    </Button>

                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleCompleteOrder(order.order.id)}
                      disabled={order.orderStatus.name !== "SHIPPING"}
                    >
                      Đã giao
                    </Button>
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

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";
import statusTranslations from "../utils/statusTranslations";
import { getUserByRole } from "../service/userService";
import { toast } from "react-toastify";
import {
  getOrderAssignments,
  reassignOrderToAnotherSalesStaff,
} from "../service/orderAssignmentService";

export default function OrderListOfAdmin() {
  const [orders, setOrders] = useState([]);
  const [salesStaffs, setSalesStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("status.name");
  const [sortOrder, setSortOrder] = useState("desc");
  const [openReassignDialog, setOpenReassignDialog] = useState(false);
  const [selectedOldStaffId, setSelectedOldStaffId] = useState(null);
  const [selectedNewStaffId, setSelectedNewStaffId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await getOrderAssignments();
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Lỗi khi tải danh sách đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSalesStaffs = async () => {
    try {
      const response = await getUserByRole("SALES_STAFF");
      setSalesStaffs(response);
    } catch (error) {
      console.error("Error fetching sales staffs:", error);
      toast.error("Lỗi khi tải danh sách nhân viên bán hàng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchSalesStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleOpenReassignDialog = (orderId, oldStaffId) => {
    setSelectedOrderId(orderId);
    setSelectedOldStaffId(oldStaffId);
    setOpenReassignDialog(true);
  };

  const handleCloseReassignDialog = () => {
    setOpenReassignDialog(false);
    setSelectedOrderId(null);
    setSelectedOldStaffId(null);
    setSelectedNewStaffId(null);
  };

  const handleReassign = async () => {
    try {
      await reassignOrderToAnotherSalesStaff(
        selectedOrderId,
        selectedOldStaffId,
        selectedNewStaffId
      );
      toast.success("Giao lại đơn hàng thành công");
      fetchOrders();
      handleCloseReassignDialog();
    } catch (error) {
      toast.error("Lỗi khi giao lại đơn hàng");
    }
  };

  return (
    <Box className="p-4 bg-gray-100">
      <Typography variant="h4" className="!font-bold !mb-4">
        Danh sách toàn bộ đơn hàng
      </Typography>

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
                <TableCell className="!font-bold">Mã đơn hàng</TableCell>
                <TableCell className="!font-bold">
                  <TableSortLabel
                    active={sortBy === "createdAt"}
                    direction={sortOrder}
                    onClick={() => handleSort("createdAt")}
                  >
                    Thời gian đặt hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!font-bold">Tên khách hàng</TableCell>
                <TableCell className="!text-right !font-bold">
                  Tổng tiền
                </TableCell>
                <TableCell className="!font-bold">Nhân Viên Xử Lí</TableCell>
                <TableCell className="!font-bold">
                  <TableSortLabel
                    active={sortBy === "status.name"}
                    direction={sortOrder}
                    onClick={() => handleSort("status.name")}
                  >
                    Trạng thái đơn hàng
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedOrders.map((orderAssignment) => (
                <TableRow key={orderAssignment.id}>
                  <TableCell>
                    <Link
                      to={`/manager/orders/${orderAssignment.order.id}`}
                      className="hover:cursor-pointer underline"
                    >
                      #{orderAssignment.order.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {format(
                      new Date(orderAssignment.order.createdAt),
                      "dd/MM/yyyy HH:mm",
                      {
                        locale: vi,
                      }
                    )}
                  </TableCell>
                  <TableCell>{orderAssignment.order.customerName}</TableCell>
                  <TableCell className="!text-right">
                    {orderAssignment.order.totalPrice?.toLocaleString(
                      "vi-VN"
                    ) || "0"}{" "}
                    VNĐ
                  </TableCell>
                  <TableCell>
                    {orderAssignment.staff.lastName}{" "}
                    {orderAssignment.staff.firstName}
                  </TableCell>
                  <TableCell>
                    {statusTranslations[orderAssignment.orderStatus.name] ||
                      orderAssignment.orderStatus.name}
                  </TableCell>
                  <TableCell>
                    {(orderAssignment.orderStatus.name === "PENDING" ||
                      orderAssignment.orderStatus.name === "CONFIRMED") && (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleOpenReassignDialog(
                            orderAssignment.order.id,
                            orderAssignment.staff.id
                          )
                        }
                      >
                        Giao cho nhân viên khác
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={openReassignDialog} onClose={handleCloseReassignDialog}>
        <DialogTitle>Giao Lại Đơn Hàng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng chọn nhân viên bán hàng mới để giao lại các đơn hàng.
          </DialogContentText>
          <Select
            value={selectedNewStaffId}
            onChange={(e) => setSelectedNewStaffId(e.target.value)}
            className="!mt-4 !w-full"
            displayEmpty
            inputProps={{ "aria-label": "Chọn nhân viên mới" }}
          >
            {salesStaffs
              .filter((staff) => staff.id !== selectedOldStaffId)
              .map((staff) => (
                <MenuItem key={staff.id} value={staff.id}>
                  {staff.lastName} {staff.firstName}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReassignDialog}>Hủy</Button>
          <Button onClick={handleReassign} variant="contained" color="primary">
            Giao Lại
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

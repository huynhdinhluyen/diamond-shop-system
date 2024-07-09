import { useEffect, useState } from "react";
import {
    Box,
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
} from "@mui/material";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";
import statusTranslations from "../utils/statusTranslations";
import { getAllOrder } from "../service/orderService";

export default function OrderListOfManager() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState("status.name");
    const [sortOrder, setSortOrder] = useState("desc");

    const fetchOrders = async () => {
        try {
            const response = await getAllOrder();
            setOrders(response);
            console.log(response)
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const compareBy = (a, b, orderBy) => {
        let aValue = a[orderBy];
        let bValue = b[orderBy];

        // Prioritize sorting by status
        if (
            a.status.name === "CONFIRMED" &&
            b.status.name !== "CONFIRMED"
        ) {
            return -1; // CONFIRMED orders first
        }
        if (
            a.status.name !== "CONFIRMED" &&
            b.status.name === "CONFIRMED"
        ) {
            return 1; // CONFIRMED orders first
        }
        if (a.status.name === "PENDING" && b.status.name !== "PENDING") {
            return -1; // PENDING orders first
        }
        if (a.status.name !== "PENDING" && b.status.name === "PENDING") {
            return 1; // PENDING orders first
        }

        // Sort by other criteria if not by status
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
                                <TableCell className="!font-bold">Số điện thoại</TableCell>
                                <TableCell className="!text-center !font-bold">
                                    Tổng tiền
                                </TableCell>
                                <TableCell className="!font-bold">Trạng thái giao dịch</TableCell>
                                <TableCell className="!font-bold">
                                    <TableSortLabel
                                        active={sortBy === "status.name"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("status.name")}
                                    >
                                        Trạng thái đơn hàng
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <Link
                                            to={`/manager/orders/${order.id}`}
                                            className="hover:cursor-pointer underline"
                                        >
                                            #{order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(order.createdAt),
                                            "dd/MM/yyyy HH:mm",
                                            { locale: vi }
                                        )}
                                    </TableCell>
                                    <TableCell>{order.customerName}</TableCell>
                                    <TableCell>{order.phoneNumber}</TableCell>
                                    <TableCell className="!text-right">
                                        {order.totalPrice?.toLocaleString("vi-VN") || "0"} VNĐ
                                    </TableCell>
                                    {order.transaction.status === "INCOMPLETE" && (
                                        <TableCell>Chưa thanh toán</TableCell>
                                    )}
                                    {order.transaction.status === "COMPLETE" && (
                                        <TableCell>Đã thanh toán</TableCell>
                                    )}
                                    <TableCell>
                                        {statusTranslations[order.status.name] ||
                                            order.status.name}
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

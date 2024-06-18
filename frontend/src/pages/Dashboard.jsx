/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import { getDashboardData } from "../service/dashboardService";
import Dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import BestSellingProducts from "../components/BestSellingProducts";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const monthlySalesData =
    dashboardData && dashboardData.monthlySales
      ? Object.entries(dashboardData.monthlySales)
          .sort(([monthYearA], [monthYearB]) => {
            // Parse the month and year values as integers
            const [monthA, yearA] = monthYearA.split("/").map(Number);
            const [monthB, yearB] = monthYearB.split("/").map(Number);

            // Combine month and year into a single numeric value for comparison
            const dateA = yearA * 12 + monthA;
            const dateB = yearB * 12 + monthB;

            return dateA - dateB; // Sort based on combined numeric value
          })
          .map(([month, sales]) => ({ month, sales }))
      : [];

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  const fetchData = async (startDate, endDate) => {
    setIsLoading(true);
    try {
      const formattedStartDate = startDate
        ? startDate.format("YYYY-MM-DD")
        : null;
      const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : null;
      const data = await getDashboardData(formattedStartDate, formattedEndDate); // Gọi API với khoảng thời gian
      setDashboardData(data);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const pieChartColors = ["#8884d8", "#82ca9d", "#ffc658", "#FF8042"];
  return (
    <div className="mt-8">
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading data: {error.message}
        </Typography>
      ) : (
        <>
          <Typography variant="h5" component="h2" className="!font-bold !mb-4">
            Tổng quan
          </Typography>

          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            <Paper elevation={3} className="p-4 rounded-lg basis-0 flex-grow">
              <Typography variant="h6">Tổng số đơn hàng</Typography>
              <Typography variant="h4">{dashboardData.totalOrders}</Typography>
            </Paper>
            <Paper elevation={3} className="p-4 rounded-lg basis-0 flex-grow">
              <Typography variant="h6">Tổng số khách hàng</Typography>
              <Typography variant="h4">
                {dashboardData.totalCustomers}
              </Typography>
            </Paper>
            <Paper elevation={3} className="p-4 rounded-lg basis-0 flex-grow">
              <Typography variant="h6">Tổng doanh thu</Typography>
              <Typography variant="h4">
                {dashboardData.totalRevenue?.toLocaleString("vi-VN") || "0"} VNĐ
              </Typography>
            </Paper>
            <Paper elevation={3} className="p-4 rounded-lg basis-0 flex-grow">
              <Typography variant="h6">Số lượng sản phẩm</Typography>
              <Typography variant="h4">
                {dashboardData.totalProducts}
              </Typography>
            </Paper>
            <Paper elevation={3} className="p-4 rounded-lg basis-0 flex-grow">
              <Typography variant="h6">Sản phẩm sắp hết hàng</Typography>
              <Typography variant="h4">
                {dashboardData.lowStockProducts}
              </Typography>
            </Paper>
          </div>

          <div className="mt-8 w-full">
            <Typography variant="h6" className="mb-2">
              Doanh số bán hàng theo tháng
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: "small" } }} // Use slots for textField properties
                className="!m-4"
              />
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: "small" } }}
                className="!m-4"
              />
            </LocalizationProvider>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySalesData} margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" allowDuplicatedCategory={false} />
                <YAxis
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("vi-VN").format(value)
                  }
                />
                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat("vi-VN").format(value)
                  }
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 w-full">
            <Typography variant="h6" className="mb-2">
              Tỉ lệ đóng góp doanh thu theo danh mục
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(dashboardData.categoryRevenue).map(
                    ([name, value]) => ({ name, value })
                  )}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {Object.entries(dashboardData.categoryRevenue).map(
                    ([name, value], index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={pieChartColors[index % pieChartColors.length]}
                      />
                    )
                  )}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Grid item xs={12} className="!my-4">
            <BestSellingProducts />
          </Grid>
        </>
      )}
    </div>
  );
}

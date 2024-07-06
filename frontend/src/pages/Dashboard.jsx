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
import {
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
} from "@mui/icons-material";
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

  const formatNumber = (number) => {
    return `${new Intl.NumberFormat("vi-VN").format(number)} VNĐ`;
  };

  return (
    <div className="mt-4">
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading data: {error.message}
        </Typography>
      ) : (
        <div className="flex flex-col">
          <div className="font-bold font-sans text-3xl text-black mb-4">TỔNG QUAN</div>
          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            <div className="p-4 rounded-lg basis-0 flex flex-grow justify-between border-2 shadow-md">
              <div>
                <Typography variant="h6">Tổng Số Đơn Hàng</Typography>
                <Typography variant="h4">
                  {dashboardData.totalOrders}
                </Typography>
              </div>
              <div>
                {" "}
                <ShoppingCart fontSize="medium" />
              </div>
            </div>
            <div className="p-4 rounded-lg basis-0 flex flex-grow justify-between border-2 shadow-md">
              <div>
                <Typography variant="h6">Tổng Số Khách Hàng</Typography>
                <Typography variant="h4">
                  {dashboardData.totalCustomers}
                </Typography>
              </div>
              <div>
                <People fontSize="medium" />
              </div>
            </div>
            <div className="p-4 rounded-lg basis-0 flex flex-grow justify-between border-2 shadow-md">
              <div>
                <Typography variant="h6">Tổng Doanh Thu</Typography>
                <Typography variant="h4">
                  {dashboardData.totalRevenue?.toLocaleString("vi-VN") || "0"}{" "}
                  <span className="text-lg">VNĐ</span>
                </Typography>
              </div>
              <div>
                <AttachMoney fontSize="medium" />
              </div>
            </div>
            <div className="p-4 rounded-lg basis-0 flex flex-grow justify-between border-2 shadow-md">
              <div>
                <Typography variant="h6">Số Lượng Sản Phẩm</Typography>
                <Typography variant="h4">
                  {dashboardData.totalProducts}
                </Typography>
              </div>
              <div>
                <Inventory fontSize="medium" />
              </div>
            </div>
          </div>

          <div className="mt-8 w-full flex md:flex-row flex-col justify-between">
            <div className="md:w-[60%] w-full border-2 shadow-md rounded-lg md:mb-0 mb-8">
              <h2 className="font-bold text-xl my-4 pl-4">
                Doanh Số Bán Hàng Theo Tháng
              </h2>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider> */}
              <div className="mx-0 pt-4">
                <ResponsiveContainer width="95%" height={300}>
                  <LineChart data={monthlySalesData} margin={{ left: 32 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      width={100}
                      dataKey="month"
                      allowDuplicatedCategory={false}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("vi-VN").format(value)
                      }
                      width={80} // Điều chỉnh width của trục Y
                      type="number" // Đảm bảo kiểu dữ liệu là number
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
            </div>
            <div className="border-2 shadow-md rounded-lg md:w-[36%] w-full">
              <h2 className="font-bold text-xl my-4 px-4 mx-0">
                Tỉ Lệ Đóng Góp Doanh Thu Theo Danh Mục
              </h2>
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
                    label={({ name, value }) => `${formatNumber(value)}`}
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
                  <Tooltip formatter={(value) => formatNumber(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="my-8 border-2 shadow-md rounded-lg p-4">
            <BestSellingProducts />
          </div>
        </div>
      )}
    </div>
  );
}

import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getMonlySalesOfSalesStaff } from "../service/dashboardService";
import { Link } from "react-router-dom";

export default function SalesStaffDashboard() {
  const [monthlySales, setMonthlySales] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const monthlySalesResponse = await getMonlySalesOfSalesStaff(user.id);
        setMonthlySales(monthlySalesResponse);
      } catch (error) {
        console.error("Error fetching monthly sales of sales staff:", error);
      }
    };
    fetchMonthlySales();
  }, [user.id]);

  return (
    <Box className="p-4 bg-gray-100">
      <Typography variant="h4" className=" !font-bold !mb-4">
        Xin chào, {user.lastName} {user.firstName}! Chúc bạn ngày mới làm việc
        tích cực &#128516;!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Link to="/sales-staff/orders">
            <Paper className="p-4 shadow-md rounded-md bg-white">
              <Typography variant="h6" className="text-black font-bold">
                Đơn hàng mới
              </Typography>
              <Typography variant="h5" className="text-black">
                {monthlySales.numberOfNewOrders || 0}
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

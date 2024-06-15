import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  createUser,
  deleteUser,
  getUserByRole,
  updateUser,
} from "../service/userService";
import { toast } from "react-toastify";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const roleOptions = [
  { value: "SALES_STAFF", label: "Nhân viên bán hàng" },
  { value: "DELIVERY_STAFF", label: "Nhân viên giao hàng" },
  { value: "MANAGER", label: "Quản lý" },
];

const salesStaffSchema = yup.object({
  username: yup.string().required("Tên người dùng không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Số điện thoại phải là số")
    .required("Số điện thoại không được để trống"),
  firstName: yup.string().required("Họ không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  city: yup.string().optional(),
  address: yup.string().optional(),
  roleName: yup.string().default("SALES_STAFF"),
});

export default function SaleStaffManagement() {
  const [salesStaffs, setSalesStaffs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSalesStaff, setSelectedSalesStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(salesStaffSchema),
    defaultValues: {
      roleName: "SALES_STAFF",
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSalesStaffs = salesStaffs.filter(
    (salesStaff) =>
      salesStaff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesStaff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesStaff.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesStaff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salesStaff.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const salesStaffData = await getUserByRole("SALES_STAFF");
      setSalesStaffs(salesStaffData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu nhân viên bán hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (salesStaff = null) => {
    setSelectedSalesStaff(salesStaff);
    reset(salesStaff || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSalesStaff(null);
    reset();
    fetchData();
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedSalesStaff) {
        await updateUser(selectedSalesStaff.id, data);
        toast.success("Cập nhật thành công");
      } else {
        await createUser(data);
        toast.success("Tạo tài khoản nhân viên bán hàng thành công");
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error("Lỗi khi lưu thông tin");
    }
  };

  const handleDeleteSalesStaff = async (salesStaffId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        await deleteUser(salesStaffId);
        fetchData();
        toast.success("Xóa nhân viên thành công");
      } catch (error) {
        toast.error("Lỗi khi xóa tài khoản nhân viên này");
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý nhân viên bán hàng
      </Typography>

      <TextField
        label="Tìm kiếm nhân viên bán hàng"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className="w-full !my-4"
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        className="!mt-4"
      >
        Thêm nhân viên
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading data: {error.message}
        </Typography>
      ) : (
        <TableContainer component={Paper} className="!mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!text-center">ID</TableCell>
                <TableCell className="!text-center">Username</TableCell>
                <TableCell className="!text-center">Email</TableCell>
                <TableCell className="!text-center">Số điện thoại</TableCell>
                <TableCell className="!text-center">Họ</TableCell>
                <TableCell className="!text-center">Tên</TableCell>
                <TableCell className="!text-center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSalesStaffs.map((salesStaff) => (
                <TableRow key={salesStaff.id}>
                  <TableCell className="!text-center">
                    {salesStaff.id}
                  </TableCell>
                  <TableCell className="!text-center">
                    {salesStaff.username}
                  </TableCell>
                  <TableCell className="!text-center">
                    {salesStaff.email}
                  </TableCell>
                  <TableCell className="!text-center">
                    {salesStaff.phoneNumber}
                  </TableCell>
                  <TableCell className="!text-center">
                    {salesStaff.lastName}
                  </TableCell>
                  <TableCell className="!text-center">
                    {salesStaff.firstName}
                  </TableCell>
                  <TableCell className="!flex !justify-evenly">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(salesStaff)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteSalesStaff(salesStaff.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedSalesStaff
            ? "Chỉnh sửa thông tin nhân viên"
            : "Thêm nhân viên"}
        </DialogTitle>
        <DialogContent>
          {selectedSalesStaff ? (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors?.username?.message}
                className="!my-4"
              />
              <TextField
                label="Mật khẩu"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors?.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message}
                className="!my-4"
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                margin="normal"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                className="!my-4"
              />
              <TextField
                label="Họ"
                fullWidth
                margin="normal"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
                className="!my-4"
              />
              <TextField
                label="Tên"
                fullWidth
                margin="normal"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
                className="!my-4"
              />
              <TextField
                label="Thành phố"
                fullWidth
                margin="normal"
                {...register("city")}
                error={!!errors.city}
                helperText={errors?.city?.message}
                className="!my-4"
              />
              <TextField
                label="Địa chỉ"
                fullWidth
                margin="normal"
                {...register("address")}
                error={!!errors.address}
                helperText={errors?.address?.message}
                className="!my-4"
              />
              <FormControl fullWidth>
                <InputLabel id="roleName-label">Vai trò</InputLabel>
                <Select
                  labelId="roleName-label"
                  id="roleName"
                  {...register("roleName")}
                  defaultValue={selectedSalesStaff?.role || ""}
                  input={<OutlinedInput label="Vai trò" />}
                  error={!!errors.roleName}
                >
                  {roleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!errors.roleName}>
                  {errors?.roleName?.message}
                </FormHelperText>
              </FormControl>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Hủy</Button>
                <Button type="submit" variant="contained" color="primary">
                  Lưu
                </Button>
              </DialogActions>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors?.username?.message}
                className="!my-4"
              />
              <TextField
                label="Mật khẩu"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors?.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors?.email?.message}
                className="!my-4"
              />
              <TextField
                label="Số điện thoại"
                fullWidth
                margin="normal"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                className="!my-4"
              />
              <TextField
                label="Họ"
                fullWidth
                margin="normal"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
                className="!my-4"
              />
              <TextField
                label="Tên"
                fullWidth
                margin="normal"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
                className="!my-4"
              />
              <TextField
                label="Thành phố"
                fullWidth
                margin="normal"
                {...register("city")}
                error={!!errors.city}
                helperText={errors?.city?.message}
                className="!my-4"
              />
              <TextField
                label="Địa chỉ"
                fullWidth
                margin="normal"
                {...register("address")}
                error={!!errors.address}
                helperText={errors?.address?.message}
                className="!my-4"
              />
              <DialogActions>
                <Button onClick={handleCloseDialog}>Hủy</Button>
                <Button type="submit" variant="contained" color="primary">
                  Thêm
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

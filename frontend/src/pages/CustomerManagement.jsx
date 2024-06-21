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
  DialogContentText,
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
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { highlightText } from "../utils/highlightText";

const roleOptions = [
  { value: "SALES_STAFF", label: "Nhân viên bán hàng" },
  { value: "DELIVERY_STAFF", label: "Nhân viên giao hàng" },
  { value: "CUSTOMER", label: "Khách hàng" },
  { value: "MANAGER", label: "Quản lý" },
];

const customerSchema = yup.object({
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
  roleName: yup.string().optional(),
});

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const customerData = await getUserByRole("CUSTOMER");
      setCustomers(customerData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu khách hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (customer = null) => {
    setSelectedCustomer(customer);
    reset(customer || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCustomer(null);
    reset();
    fetchData();
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedCustomer) {
        await updateUser(selectedCustomer.id, data);
        toast.success("Cập nhật thành công");
      } else {
        await createUser(data);
        toast.success("Tạo tài khoản khách hàng thành công");
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error("Lỗi khi lưu thông tin");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setUserIdToDelete(userId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(userIdToDelete);
      fetchData();
      toast.success("Xóa khách hàng thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa khách hàng");
    } finally {
      setOpenConfirmDialog(false);
      setUserIdToDelete(null);
    }
  };

  const sortedUsers = [...filteredCustomers].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý khách hàng
      </Typography>

      <TextField
        label="Tìm kiếm khách hàng"
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
        Thêm khách hàng
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading data: {error.message}
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          className="mt-4 max-h-[500px] overflow-y-auto"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow className="sticky top-0 z-10 bg-white">
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "id"}
                    direction={sortOrder}
                    onClick={() => handleSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "username"}
                    direction={sortOrder}
                    onClick={() => handleSort("username")}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "email"}
                    direction={sortOrder}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "phoneNumber"}
                    direction={sortOrder}
                    onClick={() => handleSort("phoneNumber")}
                  >
                    Số điện thoại
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "lastName"}
                    direction={sortOrder}
                    onClick={() => handleSort("lastName")}
                  >
                    Họ
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "firstName"}
                    direction={sortOrder}
                    onClick={() => handleSort("firstName")}
                  >
                    Tên
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    {highlightText(customer.username, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(customer.email, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(customer.phoneNumber, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(customer.lastName, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(customer.firstName, searchTerm)}
                  </TableCell>
                  <TableCell className="!flex !justify-evenly">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(customer)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(customer.id)}
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
          {selectedCustomer
            ? "Chỉnh sửa thông tin khách hàng"
            : "Thêm khách hàng"}
        </DialogTitle>
        <DialogContent>
          {selectedCustomer ? (
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
                  defaultValue={selectedCustomer?.role || ""}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Lưu"}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Thêm"}
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa người dùng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
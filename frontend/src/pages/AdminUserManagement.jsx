import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  OutlinedInput,
  DialogContentText,
  TableSortLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../service/userService";
import { highlightText } from "../utils/highlightText";

const roleOptions = [
  { value: "ADMIN", label: "Quản trị viên" },
  { value: "SALES_STAFF", label: "Nhân viên bán hàng" },
  { value: "DELIVERY_STAFF", label: "Nhân viên giao hàng" },
  { value: "CUSTOMER", label: "Khách hàng" },
  { value: "MANAGER", label: "Quản lý" },
];

const userSchema = yup.object({
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
  roleName: yup.string().required("Vai trò không được để trống"),
});

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const userData = await getUsers();
      setUsers(userData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu người dùng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    reset(user || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    reset();
    fetchData();
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        toast.success("Cập nhật người dùng thành công");
      } else {
        await createUser(data);
        toast.success("Tạo người dùng thành công");
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lưu người dùng");
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
      toast.success("Xóa người dùng thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa người dùng");
    } finally {
      setOpenConfirmDialog(false);
      setUserIdToDelete(null);
    }
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
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
        Quản lý người dùng
      </Typography>

      <TextField
        label="Tìm kiếm người dùng"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Nhập tên người dùng, email, số điện thoại..."
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
        className="!my-4"
      >
        Thêm người dùng
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
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "role"}
                    direction={sortOrder}
                    onClick={() => handleSort("role")}
                  >
                    Vai trò
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {highlightText(user.username, searchTerm)}
                  </TableCell>
                  <TableCell>{highlightText(user.email, searchTerm)}</TableCell>
                  <TableCell>
                    {highlightText(user.phoneNumber, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(user.lastName, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(user.firstName, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(
                      (() => {
                        switch (user.role) {
                          case "ADMIN":
                            return "Quản trị viên";
                          case "SALES_STAFF":
                            return "Nhân viên bán hàng";
                          case "DELIVERY_STAFF":
                            return "Nhân viên giao hàng";
                          case "CUSTOMER":
                            return "Khách hàng";
                          case "MANAGER":
                            return "Quản lý";
                          default:
                            return user.role;
                        }
                      })(),
                      searchTerm
                    )}
                  </TableCell>
                  <TableCell className="!flex !justify-evenly">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
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
          {selectedUser ? "Cập nhật người dùng" : "Thêm người dùng"}
        </DialogTitle>
        <DialogContent>
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
              type={showPassword ? "text" : "password"} // Chuyển đổi kiểu input
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
                defaultValue={selectedUser?.role || ""}
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

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  createUser,
  // deleteUser,
  getUserByRole,
  updateUser,
  blockUser,
  unblockUser,
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
// import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { highlightText } from "../utils/highlightText";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

const roleOptions = [
  { value: "SALES_STAFF", label: "Nhân viên bán hàng" },
  { value: "DELIVERY_STAFF", label: "Nhân viên giao hàng" },
  { value: "MANAGER", label: "Quản lý" },
];

const deliveryStaffSchema = yup.object({
  username: yup
    .string()
    .min(4, "Tên người dùng phải có ít nhất 4 ký tự")
    .max(24, "Tên người dùng không được quá 24 ký tự")
    .required("Vui lòng nhập tên người dùng"),
  password: yup.string().required("Mật khẩu không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
  firstName: yup
    .string()
    .max(50, "Họ không được quá 50 ký tự")
    .required("Vui lòng nhập tên"),
  lastName: yup
    .string()
    .max(50, "Tên không được quá 50 ký tự")
    .required("Vui lòng nhập họ"),
  address: yup.string().optional(),
  roleName: yup.string().default("DELIVERY_STAFF"),
});

export default function DeliveryStaffManagement() {
  const [deliveryStaffs, setDeliveryStaffs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDeliveryStaff, setSelectedDeliveryStaff] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openConfirmBlockDialog, setOpenConfirmBlockDialog] = useState(false);
  const [openConfirmUnblockDialog, setOpenConfirmUnblockDialog] =
    useState(false);
  // const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToBlock, setUserIdToBlock] = useState(null);
  const [userIdToUnblock, setUserIdToUnblock] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const [defaultUser, setDefaultUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deliveryStaffSchema),
    defaultValues: {
      roleName: "DELIVERY_STAFF",
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDeliveryStaffs = deliveryStaffs.filter(
    (deliveryStaff) =>
      deliveryStaff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deliveryStaff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deliveryStaff.phoneNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      deliveryStaff.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      deliveryStaff.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const deliveryStaffData = await getUserByRole("DELIVERY_STAFF");
      setDeliveryStaffs(deliveryStaffData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu nhân viên giao hàng!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (deliveryStaff = null) => {
    setSelectedDeliveryStaff(deliveryStaff);
    reset(deliveryStaff || defaultUser);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDeliveryStaff(null);
    reset();
    setDefaultUser({
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      address: "",
    });
    fetchData();
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedDeliveryStaff) {
        await updateUser(selectedDeliveryStaff.id, data);
        toast.success("Cập nhật thành công");
      } else {
        await createUser(data);
        toast.success("Tạo tài khoản nhân viên giao hàng thành công");
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error("Lỗi khi lưu thông tin");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleDeleteUser = async (userId) => {
  //   setUserIdToDelete(userId);
  //   setOpenConfirmDialog(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await deleteUser(userIdToDelete);
  //     fetchData();
  //     toast.success("Xóa nhân viên thành công");
  //   } catch (error) {
  //     toast.error("Lỗi khi xóa nhân viên");
  //   } finally {
  //     setOpenConfirmDialog(false);
  //     setUserIdToDelete(null);
  //   }
  // };

  const handleBlockUser = async (userId) => {
    setUserIdToBlock(userId);
    setOpenConfirmBlockDialog(true);
  };

  const handleUnblockUser = async (userId) => {
    setUserIdToUnblock(userId);
    setOpenConfirmUnblockDialog(true);
  };

  const handleConfirmBlock = async () => {
    try {
      await blockUser(userIdToBlock);
      fetchData();
      toast.success("Chặn nhân viên thành công");
    } catch (error) {
      toast.error("Lỗi khi chặn nhân viên");
    } finally {
      setOpenConfirmBlockDialog(false);
      setUserIdToBlock(null);
    }
  };

  const handleConfirmUnblock = async () => {
    try {
      await unblockUser(userIdToUnblock);
      fetchData();
      toast.success("Hủy chặn nhân viên thành công");
    } catch (error) {
      toast.error("Lỗi khi hủy chặn nhân viên");
    } finally {
      setOpenConfirmUnblockDialog(false);
      setUserIdToUnblock(null);
    }
  };

  const sortedUsers = [...filteredDeliveryStaffs].sort((a, b) => {
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
        Quản Lý Nhân Viên Giao Hàng
      </Typography>

      <TextField
        label="Tìm kiếm nhân viên giao hàng"
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
        Thêm Nhân Viên
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
                    className="!font-semibold"
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "username"}
                    direction={sortOrder}
                    onClick={() => handleSort("username")}
                    className="!font-semibold"
                  >
                    Username
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={sortBy === "lastName"}
                    direction={sortOrder}
                    onClick={() => handleSort("lastName")}
                    className="!font-semibold"
                  >
                    Họ
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "firstName"}
                    direction={sortOrder}
                    onClick={() => handleSort("firstName")}
                    className="!font-semibold"
                  >
                    Tên
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "email"}
                    direction={sortOrder}
                    onClick={() => handleSort("email")}
                    className="!font-semibold"
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "phoneNumber"}
                    direction={sortOrder}
                    onClick={() => handleSort("phoneNumber")}
                    className="!font-semibold"
                  >
                    Số Điện Thoại
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((deliveryStaff) => (
                <TableRow key={deliveryStaff.id}>
                  <TableCell>{deliveryStaff.id}</TableCell>
                  <TableCell>
                    {highlightText(deliveryStaff.username, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(deliveryStaff.lastName, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(deliveryStaff.firstName, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(deliveryStaff.email, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(deliveryStaff.phoneNumber, searchTerm)}
                  </TableCell>
                  <TableCell className="!flex !justify-evenly">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(deliveryStaff)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(deliveryStaff.id)}
                    >
                      <DeleteIcon />
                    </IconButton> */}
                    {deliveryStaff.blocked === true ? (
                      <IconButton
                        color="error"
                        onClick={() => handleUnblockUser(deliveryStaff.id)}
                      >
                        <LockOutlinedIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="error"
                        onClick={() => handleBlockUser(deliveryStaff.id)}
                      >
                        <LockOpenOutlinedIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedDeliveryStaff
            ? "Chỉnh Sửa Thông Tin Nhân Viên"
            : "Thêm Nhân Viên"}
        </DialogTitle>
        <DialogContent>
          {selectedDeliveryStaff ? (
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
                  defaultValue={selectedDeliveryStaff?.role || ""}
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
      {/* <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
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
      </Dialog> */}
      <Dialog open={openConfirmBlockDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận chặn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn chặn nhân viên này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmBlockDialog(false)}
            color="primary"
          >
            Hủy
          </Button>
          <Button onClick={handleConfirmBlock} color="error" autoFocus>
            Chặn
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmUnblockDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận hủy chặn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn hủy chặn nhân viên này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirmUnblockDialog(false)}
            color="primary"
          >
            Hủy
          </Button>
          <Button onClick={handleConfirmUnblock} color="error" autoFocus>
            Hủy Chặn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

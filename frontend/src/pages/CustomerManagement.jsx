import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  createUser,
  // deleteUser,
  getUserByRole,
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
  IconButton,
  InputAdornment,
  Paper,
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
// import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import BronzeIcon from "@mui/icons-material/EmojiEvents"; // Bronze icon
import SilverIcon from "@mui/icons-material/MilitaryTech"; // Silver icon
import GoldIcon from "@mui/icons-material/EmojiEvents"; // Gold icon
import DiamondIcon from "@mui/icons-material/Star"; // Diamond icon
import PlatinumIcon from "@mui/icons-material/EmojiEvents"; // Platinum icon
import { highlightText } from "../utils/highlightText";
import BlockIcon from "@mui/icons-material/Block";

const customerSchema = yup.object({
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
  roleName: yup.string().optional(),
});

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  // const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("points");
  const [sortOrder, setSortOrder] = useState("desc");
  const [openConfirmBlockDialog, setOpenConfirmBlockDialog] = useState(false);
  const [openConfirmUnblockDialog, setOpenConfirmUnblockDialog] =
    useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState(null);
  const [userIdToUnblock, setUserIdToUnblock] = useState(null);

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
    reset(customer || defaultUser);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      await createUser(data);
      toast.success("Tạo tài khoản thành công");
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
  //     toast.success("Xóa khách hàng thành công");
  //   } catch (error) {
  //     toast.error("Lỗi khi xóa khách hàng");
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
      toast.success("Chặn người dùng thành công");
    } catch (error) {
      toast.error("Lỗi khi chặn người dùng");
    } finally {
      setOpenConfirmBlockDialog(false);
      setUserIdToBlock(null);
    }
  };

  const handleConfirmUnblock = async () => {
    try {
      await unblockUser(userIdToUnblock);
      fetchData();
      toast.success("Hủy chặn người dùng thành công");
    } catch (error) {
      toast.error("Lỗi khi hủy chặn người dùng");
    } finally {
      setOpenConfirmUnblockDialog(false);
      setUserIdToUnblock(null);
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
        Quản Lý Khách Hàng
      </Typography>

      <TextField
        label="Tìm Kiếm Khách Hàng"
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
        Thêm Khách Hàng
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
              <TableRow className="!sticky !top-0 !z-10">
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
                    className="!font-semibold text-nowrap"
                  >
                    Số Điện Thoại
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "points"}
                    direction={sortOrder}
                    onClick={() => handleSort("points")}
                    className="!font-semibold text-nowrap"
                  >
                    Điểm Tích Luỹ
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!font-semibold text-nowrap">
                  Xếp Hạng
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "blocked"}
                    direction={sortOrder}
                    onClick={() => handleSort("blocked")}
                    className="!font-semibold text-nowrap"
                  >
                    Đã chặn
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell className="text-nowrap">
                    {highlightText(customer.username, searchTerm)}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {highlightText(customer.lastName, searchTerm)}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {highlightText(customer.firstName, searchTerm)}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {highlightText(customer.email, searchTerm)}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {highlightText(customer.phoneNumber, searchTerm)}
                  </TableCell>
                  <TableCell className="!text-right">{customer.points}</TableCell>
                  <TableCell>
                    {customer.membershipLevel.name === "BRONZE" && (
                      <span>
                        <BronzeIcon style={{ color: "#cd7f32" }} /> Đồng
                      </span>
                    )}
                    {customer.membershipLevel.name === "SILVER" && (
                      <span>
                        <SilverIcon style={{ color: "#c0c0c0" }} /> Bạc
                      </span>
                    )}
                    {customer.membershipLevel.name === "GOLD" && (
                      <span>
                        <GoldIcon style={{ color: "#ffd700" }} /> Vàng
                      </span>
                    )}
                    {customer.membershipLevel.name === "DIAMOND" && (
                      <span>
                        <DiamondIcon style={{ color: "#b9f2ff" }} /> Kim Cương
                      </span>
                    )}
                    {customer.membershipLevel.name === "PLANTIUM" && (
                      <span>
                        <PlatinumIcon style={{ color: "#e5e4e2" }} /> Bạch Kim
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-nowrap">
                    {highlightText(
                      customer.blocked === true ? "Đã chặn" : "Không",
                      searchTerm
                    )}
                  </TableCell>
                  <TableCell className="!flex !justify-evenly">
                    {/* <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(customer.id)}
                    >
                      <DeleteIcon />
                    </IconButton> */}
                    <IconButton
                      color="error"
                      onClick={
                        customer.blocked === true
                          ? () => handleUnblockUser(customer.id)
                          : () => handleBlockUser(customer.id)
                      }
                    >
                      <BlockIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Thêm Khách Hàng</DialogTitle>
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
        </DialogContent>
      </Dialog>
      {/* <Dialog open={openConfirmDialog} onClose={handleCloseDialog}> */}
      {/* <DialogTitle>Xác nhận xóa</DialogTitle>
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
        </DialogActions> */}
      <Dialog open={openConfirmBlockDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận chặn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn chặn người dùng này?
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
            Bạn có chắc chắn muốn hủy chặn người dùng này?
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
      {/* </Dialog> */}
    </div>
  );
}

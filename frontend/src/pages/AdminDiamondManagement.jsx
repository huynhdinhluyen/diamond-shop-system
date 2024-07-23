import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createDiamond,
  deleteDiamond,
  getDiamonds,
  updateDiamond,
} from "../service/diamondService";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { highlightText } from "../utils/highlightText";

const diamondSchema = yup.object({
  color: yup.string().required("Màu sắc không được để trống"),
  origin: yup.string().required("Nguồn gốc không được để trống"),
  caratWeight: yup
    .number()
    .typeError("Trọng lượng phải là số")
    .required("Trọng lượng không được để trống")
    .min(0, "Trọng lượng phải là số dương"),
  cutType: yup.string().required("Kiểu cắt không được để trống"),
  clarity: yup.string().required("Độ tinh khiết không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .required("Giá không được để trống")
    .min(0, "Giá phải là số dương"),
  size: yup
    .number()
    .typeError("Kích thước phải là số")
    .required("Kích thước không được để trống")
    .min(0, "Kích thước phải là số dương"),
});

export default function AdminDiamondManagement() {
  const [diamonds, setDiamonds] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [diamondIdToDelete, setDiamondIdToDelete] = useState(null);
  const [sortBy, setSortBy] = useState("size");
  const [sortOrder, setSortOrder] = useState("asc");

  const [defaultValues, setDefaultValues] = useState({
    color: "",
    origin: "",
    caratWeight: 0,
    size: 0,
    cutType: "",
    clarity: "",
    price: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(diamondSchema),
  });

  useEffect(() => {
    fetchDiamonds();
  }, []);

  const fetchDiamonds = async () => {
    setIsLoading(true);
    try {
      const data = await getDiamonds();
      setDiamonds(data);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải danh sách kim cương");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (diamond = null) => {
    setSelectedDiamond(diamond);
    reset(diamond || defaultValues);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDiamond(null);
    reset();
    setDefaultValues({
      color: "",
      origin: "",
      caratWeight: 0,
      size: 0,
      cutType: "",
      clarity: "",
      giaCertificate: "",
      price: 0,
    });
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedDiamond) {
        await updateDiamond(selectedDiamond.id, data);
        toast.success("Cập nhật kim cương thành công");
      } else {
        await createDiamond(data);
        toast.success("Tạo kim cương thành công");
      }
      fetchDiamonds();
      handleCloseDialog();
    } catch (error) {
      toast.error("Lỗi khi lưu kim cương");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDiamond = async (diamondId) => {
    setDiamondIdToDelete(diamondId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDiamond(diamondIdToDelete);
      fetchDiamonds();
      toast.success("Xóa kim cương thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa kim cương");
    } finally {
      setOpenConfirmDialog(false);
      setDiamondIdToDelete(null);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDiamonds = diamonds.filter(
    (diamond) =>
      diamond.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.clarity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.caratWeight.toString().includes(searchTerm) ||
      diamond.price.toString().includes(searchTerm) ||
      diamond.size.toString().includes(searchTerm)
  );

  const sortedDiamonds = [...filteredDiamonds].sort((a, b) => {
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
      <Typography variant="h4" component="h1" className="!mt-4" gutterBottom>
        Quản Lý Kim Cương
      </Typography>

      <TextField
        label="Tìm kiếm kim cương"
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
        color="primary"
        onClick={() => handleOpenDialog()}
        className="!my-4"
      >
        Thêm kim cương mới
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
                    active={sortBy === "color"}
                    direction={sortOrder}
                    onClick={() => handleSort("color")}
                    className="!font-semibold"
                  >
                    Cấp màu
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "origin"}
                    direction={sortOrder}
                    onClick={() => handleSort("origin")}
                    className="!font-semibold"
                  >
                    Nguồn gốc
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "cutType"}
                    direction={sortOrder}
                    onClick={() => handleSort("cutType")}
                    className="!font-semibold"
                  >
                    Chế tác
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "clarity"}
                    direction={sortOrder}
                    onClick={() => handleSort("clarity")}
                    className="!font-semibold"
                  >
                    Độ tinh khiết
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "caratWeight"}
                    direction={sortOrder}
                    onClick={() => handleSort("caratWeight")}
                    className="!font-semibold"
                  >
                    Trọng lượng (carat)
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "size"}
                    direction={sortOrder}
                    onClick={() => handleSort("size")}
                    className="!font-semibold"
                  >
                    Kích thước (ly)
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "price"}
                    direction={sortOrder}
                    onClick={() => handleSort("price")}
                    className="!font-semibold"
                  >
                    Giá
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDiamonds.map((diamond) => (
                <TableRow key={diamond.id}>
                  <TableCell>
                    {highlightText(diamond.color, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(diamond.origin, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(diamond.cutType, searchTerm)}
                  </TableCell>
                  <TableCell>
                    {highlightText(diamond.clarity, searchTerm)}
                  </TableCell>
                  <TableCell className="!text-right">
                    {diamond.caratWeight}
                  </TableCell>
                  <TableCell className="!text-right">{diamond.size}</TableCell>
                  <TableCell className="!text-right">
                    {diamond.price.toLocaleString()} VNĐ
                  </TableCell>
                  <TableCell className="!text-center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenDialog(diamond)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteDiamond(diamond.id)}
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
          <Typography variant="h6" component="div">
            {selectedDiamond ? "Cập nhật kim cương" : "Thêm kim cương mới"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
              label="Cấp màu"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("color")}
              error={!!errors.color}
              helperText={errors.color?.message}
            />

            <TextField
              label="Nguồn gốc"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("origin")}
              error={!!errors.origin}
              helperText={errors.origin?.message}
            />

            <TextField
              label="Trọng lượng (carat)"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("caratWeight")}
              error={!!errors.caratWeight}
              helperText={errors.caratWeight?.message}
            />

            <TextField
              label="Size (ly)"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("size")}
              error={!!errors.size}
              helperText={errors.size?.message}
            />

            <TextField
              label="Chế tác"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("cutType")}
              error={!!errors.cutType}
              helperText={errors.cutType?.message}
            />

            <TextField
              label="Độ tinh khiết"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("clarity")}
              error={!!errors.clarity}
              helperText={errors.clarity?.message}
            />

            <TextField
              label="Giá (VNĐ)"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

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
            Bạn có chắc chắn muốn xóa kim cương này?
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

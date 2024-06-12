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
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

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
  giaCertificate: yup
    .string()
    .required("Giấy chứng nhận GIA không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .required("Giá không được để trống")
    .min(0, "Giá phải là số dương"),
});

export default function AdminDiamondManagement() {
  const [diamonds, setDiamonds] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    reset(diamond || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDiamond(null);
    reset();
  };

  const handleFormSubmit = async (data) => {
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
    }
  };

  const handleDeleteDiamond = async (diamondId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kim cương này?")) {
      try {
        await deleteDiamond(diamondId);
        toast.success("Xóa kim cương thành công");
        fetchDiamonds();
      } catch (error) {
        toast.error("Lỗi khi xóa kim cương");
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDiamonds = diamonds.filter(
    (diamond) =>
      diamond.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.cutType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.clarity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diamond.caratWeight.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto mt-8">
      <Typography variant="h4" component="h1" className="!mt-4" gutterBottom>
        Quản lý kim cương
      </Typography>

      <TextField
        label="Tìm kiếm người dùng"
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
        className="w-full"
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
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Màu sắc</TableCell>
                <TableCell>Nguồn gốc</TableCell>
                <TableCell>Trọng lượng (carat)</TableCell>
                <TableCell>Kiểu cắt</TableCell>
                <TableCell>Độ tinh khiết</TableCell>
                <TableCell>Giá (VNĐ)</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDiamonds.map((diamond) => (
                <TableRow key={diamond.id}>
                  <TableCell>{diamond.color}</TableCell>
                  <TableCell>{diamond.origin}</TableCell>
                  <TableCell>{diamond.caratWeight}</TableCell>
                  <TableCell>{diamond.cutType}</TableCell>
                  <TableCell>{diamond.clarity}</TableCell>
                  <TableCell>{diamond.price.toLocaleString()} VNĐ</TableCell>
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
              label="Màu sắc"
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
              label="Kiểu cắt"
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
              label="Giấy chứng nhận GIA"
              variant="outlined"
              fullWidth
              className="!my-4"
              {...register("giaCertificate")}
              error={!!errors.giaCertificate}
              helperText={errors.giaCertificate?.message}
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
              <Button type="submit" variant="contained" color="primary">
                {selectedDiamond ? "Lưu" : "Thêm"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
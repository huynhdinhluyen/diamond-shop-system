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
  InputAdornment,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createDiamondCasing,
  deleteDiamondCasing,
  getDiamondCasings,
  updateDiamondCasing,
} from "../service/diamondCasingService";

const diamondCasingSchema = yup.object({
  material: yup.string().required("Chất liệu không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .required("Giá không được để trống")
    .min(0, "Giá phải là số dương"),
});

export default function AdminDiamondCasingManagement() {
  const [diamondCasings, setDiamondCasings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCasing, setSelectedCasing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [casingIdToDelete, setCasingIdToDelete] = useState(null);

  const [defaultValues, setDefaultValues] = useState({
    material: "",
    price: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(diamondCasingSchema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const diamondCasingsData = await getDiamondCasings();
      setDiamondCasings(diamondCasingsData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu vỏ kim cương");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = (casing = null) => {
    setSelectedCasing(casing);
    reset(casing || defaultValues);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCasing(null);
    reset();
    setDefaultValues({ material: "", price: 0 });
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (selectedCasing) {
        await updateDiamondCasing(selectedCasing.id, data);
        toast.success("Cập nhật vỏ kim cương thành công");
      } else {
        await createDiamondCasing(data);
        toast.success("Tạo vỏ kim cương thành công");
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error("Lỗi khi lưu vỏ kim cương");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCasing = async (casingId) => {
    setCasingIdToDelete(casingId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDiamondCasing(casingIdToDelete);
      fetchData();
      toast.success("Xóa vỏ kim cương thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa vỏ kim cương");
    } finally {
      setOpenConfirmDialog(false);
      setCasingIdToDelete(null);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDiamondCasings = diamondCasings.filter((diamondCasing) =>
    diamondCasing.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý vỏ kim cương
      </Typography>

      <TextField
        label="Tìm kiếm vỏ kim cương"
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
        className="!my-4"
      >
        Thêm vỏ kim cương
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
                <TableCell className="!text-center">ID</TableCell>
                <TableCell className="!text-center">Chất liệu</TableCell>
                <TableCell className="!text-center">Giá (VNĐ)</TableCell>
                <TableCell className="!text-center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDiamondCasings.map((casing) => (
                <TableRow key={casing.id}>
                  <TableCell className="!text-center">{casing.id}</TableCell>
                  <TableCell className="!text-center">
                    {casing.material}
                  </TableCell>
                  <TableCell className="!text-center">
                    {casing.price.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell className="!text-center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(casing)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCasing(casing.id)}
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

      {/* Dialog thêm/chỉnh sửa vỏ kim cương */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedCasing ? "Cập nhật vỏ kim cương" : "Thêm vỏ kim cương"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
              label="Chất liệu"
              fullWidth
              margin="normal"
              {...register("material")}
              error={!!errors.material}
              helperText={errors?.material?.message}
            />
            <TextField
              label="Giá"
              fullWidth
              margin="normal"
              {...register("price")}
              type="number"
              error={!!errors.price}
              helperText={errors?.price?.message}
            />

            {/* DialogActions */}
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
            Bạn có chắc chắn muốn xóa vỏ kim cương này?
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

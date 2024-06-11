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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import {
  getDiamondCasings,
  createDiamondCasing,
  updateDiamondCasing,
  deleteDiamondCasing,
  getCategories,
  getSizes,
} from "../api/api"; // Replace with your actual API calls
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const diamondCasingSchema = yup.object({
  material: yup.string().required("Chất liệu không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .required("Giá không được để trống")
    .min(0, "Giá phải là số dương"),
  category: yup.object().shape({
    id: yup.number().required("Danh mục không được để trống"),
  }),
  size: yup.object().shape({
    id: yup.number().required("Kích thước không được để trống"),
  }),
});

export default function AdminDiamondCasingManagement() {
  const [diamondCasings, setDiamondCasings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCasing, setSelectedCasing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
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
      const diamondCasingsData = await getDiamondCasings(searchTerm);
      setDiamondCasings(diamondCasingsData);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      const sizesData = await getSizes();
      setSizes(sizesData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu vỏ kim cương");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = (casing = null) => {
    setSelectedCasing(casing);
    reset(casing || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCasing(null);
    reset();
  };

  const handleFormSubmit = async (data) => {
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
    }
  };

  const handleDeleteDiamondCasing = async (casingId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vỏ kim cương này?")) {
      try {
        await deleteDiamondCasing(casingId);
        fetchData();
        toast.success("Xóa vỏ kim cương thành công");
      } catch (error) {
        toast.error("Lỗi khi xóa vỏ kim cương");
      }
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
        className="w-full"
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        className="!mt-4"
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
                <TableCell className="!text-center">Giá</TableCell>
                <TableCell className="!text-center">Danh mục</TableCell>
                <TableCell className="!text-center">Kích thước</TableCell>
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
                    {casing.category.name}
                  </TableCell>
                  <TableCell className="!text-center">
                    {casing.size.diameter} mm
                  </TableCell>
                  <TableCell className="!flex !justify-evenly">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(casing)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteDiamondCasing(casing.id)}
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Danh mục</InputLabel>
              <Controller
                name="category.id"
                control={control}
                defaultValue={selectedCasing?.category?.id || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Danh mục"
                    error={!!errors.category}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.category}>
                {errors?.category?.message}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Kích thước</InputLabel>
              <Controller
                name="size.id"
                control={control}
                defaultValue={selectedCasing?.size?.id || ""}
                render={({ field }) => (
                  <Select {...field} label="Kích thước" error={!!errors.size}>
                    {sizes.map((size) => (
                      <MenuItem key={size.id} value={size.id}>
                        {size.diameter} mm
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.size}>
                {errors?.size?.message}
              </FormHelperText>
            </FormControl>

            {/* DialogActions */}
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy</Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedCasing ? "Lưu" : "Thêm"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
  Box,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../service/categoryService";

const categorySchema = yup.object({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
  imageUrl: yup.string().optional(),
});

export default function AdminCategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageName, setImageName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  const [defaultValues, setDefaultValues] = useState({
    name: "",
    imageUrl: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải danh sách danh mục");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    setSelectedCategory(category);
    reset(category || defaultValues);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
    reset();
    setDefaultValues({ name: "", imageUrl: "" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageName(file ? file.name : "");
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (imageFile) {
        const storageRef = ref(storage, `category_images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress(progress);
          },
          (error) => {
            toast.error("Upload ảnh không thành công!");
            console.error("Error uploading image:", error);
          },
          async () => {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            data.imageUrl = imageUrl;
            await saveCategory(data);
            setImageFile(null);
            setUploadProgress(0);
            setImageName("");
          }
        );
      } else {
        data.imageUrl = selectedCategory?.imageUrl || null;
        await saveCategory(data);
      }
    } catch (error) {
      toast.error("Lỗi khi lưu danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveCategory = async (data) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory.id, data);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await createCategory(data);
        toast.success("Thêm danh mục thành công");
      }
      fetchCategories();
      handleCloseDialog();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(categoryIdToDelete);
      fetchCategories();
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục");
    } finally {
      setOpenConfirmDialog(false);
      setCategoryIdToDelete(null);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Typography variant="h4" component="h1" className="!mt-4" gutterBottom>
        Quản lý danh mục
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        className="!my-4"
      >
        Thêm danh mục mới
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
                <TableCell className="!text-center">Tên</TableCell>
                <TableCell className="!text-center">Ảnh</TableCell>
                <TableCell className="!text-center">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="!text-center">{category.id}</TableCell>
                  <TableCell className="!text-center">
                    {category.name}
                  </TableCell>
                  <TableCell className="!flex">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-[100px] h-auto object-cover mx-auto"
                    />
                  </TableCell>
                  <TableCell className="!text-center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenDialog(category)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteCategory(category.id)}
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

      {/* Dialog for adding/editing categories */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogTitle>
            {selectedCategory ? "Chỉnh sửa" : "Thêm"} danh mục
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register("name")}
              label="Tên danh mục"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <Box mt={2}>
              <Button variant="contained" component="label">
                Tải ảnh lên
                <input type="file" hidden onChange={handleFileChange} />
              </Button>

              {imageName && (
                <Typography variant="body2" className="mt-2">
                  File đã chọn: {imageName}
                </Typography>
              )}

              {uploadProgress > 0 && (
                <Typography variant="body2">
                  Uploading: {uploadProgress}%
                </Typography>
              )}
            </Box>

            {selectedCategory && selectedCategory.imageUrl && (
              <Box mt={2}>
                <img
                  src={selectedCategory.imageUrl}
                  alt={selectedCategory.name}
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            )}
          </DialogContent>
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
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa danh mục này?
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

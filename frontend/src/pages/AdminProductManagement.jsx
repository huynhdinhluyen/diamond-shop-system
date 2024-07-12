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
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  DialogContentText,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../service/productService";
import { getDiamonds } from "../service/diamondService";
import { getDiamondCasings } from "../service/diamondCasingService";
import { getPromotions } from "../service/promotionService";
import { getCategories } from "../service/categoryService";
import { highlightText } from "../utils/highlightText";

const productSchema = yup.object({
  name: yup.string().required("Tên sản phẩm không được để trống"),
  imageUrl: yup.string().optional(),
  laborCost: yup
    .number()
    .required("Chi phí gia công không được để trống")
    .min(0, "Chi phí gia công phải là số dương"),
  profitMargin: yup
    .number()
    .required("Tỷ suất lợi nhuận không được để trống")
    .min(0, "Tỷ suất lợi nhuận phải là số dương")
    .max(1, "Tỷ suất lợi nhuận không được vượt quá 100%"),
  stockQuantity: yup
    .number()
    .required("Số lượng tồn kho không được để trống")
    .integer("Số lượng tồn kho phải là số nguyên")
    .min(0, "Số lượng tồn kho phải là số dương"),
  diamondCasing: yup
    .object()
    .nullable()
    .shape({
      id: yup.number().required("Vỏ kim cương không được để trống"),
    }),
  promotion: yup.object().nullable(),
  mainDiamond: yup
    .object()
    .nullable()
    .shape({
      id: yup.number().required("Kim cương chính không được để trống"),
    }),
  auxiliaryDiamond: yup.object().nullable(),
  category: yup
    .object()
    .nullable()
    .shape({
      id: yup.number().required("Danh mục không được để trống"),
    }),
});

export default function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [diamondCasings, setDiamondCasings] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageName, setImageName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      diamondCasing: { id: "" },
      promotion: { id: "" },
      mainDiamond: { id: "" },
      auxiliaryDiamond: { id: "" },
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const productData = await getProducts();
      setProducts(productData);
      const [diamondsData, diamondCasingsData, promotionsData, categoriesData] =
        await Promise.all([
          getDiamonds(),
          getDiamondCasings(),
          getPromotions(),
          getCategories(),
        ]);
      setDiamonds(diamondsData);
      setDiamondCasings(diamondCasingsData);
      setPromotions(promotionsData);
      setCategories(categoriesData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (product = null) => {
    setSelectedProduct(product);
    reset({
      name: product?.name || "",
      imageUrl: product?.imageUrl || "",
      laborCost: product?.laborCost || 0,
      profitMargin: product?.profitMargin || 0,
      stockQuantity: product?.stockQuantity || 0,
      diamondCasing: { id: product?.diamondCasing?.id || "" },
      promotion: { id: product?.promotion?.id || "" },
      mainDiamond: { id: product?.mainDiamond?.id || "" },
      auxiliaryDiamond: { id: product?.auxiliaryDiamond?.id || "" },
      category: { id: product?.category?.id || "" },
    });
    setImageName(product?.imageUrl || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    reset();
    setImageFile(null);
    setUploadProgress(0);
    setImageName("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageName(file ? file.name : "");
  };

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const productData = {
        ...data,
        mainDiamond: data.mainDiamond?.id ? data.mainDiamond : null,
        auxiliaryDiamond: data.auxiliaryDiamond?.id
          ? data.auxiliaryDiamond
          : null,
        categoryId: data.category?.id,
        promotion: data.promotion?.id ? data.promotion : null,
      };
      if (imageFile) {
        const storageRef = ref(storage, `product_images/${imageFile.name}`);
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
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            productData.imageUrl = imageURL; // Gán downloadURL cho productData
            await submitProduct(productData); // Gửi productData
          }
        );
      } else {
        productData.imageUrl = selectedProduct?.imageUrl || null; // Gán imageUrl cho productData
        await submitProduct(productData); // Sử dụng productData ở cả 2 trường hợp
      }
    } catch (error) {
      toast.error("Lỗi khi lưu sản phẩm");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitProduct = async (data) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data);
        toast.success("Cập nhật sản phẩm thành công"); // Hiển thị thông báo từ backend hoặc mặc định
      } else {
        await createProduct(data);
        toast.success("Tạo sản phẩm thành công");
      }
      fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    setProductIdToDelete(productId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(productIdToDelete);
      fetchData();
      toast.success("Xóa vỏ kim cương thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa vỏ kim cương");
    } finally {
      setOpenConfirmDialog(false);
      setProductIdToDelete(null);
    }
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
        Quản lý sản phẩm
      </Typography>

      <div className="my-4">
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        className="!my-4"
      >
        Thêm sản phẩm
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
                <TableCell className="!text-center">
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
                    active={sortBy === "name"}
                    direction={sortOrder}
                    onClick={() => handleSort("name")}
                    className="!font-semibold"
                  >
                    Tên sản phẩm
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-center !font-semibold">Hình ảnh</TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "laborCost"}
                    direction={sortOrder}
                    onClick={() => handleSort("laborCost")}
                    className="!font-semibold"
                  >
                    Chi phí gia công
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "costPrice"}
                    direction={sortOrder}
                    onClick={() => handleSort("costPrice")}
                    className="!font-semibold"
                  >
                    Giá gốc
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "salePrice"}
                    direction={sortOrder}
                    onClick={() => handleSort("salePrice")}
                    className="!font-semibold"
                  >
                    Giá bán
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "profitMargin"}
                    direction={sortOrder}
                    onClick={() => handleSort("profitMargin")}
                    className="!font-semibold"
                  >
                    Tỉ lệ áp giá
                  </TableSortLabel>
                </TableCell>
                <TableCell className="!text-right">
                  <TableSortLabel
                    active={sortBy === "stockQuantity"}
                    direction={sortOrder}
                    onClick={() => handleSort("stockQuantity")}
                    className="!font-semibold"
                  >
                    Số lượng tồn kho
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                sortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      {highlightText(product.name, searchTerm)}
                    </TableCell>
                    <TableCell className="!flex">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                        className="mx-auto"
                      />
                    </TableCell>
                    <TableCell className="!text-right">
                      {product.laborCost.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="!text-right">
                      {product.costPrice.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="!text-right">
                      {product.salePrice.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.profitMargin * 100}%
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.stockQuantity}
                    </TableCell>

                    <TableCell className="!text-center">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
              label="Tên sản phẩm"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors?.name?.message}
            />
            <TextField
              label="Giá gia công"
              fullWidth
              margin="normal"
              {...register("laborCost")}
              error={!!errors.laborCost}
              helperText={errors?.laborCost?.message}
            />
            <TextField
              label="Tỷ suất lợi nhuận"
              fullWidth
              margin="normal"
              {...register("profitMargin")}
              error={!!errors.profitMargin}
              helperText={errors?.profitMargin?.message}
            />
            <TextField
              label="Số lượng tồn kho"
              fullWidth
              margin="normal"
              {...register("stockQuantity")}
              error={!!errors.stockQuantity}
              helperText={errors?.stockQuantity?.message}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Vỏ kim cương</InputLabel>
              <Controller
                name="diamondCasing.id"
                control={control}
                defaultValue={selectedProduct?.diamondCasing?.id || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Vỏ kim cương"
                    error={!!errors.diamondCasing}
                  >
                    {diamondCasings.map((diamondCasing) => (
                      <MenuItem key={diamondCasing.id} value={diamondCasing.id}>
                        {diamondCasing.material}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.diamondCasing}>
                {errors?.diamondCasing?.id?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Kim cương chính</InputLabel>
              <Controller
                name="mainDiamond.id"
                control={control}
                defaultValue={selectedProduct?.mainDiamond?.id || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Kim cương chính"
                    error={!!errors.mainDiamond}
                  >
                    <MenuItem value="">None</MenuItem>
                    {diamonds.map((diamond) => (
                      <MenuItem key={diamond.id} value={diamond.id}>
                        {diamond.size} mm- {diamond.color} -{" "}
                        {diamond.caratWeight} carat - {diamond.clarity} -{" "}
                        {diamond.cutType}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.mainDiamond}>
                {errors?.mainDiamond?.id?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Kim cương phụ</InputLabel>
              <Controller
                name="auxiliaryDiamond.id"
                control={control}
                defaultValue={selectedProduct?.auxiliaryDiamond?.id || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Kim cương phụ"
                    error={!!errors.auxiliaryDiamond}
                  >
                    <MenuItem value="">None</MenuItem>
                    {diamonds.map((diamond) => (
                      <MenuItem key={diamond.id} value={diamond.id}>
                        {diamond.size} mm- {diamond.color} -{" "}
                        {diamond.caratWeight} carat - {diamond.clarity} -{" "}
                        {diamond.cutType}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.auxiliaryDiamond}>
                {errors?.auxiliaryDiamond?.id?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Khuyến mãi</InputLabel>
              <Controller
                name="promotion.id"
                control={control}
                defaultValue={selectedProduct?.promotion?.id || null}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Khuyến mãi"
                    error={!!errors.promotion}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === "" ? null : event.target.value
                      )
                    }
                    value={field.value || ""}
                  >
                    <MenuItem value="">None</MenuItem>
                    {promotions.map((promotion) => (
                      <MenuItem key={promotion.id} value={promotion.id}>
                        {promotion.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.promotion}>
                {errors?.promotion?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Danh mục</InputLabel>
              <Controller
                name="category.id"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Danh mục" error={!!errors.category}>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.category}>
                {errors?.category?.id?.message}
              </FormHelperText>
            </FormControl>
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
            {selectedProduct && selectedProduct.imageUrl && (
              <Box mt={2}>
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            )}
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
            Bạn có chắc chắn muốn xóa sản phẩm này?
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

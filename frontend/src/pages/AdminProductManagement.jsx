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
  OutlinedInput,
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
import { getWarranties } from "../service/warrantyService";
import { getPromotions } from "../service/promotionService";

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
  promotion: yup.object().shape({
    id: yup.number().required("Khuyến mãi không được để trống"),
  }),
  warranty: yup.object().shape({
    id: yup.number().required("Bảo hành không được để trống"),
  }),
  mainDiamond: yup.number().nullable(), // Thay đổi thành number().nullable()
  auxiliaryDiamond: yup.number().nullable(),
});

export default function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [diamonds, setDiamonds] = useState([]);
  const [diamondCasings, setDiamondCasings] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageName, setImageName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      warranty: { id: "" },
      promotion: { id: "" },
      mainDiamond: null,
      auxiliaryDiamond: null,
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
      const [diamondsData, diamondCasingsData, warrantiesData, promotionsData] =
        await Promise.all([
          getDiamonds(),
          getDiamondCasings(),
          getWarranties(),
          getPromotions(),
        ]);
      setDiamonds(diamondsData);
      setDiamondCasings(diamondCasingsData);
      setWarranties(warrantiesData);
      setPromotions(promotionsData);
    } catch (error) {
      setError(error);
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setIsLoading(false);
    }
  };

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
      warranty: { id: product?.warranty?.id || "" },
      mainDiamond: product?.mainDiamond?.id || "",
      auxiliaryDiamond: product?.auxiliaryDiamond?.id || "",
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
    try {
      const mainDiamond = data.mainDiamond ? { id: data.mainDiamond } : null;
      const auxiliaryDiamond = data.auxiliaryDiamond
        ? { id: data.auxiliaryDiamond }
        : null;
      const productData = {
        ...data,
        mainDiamond,
        auxiliaryDiamond,
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
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(productId);
        fetchData();
        toast.success("Xóa sản phẩm thành công");
      } catch (error) {
        toast.error("Lỗi khi xóa sản phẩm");
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Quản lý sản phẩm
      </Typography>

      <div className="my-8">
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
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="!text-center">ID</TableCell>
                <TableCell className="!text-center">Tên sản phẩm</TableCell>
                <TableCell className="!text-center">Hình ảnh</TableCell>
                <TableCell className="!text-center">Chi phí gia công</TableCell>
                <TableCell className="!text-center">Giá gốc</TableCell>
                <TableCell className="!text-center">Giá bán</TableCell>
                <TableCell className="!text-center">Lợi nhuận</TableCell>
                <TableCell className="!text-center">Số lượng tồn kho</TableCell>
                <TableCell className="!text-center">Hành động</TableCell>
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
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="!text-center">{product.id}</TableCell>
                    <TableCell className="!text-center">
                      {product.name}
                    </TableCell>
                    <TableCell className="!flex">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                        className="mx-auto"
                      />
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.laborCost.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.costPrice.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.salePrice.toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.profitMargin * 100}%
                    </TableCell>
                    <TableCell className="!text-center">
                      {product.stockQuantity}
                    </TableCell>

                    <TableCell>
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
                        {diamondCasing.material} (Size:{" "}
                        {diamondCasing.size.name})
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.diamondCasing}>
                {errors?.diamondCasing?.id?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="main-diamond-select-label">
                Kim cương chính
              </InputLabel>
              <Controller
                name="mainDiamond"
                control={control}
                defaultValue={selectedProduct?.mainDiamond?.id || ""}
                render={({ field }) => (
                  <Select
                    labelId="main-diamond-select-label"
                    id="main-diamond-select"
                    {...field}
                    value={field.value || ""}
                    input={<OutlinedInput label="Kim cương chính" />}
                    renderValue={(selected) => {
                      const diamond = diamonds.find((d) => d.id === selected);
                      return diamond
                        ? `${diamond.color} - ${diamond.caratWeight} carat - ${diamond.clarity} - ${diamond.cutType}`
                        : "";
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {diamonds.map((diamond) => (
                      <MenuItem key={diamond.id} value={diamond.id}>
                        {diamond.color} - {diamond.caratWeight} carat -{" "}
                        {diamond.clarity} - {diamond.cutType}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            {/* Auxiliary Diamonds Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="auxiliary-diamond-select-label">
                Kim cương phụ
              </InputLabel>
              <Controller
                name="auxiliaryDiamond"
                control={control}
                defaultValue={selectedProduct?.auxiliaryDiamond?.id || ""}
                render={({ field }) => (
                  <Select
                    labelId="auxiliary-diamond-label"
                    id="auxiliary-diamonds-select"
                    {...field}
                    value={field.value || ""}
                    input={<OutlinedInput label="Kim cương phụ" />}
                    renderValue={(selected) => {
                      const diamond = diamonds.find((d) => d.id === selected);
                      return diamond
                        ? `${diamond.color} - ${diamond.caratWeight} carat - ${diamond.clarity} - ${diamond.cutType}`
                        : "";
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {diamonds.map((diamond) => (
                      <MenuItem key={diamond.id} value={diamond.id}>
                        {`${diamond.color} - ${diamond.caratWeight} Carat`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Khuyến mãi</InputLabel>
              <Controller
                name="promotion.id"
                control={control}
                defaultValue={selectedProduct?.promotion?.id || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Khuyến mãi"
                    error={!!errors.promotion}
                  >
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
              <InputLabel>Bảo hành</InputLabel>
              <Controller
                name="warranty.id"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Bảo hành" error={!!errors.warranty}>
                    {warranties.map((warranty) => (
                      <MenuItem key={warranty.id} value={warranty.id}>
                        {warranty.warrantyFree}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText error={!!errors.warranty}>
                {errors?.warranty?.message}
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
              <Button type="submit" variant="contained" color="primary">
                {selectedProduct ? "Lưu" : "Thêm"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts, deleteProduct } from "../api/api";

export default function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "An error occurred"); // Hiển thị thông báo lỗi
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(selectedProductId);
      fetchProducts();
      toast.success("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Xóa sản phẩm không thành công!");
    } finally {
      setOpenDeleteDialog(false);
      setSelectedProductId(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedProductId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <Typography
        variant="h4"
        component="h1"
        className="text-center font-bold mb-4"
      >
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

      <TableContainer component={Paper} className="my-8">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="!text-center">ID</TableCell>
              <TableCell className="!text-center">Tên sản phẩm</TableCell>
              <TableCell className="!text-center">Hình ảnh</TableCell>
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
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1" color="error">
                    Error loading products: {error}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className="!text-center"
                  >
                    {product.id}
                  </TableCell>
                  <TableCell className="!text-center">{product.name}</TableCell>
                  <TableCell className="!flex">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-[100px] h-auto object-cover mx-auto"
                    />
                  </TableCell>
                  <TableCell className="!text-center">
                    {product.costPrice?.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell className="!text-center">
                    {product.salePrice?.toLocaleString("vi-VN")} VNĐ
                  </TableCell>
                  <TableCell className="!text-center">
                    {(product.profitMargin * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell className="!text-center">
                    {product.stockQuantity}
                  </TableCell>
                  <TableCell className="!text-center">
                    <div>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <EditIcon className="mr-2 cursor-pointer" />
                      </Link>
                      <DeleteIcon
                        onClick={() => handleDeleteClick(product.id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Link to="/admin/products/add">
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Thêm sản phẩm mới
        </Button>
      </Link>

      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Hủy</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

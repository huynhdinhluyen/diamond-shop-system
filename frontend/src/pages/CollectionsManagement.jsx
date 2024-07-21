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
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    createCollection,
    deleteCollection,
    getCollections,
    updateCollection,
} from "../service/collectionService";
import { getProducts, getProductsByCollection, getProductById } from "../service/productService";
import { highlightText } from "../utils/highlightText";

const collectionSchema = yup.object({
    name: yup.string().required("Tên bộ sưu tập không được để trống"),
    description: yup.string().optional(),
    products: yup.array().of(yup.number().required("Sản phẩm không được để trống")).required(),
});

export default function CollectionsManagement() {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [collectionIdToDelete, setCollectionIdToDelete] = useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [usedProductIds, setUsedProductIds] = useState(new Set());

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(collectionSchema),
        defaultValues: {
            products: [],
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const collectionData = await getCollections();
            const productsData = await getProducts();
            setProducts(productsData);

            // Lấy danh sách sản phẩm đã thuộc bộ sưu tập khác
            const usedProductIds = new Array();
            collectionData.forEach(collection => {
                collection.productIds.forEach(product => {
                    usedProductIds.push(product);
                });
            });
            // Lấy chi tiết sản phẩm cho từng bộ sưu tập
            const collectionsWithProducts = await Promise.all(
                collectionData.map(async (collection) => {
                    const productIds = await getProductsByCollection(collection.id);
                    const productDetails = await Promise.all(
                        productIds.map(async (productId) => {
                            const product = await getProductById(productId);
                            return product;
                        })
                    );
                    return { ...collection, productDetails };
                })
            );

            setCollections(collectionsWithProducts);
            setUsedProductIds(usedProductIds); // Lưu danh sách sản phẩm đã được sử dụng
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

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenDialog = (collection = null) => {
        if (collection) {
            const productIds = collection.productDetails.map((product) => product.id);
            reset({
                name: collection.name,
                description: collection.description,
                products: productIds,
            });
            setSelectedCollection(collection);
        } else {
            reset({
                name: "",
                description: "",
                products: [],
            });
            setSelectedCollection(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCollection(null);
        reset();
    };

    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const collectionData = {
                ...data,
                products: data.products.map((productId) => ({ id: productId })),
            };

            if (selectedCollection) {
                await updateCollection(selectedCollection.id, collectionData);
                toast.success("Cập nhật bộ sưu tập thành công");
            } else {
                await createCollection(collectionData);
                toast.success("Tạo bộ sưu tập thành công");
            }

            fetchData();
            handleCloseDialog();
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCollection = async (collectionId) => {
        setCollectionIdToDelete(collectionId);
        setOpenConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCollection(collectionIdToDelete);
            fetchData();
            toast.success("Xóa bộ sưu tập thành công");
        } catch (error) {
            toast.error("Lỗi khi xóa bộ sưu tập");
        } finally {
            setOpenConfirmDialog(false);
            setCollectionIdToDelete(null);
        }
    };

    const sortedCollections = [...filteredCollections].sort((a, b) => {
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
                Quản lý bộ sưu tập
            </Typography>

            <div className="my-4">
                <TextField
                    label="Tìm kiếm bộ sưu tập"
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
                Thêm bộ sưu tập
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
                                <TableCell className="!text-left">
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
                                        Tên bộ sưu tập
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell className="!text-left !font-semibold">
                                    Mô tả
                                </TableCell>
                                <TableCell className="!text-left !font-semibold">
                                    Sản phẩm
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
                                sortedCollections.map((collection) => (
                                    <TableRow key={collection.id}>
                                        <TableCell>{collection.id}</TableCell>
                                        <TableCell>
                                            {highlightText(collection.name, searchTerm)}
                                        </TableCell>
                                        <TableCell>{collection.description}</TableCell>
                                        <TableCell>
                                            {collection.productDetails.map((product) => (
                                                <Typography key={product.id}>
                                                    {product.name}
                                                </Typography>
                                            ))}
                                        </TableCell>
                                        <TableCell className="!text-center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenDialog(collection)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteCollection(collection.id)}
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
                    {selectedCollection ? "Cập nhật bộ sưu tập" : "Thêm bộ sưu tập"}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <TextField
                            label="Tên bộ sưu tập"
                            fullWidth
                            margin="normal"
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                        />
                        <TextField
                            label="Mô tả"
                            fullWidth
                            margin="normal"
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors?.description?.message}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Sản phẩm</InputLabel>
                            <Controller
                                name="products"
                                control={control}
                                defaultValue={selectedCollection ? selectedCollection.productDetails.map((product) => product.id) : []}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Sản phẩm"
                                        multiple
                                        onChange={(e) => field.onChange(e.target.value)}
                                        value={field.value || []}
                                        error={!!errors.products}
                                    >
                                        {products.map((product) => (
                                            <MenuItem
                                                key={product.id}
                                                value={product.id}
                                                disabled={usedProductIds.includes(product.id) && !field.value.includes(product.id)} // Vô hiệu hóa nếu sản phẩm đã thuộc bộ sưu tập khác
                                            >
                                                {product.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText error={!!errors.products}>
                                {errors?.products?.message}
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
                </DialogContent>
            </Dialog>
            <Dialog open={openConfirmDialog} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa bộ sưu tập này?
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

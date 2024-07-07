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
    TableSortLabel,
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
    getPromotions,
    deletePromotion,
    updatePromotion,
    createPromotion
} from "../service/promotionService";
import { highlightText } from "../utils/highlightText";

const validDate = (value) => {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
};

const promotionSchema = yup.object({
    name: yup.string().required("Tên chương trình khuyến mãi không được để trống"),
    description: yup.string().required("Mô tả chương trình khuyến mãi không được để trống"),
    discountRate: yup
        .number()
        .typeError("Tỉ lệ giảm giá phải là số")
        .min(0, "Tỉ lệ giảm giá phải lớn hơn hoặc bằng 0")
        .max(1, "Tỉ lệ giảm giá phải nhỏ hơn hoặc bằng 1")
        .required("Tỉ lệ giảm giá không được để trống"),
    startDate: yup
        .string()
        .required("Ngày bắt đầu không được để trống")
        .test("is-valid-date", "Ngày bắt đầu phải là ngày hợp lệ", validDate),
    endDate: yup
        .string()
        .required("Ngày kết thúc không được để trống")
        .test("is-valid-date", "Ngày kết thúc phải là ngày hợp lệ", validDate)
        .test("is-after-start-date", "Ngày kết thúc phải bằng hoặc sau ngày bắt đầu", function (value) {
            const { startDate } = this.parent;
            return new Date(value) >= new Date(startDate);
        })
        .test("is-after-current-date", "Ngày kết thúc phải là ngày tương lai", function (value) {
            const today = new Date();
            const dateValue = new Date(value);
            today.setHours(0, 0, 0, 0);
            return dateValue >= today;
        }),
});

export default function AdminPromotionManagement() {
    const [promotions, setPromotions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [promotionIdToDelete, setPromotionIdToDelete] = useState(null);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPromotions = promotions.filter(
        (promotion) =>
            promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(promotionSchema),
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const promotionData = await getPromotions();
            setPromotions(promotionData);
        } catch (error) {
            setError(error);
            toast.error("Lỗi khi tải dữ liệu chương trình khuyến mãi");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenDialog = (promotion = null) => {
        setSelectedPromotion(promotion);
        reset(promotion || {});
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPromotion(null);
        reset();
        fetchData();
    };

    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            if (selectedPromotion) {
                await updatePromotion(selectedPromotion.id, data);
                toast.success("Cập nhật chương trình khuyến mãi thành công");
            } else {
                await createPromotion(data);
                toast.success("Tạo chương trình khuyến mãi thành công");
            }
            fetchData();
            handleCloseDialog();
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi lưu chương trình khuyến mãi");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeletePromotion = async (promotionId) => {
        setPromotionIdToDelete(promotionId);
        setOpenConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePromotion(promotionIdToDelete);
            fetchData();
            toast.success("Xóa chương trình khuyến mãi thành công");
        } catch (error) {
            toast.error("Lỗi khi xóa chương trình khuyến mãi");
        } finally {
            setOpenConfirmDialog(false);
            setPromotionIdToDelete(null);
        }
    };

    const sortedPromotions = [...filteredPromotions].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === "string" && typeof bValue === "string") {
            const aDate = new Date(aValue);
            const bDate = new Date(bValue);

            if (!isNaN(aDate) && !isNaN(bDate)) {
                return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
            }

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
                Quản lý chương trình khuyến mãi
            </Typography>

            <TextField
                label="Tìm kiếm chương trình khuyến mãi"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Nhập tên hoặc mô tả chương trình khuyến mãi"
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
                Thêm khuyến mãi
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
                                        active={sortBy === "id"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("id")}
                                    >
                                        ID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy === "name"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("name")}
                                    >
                                        Chương trình khuyến mãi
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy === "description"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("description")}
                                    >
                                        Mô tả
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy === "discountRate"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("discountRate")}
                                    >
                                        Tỉ lệ giảm giá
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy === "startDate"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("startDate")}
                                    >
                                        Ngày bắt đầu
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy === "endDate"}
                                        direction={sortOrder}
                                        onClick={() => handleSort("endDate")}
                                    >
                                        Ngày kết thúc
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedPromotions.map((promotion) => (
                                <TableRow key={promotion.id}>
                                    <TableCell>{promotion.id}</TableCell>
                                    <TableCell>
                                        {highlightText(promotion.name, searchTerm)}
                                    </TableCell>
                                    <TableCell>{highlightText(promotion.description, searchTerm)}</TableCell>
                                    <TableCell>
                                        {promotion.discountRate}
                                    </TableCell>
                                    <TableCell>
                                        {promotion.startDate}
                                    </TableCell>
                                    <TableCell>
                                        {promotion.endDate}
                                    </TableCell>
                                    <TableCell className="!flex !justify-evenly">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleOpenDialog(promotion)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeletePromotion(promotion.id)}
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
                    {selectedPromotion ? "Cập nhật chương trình khuyến mãi" : "Thêm chương trình khuyến mãi"}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <TextField
                            label="Tên"
                            fullWidth
                            margin="normal"
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                            className="!my-4"
                        />
                        <TextField
                            label="Mô tả"
                            fullWidth
                            margin="normal"
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors?.description?.message}
                            className="!my-4"
                        />
                        <TextField
                            label="Tỉ lệ giảm giá"
                            fullWidth
                            margin="normal"
                            {...register("discountRate")}
                            error={!!errors.discountRate}
                            helperText={errors?.discountRate?.message}
                            className="!my-4"
                        />
                        <TextField
                            label="Ngày bắt đầu (YYYY-MM-DD)"
                            fullWidth
                            margin="normal"
                            {...register("startDate")}
                            error={!!errors.startDate}
                            helperText={errors?.startDate?.message}
                            className="!my-4"
                        />
                        <TextField
                            label="Ngày kết thúc (YYYY-MM-DD)"
                            fullWidth
                            margin="normal"
                            {...register("endDate")}
                            error={!!errors.endDate}
                            helperText={errors?.endDate?.message}
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
                        Bạn có chắc chắn muốn xóa chương trình khuyến mãi này?
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

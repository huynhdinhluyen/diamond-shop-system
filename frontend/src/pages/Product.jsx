import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getSizes } from "../api/api";
import NotFound from "../components/NotFound";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useCart } from "../hooks/useCart";
import Price from "../components/Price";
import { useAuth } from "../hooks/useAuth";

export default function Product() {
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open, setOpen] = useState(false);
  const { productId } = useParams();
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      user_id: user.id,
      product_id: productId,
      quantity: 1,
    });
  };

  useEffect(() => {
    getProductById(productId).then(setProduct);
    getSizes().then(setSizes);
  }, [productId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setOpen(false);
  };

  return (
    <div className="mt-10">
      {!product ? (
        <NotFound
          message="Không tìm thấy sản phẩm!"
          linkText="Quay lại trang chính"
        />
      ) : (
        <div className="container">
          <div className="flex justify-center">
            <div className="w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-96 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col gap-y-3 ml-4">
              <h3 className="h3">{product.name}</h3>
              <h4 className="h4 text-accent">
                <Price price={product.costPrice} />
              </h4>
              {product.diamondCasing && (
                <h5 className="h5">
                  Chất liệu: {product.diamondCasing.material}
                </h5>
              )}
              {product.mainDiamond && (
                <div>
                  <h5 className="h5">Viên chính:</h5>
                  <ul className="">
                    <li>Màu: {product.mainDiamond.color}</li>
                    <li>Xuất xứ: {product.mainDiamond.origin}</li>
                    <li>
                      Trọng lượng carat: {product.mainDiamond.caratWeight}
                    </li>
                    <li>Kiểu cắt: {product.mainDiamond.cutType}</li>
                    <li>Độ trong: {product.mainDiamond.clarity}</li>
                    <li>Chứng chỉ GIA: {product.mainDiamond.giaCertificate}</li>
                  </ul>
                </div>
              )}
              {product &&
                product.auxiliaryDiamonds &&
                product.auxiliaryDiamonds.length > 0 && (
                  <div>
                    <h5 className="h5">Viên phụ:</h5>
                    <ul>
                      {product.auxiliaryDiamonds.map((diamond, index) => (
                        <li key={index}>
                          Màu: {diamond.color}, Xuất xứ: {diamond.origin}, Trọng
                          lượng carat: {diamond.caratWeight}, Kiểu cắt:{" "}
                          {diamond.cutType}, Độ trong: {diamond.clarity}, Chứng
                          chỉ GIA: {diamond.giaCertificate}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              <Button variant="outlined" onClick={handleClickOpen}>
                Chọn Ni (size)
              </Button>
              {selectedSize && (
                <div className="mt-2">
                  <strong>Kích thước đã chọn:</strong>{" "}
                  {`Size ${selectedSize.name} - Đường kính: ${selectedSize.diameter} mm`}
                </div>
              )}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chọn kích thước</DialogTitle>
                <DialogContent>
                  <List>
                    {sizes.map((size) => (
                      <ListItem
                        button
                        key={size.id}
                        onClick={() => handleSizeSelect(size)}
                      >
                        <ListItemText
                          primary={`Size ${size.name} - Đường kính: ${size.diameter} mm`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Đóng
                  </Button>
                </DialogActions>
              </Dialog>
              <button
                onClick={handleAddToCart}
                className="btn-accent btn-sm rounded-lg"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

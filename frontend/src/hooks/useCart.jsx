/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import * as cartService from "../service/cartService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./useAuth";
import { getProductById } from "../service/productService";

const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getProductFromCart();
        }
    }, [user]);

    const getProductFromCart = async () => {
        if (!user) return;
        const cartItems = await cartService.getCartItems(user.id);
        const productIds = cartItems.map(item => item.productId);
        const productRequests = productIds.map(id => getProductById(id));
        const productResponses = await Promise.all(productRequests);
        const products = productResponses.map(res => res);

        const combinedCart = cartItems.map(item => {
            const product = products.find(p => p.id === item.productId);
            console.log(product);
            return {
                ...item,
                productName: product?.name,
                image: product?.imageUrl,
                price: product?.discountPrice > 0 ? product?.discountPrice : product.salePrice,
                stockQuantity: product?.stockQuantity
            };
        });

        const totalCount = combinedCart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = combinedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setCart({ items: combinedCart, totalCount, totalPrice });
    };


    const addToCart = async (data) => {
        try {
            await cartService.addToCart(data);
            toast.success("Đã thêm vào giỏ hàng!");
            await getProductFromCart();
        } catch (err) {
            toast.error("Thêm vào giỏ hàng không thành công!");
        }
    }

    const changeQuantity = async (productId, quantity) => {
        try {
            await cartService.changeQuantity(user.id, productId, quantity);
            setCart(prevCart => {
                const newCartItems = prevCart.items.map(item =>
                    item.productId === productId ? { ...item, quantity } : item
                );
                const totalCount = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = newCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                return { items: newCartItems, totalCount, totalPrice };
            });
        } catch (err) {
            console.error("Error changing quantity:", err);
            toast.error("Cập nhật số lượng sản phẩm không thành công!");
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await cartService.removeFromCart(user.id, productId);
            setCart(prevCart => {
                const newCartItems = prevCart.items.filter(item => item.productId !== productId);
                const totalCount = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = newCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                return { items: newCartItems, totalCount, totalPrice };
            });
        } catch (err) {
            console.error("Error removing from cart:", err);
            toast.error("Xóa sản phẩm khỏi giỏ hàng không thành công!");
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, getProductFromCart, changeQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const CartContext = createContext(null);
const CART_KEY_PREFIX = "cart_";
const EMPTY_CART = {
    items: [],
    totalPrice: 0,
    totalCount: 0
};

export default function CartProvider({ children }) {
    const { user } = useAuth();
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (user) {
            const totalPrice = sum(cartItems.map((item) => item.price));
            const totalCount = sum(cartItems.map((item) => item.quantity));
            setTotalPrice(totalPrice);
            setTotalCount(totalCount);
            localStorage.setItem(
                CART_KEY_PREFIX + user.token,
                JSON.stringify({
                    items: cartItems,
                    totalPrice,
                    totalCount,
                })
            );
        }
    }, [cartItems, user]);

    function getCartFromLocalStorage() {
        if (user) {
            const storedCart = localStorage.getItem(CART_KEY_PREFIX + user.token);
            console.log(storedCart)
            return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
        } else {
            return EMPTY_CART;
        }
    }

    const sum = (items) => {
        return items.reduce((previous, curValue) => previous + curValue, 0);
    };

    const changeQuantity = (cartItem, newQuantity) => {
        const { product } = cartItem;

        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: product.costPrice * newQuantity
        };

        setCartItems(
            cartItems.map((item) =>
                item.product.id === product.id ? changedCartItem : item
            )
        );
    };

    const addToCart = (product) => {
        const cartItem = cartItems.find((item) => item.product.id === product.id);
        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            setCartItems([...cartItems, { product, quantity: 1, price: product.costPrice }]);
        }
    };

    const removeFromCart = (productId) => {
        const filteredCartItems = cartItems.filter(
            (item) => item.product.id !== productId
        );
        setCartItems(filteredCartItems);
    };

    const clearCart = () => {
        const { items, totalPrice, totalCount } = EMPTY_CART;
        setCartItems(items);
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
    };

    return (
        <CartContext.Provider
            value={{
                cart: { items: cartItems, totalCount, totalPrice },
                removeFromCart,
                changeQuantity,
                addToCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);

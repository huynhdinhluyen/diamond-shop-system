/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import * as orderService from "../service/orderService";
import "react-toastify/dist/ReactToastify.css";
import { getProductById } from "../service/productService";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getUserOrders();
        }
    }, [user]);

    const getUserOrders = async () => {
        if (!user) return;
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders);
    };

    const addOrder = async (order) => {
        const newOrder = await orderService.addOrder(order);
        setOrders(prevOrders => [...prevOrders, newOrder]);
        return newOrder;
    }

    const getProductFromOrder = async (order) => {
        try {
            const products = await Promise.all(order.orderDetails.map(async (detail) => {
                const product = await getProductById(detail.productId);
                return { ...product, quantity: detail.quantity, unitPrice: detail.unitPrice, size: detail.size };
            }));
            return products;
        } catch (error) {
            console.error('Failed to get product from order:', error);
            throw error;
        }
    };

    const updateOrderNote = async (orderId, note) => {
        try {
            await orderService.updateOrderNote(orderId, note);
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, note } : order
                )
            );
        } catch (error) {
            console.error('Failed to update order note:', error);
            throw error;
        }
    };

    return (
        <OrderContext.Provider
            value={{ orders, getUserOrders, addOrder, getProductFromOrder, updateOrderNote }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => useContext(OrderContext);

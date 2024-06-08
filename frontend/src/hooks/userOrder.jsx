/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import * as orderService from "../service/orderService";
import "react-toastify/dist/ReactToastify.css";

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

    return (
        <OrderContext.Provider
            value={{ orders, getUserOrders }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => useContext(OrderContext);

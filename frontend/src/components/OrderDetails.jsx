/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useOrder } from '../hooks/useOrder';

const OrderList = ({ userId }) => {
    const { getUserOrders, orders } = useOrder();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            await getUserOrders(userId);
            setLoading(false);
        };

        fetchOrders();
    }, [userId, getUserOrders]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Order List for User {userId}</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <h3>Order ID: {order.id}</h3>
                        <p>Transaction ID: {order.transactionId}</p>
                        <p>Delivery Fee: {order.deliveryFee}</p>
                        <p>Discount Price: {order.discountPrice}</p>
                        <p>Total Price: {order.totalPrice}</p>
                        <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                        <h4>Order Details:</h4>
                        <ul>
                            {order.orderDetails.map(detail => (
                                <li key={detail.productId}>
                                    <p>Product ID: {detail.productId}</p>
                                    <p>Quantity: {detail.quantity}</p>
                                    <p>Unit Price: {detail.unitPrice}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;

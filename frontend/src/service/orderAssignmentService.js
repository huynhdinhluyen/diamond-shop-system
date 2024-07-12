import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export async function getOrdersByStaffId(staffId) {
  try {
    const response = await axiosInstance.get(
      `/api/order-assignments/orders/staffs/${staffId}`
    );
    return response.data;
  } catch (error) {
    handleError("Error fetching orders:", error);
  }
}

export async function confirmOrder(orderId) {
  try {
    const response = await axiosInstance.put(
      `/api/order-assignments/orders/${orderId}/confirm`
    );
    return response.data;
  } catch (error) {
    handleError("Error confirming order:", error);
  }
}

export async function cancelOrder(orderId) {
  try {
    const response = await axiosInstance.put(
      `/api/order-assignments/orders/${orderId}/cancel`
    );
    return response.data;
  } catch (error) {
    handleError("Error cancelling order:", error);
  }
}

export async function assignOrderToDeliveryStaff(orderId) {
  try {
    const response = await axiosInstance.put(
      `/api/order-assignments/orders/${orderId}/sales-staff/assign`
    );
    return response.data;
  } catch (error) {
    handleError("Error assign order:", error);
  }
}

export async function pickUpOrder(orderId) {
  try {
    const response = await axiosInstance.put(
      `/api/order-assignments/orders/${orderId}/delivery-staff/pick-up`
    );
    return response.data;
  } catch (error) {
    handleError("Error assign order:", error);
  }
}

export async function completeOrder(orderId) {
  try {
    const response = await axiosInstance.put(
      `/api/order-assignments/orders/${orderId}/delivery-staff/complete`
    );
    return response.data;
  } catch (error) {
    handleError("Error complete order:", error);
  }
}

export async function reassignOrderToAnotherSalesStaff(
  orderId,
  oldStaffId,
  newStaffId
) {
  try {
    const response = await axiosInstance.post(
      `/api/order-assignments/reassign`,
      null,
      { params: { orderId, oldStaffId, newStaffId } }
    );
    return response.data;
  } catch (error) {
    handleError("Error reassign order:", error);
  }
}

export async function getOrderAssignments() {
  try {
    const response = await axiosInstance.get(`/api/order-assignments`);
    return response.data;
  } catch (error) {
    handleError("Error fetching order assignments:", error);
  }
}

import { axiosInstance } from "../api/api";
import { handleError } from "./errorService";

export const getCollections = async () => {
    try {
        const response = await axiosInstance.get("/api/collections");
        return response.data;
    } catch (error) {
        handleError("Error fetching collections:", error);
    }
};

export const getCollectionById = async (collectionId) => {
    try {
        const response = await axiosInstance.get(`/api/collections/${collectionId}`);
        return response.data;
    } catch (error) {
        handleError("Error fetching collection:", error);
    }
};

export const createCollection = async (collectionData) => {
    try {
        const response = await axiosInstance.post("/api/collections/add", collectionData);
        return response.data;
    } catch (error) {
        handleError("Error creating collection:", error);
    }
};

export const updateCollection = async (collectionId, collectionData) => {
    try {
        const response = await axiosInstance.put(`/api/collections/update/${collectionId}`, collectionData);
        return response.data;
    } catch (error) {
        handleError("Error updating collection:", error);
    }
};

export const deleteCollection = async (collectionId) => {
    try {
        const response = await axiosInstance.delete(`/api/collections/delete/${collectionId}`);
        return response.data;
    } catch (error) {
        handleError("Error deleting collection:", error);
    }
};

import { del, get, patch, post } from "../utils/request";

export const getProductList = async () => {
    const result = await get("products");
    return result;
}

export const createProduct = async (options) => {
    const result = await post(options, "products");
    return result;
}

export const editProduct = async (options, id) => {
    const result = await patch(options, `products/${id}`);
    return result;
}

export const deleteProduct = async (id) => {
    const result = await del(`products/${id}`);
    return result;
}
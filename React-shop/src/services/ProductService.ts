import axios from "axios";
import constants from "../constants";
import { ProductResponseType, ProductType } from "../types";

const getProducts = (
    page = 1,
    minPrice,
    maxPrice,
    searchData,
    sortName,
    sortPrice
) => {
    const url = `${constants.BASE_URL}/product?page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&searchData=${searchData}&sortName=${sortName}&sortPrice=${sortPrice}`;
    return axios.get<ProductResponseType>(url);
};

const getProductById = (id: string) => {
    const url = `${constants.BASE_URL}/product/${id}`;
    return axios.get<ProductType>(url);
};

export default { getProducts, getProductById };

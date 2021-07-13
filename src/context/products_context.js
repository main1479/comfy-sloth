import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import {
	SIDEBAR_OPEN,
	SIDEBAR_TOGGLE,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
	isSidebarOpen: false,
	isProductsLoading: false,
	products: [],
	isProductsError: false,
	featuredProducts: [],
	isSingleProductLoading: false,
	singleProduct: {},
	isSingleProductError: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const fetchProducts = async (url) => {
		dispatch({ type: GET_PRODUCTS_BEGIN });
		try {
			const response = await axios.get(url);
			const products = response.data;
			dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
		} catch (error) {
			dispatch({ type: GET_PRODUCTS_ERROR });
		}
	};

	const fetchSingleProduct = async (url) => {
		dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
		try {
			const response = await axios.get(url);
			const product = response.data;
			dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
		} catch (error) {
			dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
		}
	};

	useEffect(() => {
		fetchProducts(url);
	}, []);

	const sidebarToggle = (sideBarState) => {
		dispatch({ type: SIDEBAR_TOGGLE, payload: sideBarState });
	};

	return (
		<ProductsContext.Provider value={{ ...state, sidebarToggle, fetchSingleProduct }}>
			{children}
		</ProductsContext.Provider>
	);
};
// make sure use
export const useProductsContext = () => {
	return useContext(ProductsContext);
};

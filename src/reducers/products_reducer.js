import { produce } from 'immer';
import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_SINGLE_PRODUCT_BEGIN,
	GET_SINGLE_PRODUCT_SUCCESS,
	GET_SINGLE_PRODUCT_ERROR,
	SIDEBAR_TOGGLE,
} from '../actions';

// state ref
/*
{
	isSidebarOpen: false,
	isProductsLoading: false,
	products: [],
	isProductsError: false,
	featuredProducts: [],
	isSingleProductLoading: false,
	singleProduct: {},
	isSingleProductError: false,
};
*/

const products_reducer = (state, action) => {
	if (action.type === SIDEBAR_TOGGLE) {
		return produce(state, (draftState) => {
			draftState.isSidebarOpen = action.payload;
		});
	}

	if (action.type === GET_PRODUCTS_BEGIN) {
		return produce(state, (draftState) => {
			draftState.isProductsLoading = true;
		});
	}
	if (action.type === GET_PRODUCTS_SUCCESS) {
		return produce(state, (draftState) => {
			draftState.products = action.payload;
			draftState.featuredProducts = action.payload.filter((product) => product.featured === true);
			draftState.isProductsLoading = false;
		});
	}
	if (action.type === GET_PRODUCTS_ERROR) {
		return produce(state, (draftState) => {
			draftState.isProductsLoading = false;
			draftState.isProductsError = true;
		});
	}
	if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
		return produce(state, (draftState) => {
			draftState.isSingleProductError = false;
			draftState.isSingleProductLoading = true;
		});
	}
	if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
		return produce(state, (draftState) => {
			draftState.singleProduct = action.payload;
			draftState.isSingleProductLoading = false;
		});
	}
	if (action.type === GET_SINGLE_PRODUCT_ERROR) {
		return produce(state, (draftState) => {
			draftState.isProductsLoading = false;
			draftState.isProductsError = true;
		});
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;

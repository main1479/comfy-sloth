import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
	TOGGLE_PRODUCTS_VIEW,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
	allProducts: [],
	filteredProducts: [],
	gridView: true,
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
	const [state, dispacth] = useReducer(reducer, initialState);
	const { products } = useProductsContext();
	useEffect(() => {
		dispacth({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	const toggleProductsView = () => {
		dispacth({ type: TOGGLE_PRODUCTS_VIEW });
	};

	return (
		<FilterContext.Provider value={{ ...state, toggleProductsView }}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};

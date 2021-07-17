import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
	LOAD_PRODUCTS,
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
	sortBy: 'price-lowest',
	filters: {
		search: '',
		category: 'all',
		company: 'all',
		color: 'all',
		minPrice: 0,
		maxPrice: 0,
		price: 0,
		shipping: false,
	},
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { products } = useProductsContext();

	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [state.sortBy, state.filters]);

	const toggleProductsView = () => {
		dispatch({ type: TOGGLE_PRODUCTS_VIEW });
	};

	const handleFilterChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		if (name === 'category') value = e.target.dataset.category;
		if (name === 'color') value = e.target.dataset.color;
		if (name === 'price') value = Number(value);
		if (name === 'shipping') value = e.target.checked;
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const setSort = (e) => {
		const value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	const handleClearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	return (
		<FilterContext.Provider
			value={{ ...state, toggleProductsView, setSort, handleFilterChange, handleClearFilters }}
		>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};

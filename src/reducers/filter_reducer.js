import { produce } from 'immer';
import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
	TOGGLE_PRODUCTS_VIEW,
} from '../actions';

// State ref
/*
{
	allProducts: [],
	filteredProducts: [],
	gridView: true,
	sortBy: 'price-lowest',
	filters: {
		search: '',
		category: 'all',
		companies: 'all',
		color: 'all',
		minPrice: 0,
		maxPrice: 0,
		price: 0,
		shipping: false,
	},
};
*/

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		return produce(state, (draftState) => {
			draftState.allProducts = action.payload;
			draftState.filteredProducts = action.payload;
			const maxPrice = draftState.allProducts.map((item) => item.price);
			draftState.filters.maxPrice = Math.max(...maxPrice);
			draftState.filters.price = Math.max(...maxPrice);
		});
	}

	if (action.type === TOGGLE_PRODUCTS_VIEW) {
		return produce(state, (draftState) => {
			draftState.gridView = !state.gridView;
		});
	}

	if (action.type === UPDATE_SORT) {
		return produce(state, (draftState) => {
			draftState.sortBy = action.payload;
		});
	}

	if (action.type === SORT_PRODUCTS) {
		return produce(state, (draftState) => {
			if (state.sortBy === 'price-lowest') {
				draftState.filteredProducts = draftState.filteredProducts.sort((a, b) => a.price - b.price);
			}
			if (state.sortBy === 'price-highest') {
				draftState.filteredProducts = draftState.filteredProducts.sort((a, b) => b.price - a.price);
			}
			if (state.sortBy === 'name-a') {
				draftState.filteredProducts = draftState.filteredProducts.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			}
			if (state.sortBy === 'name-z') {
				draftState.filteredProducts = draftState.filteredProducts.sort((a, b) =>
					b.name.localeCompare(a.name)
				);
			}
		});
	}

	if (action.type === UPDATE_FILTERS) {
		return produce(state, (draftState) => {
			const { name, value } = action.payload;
			draftState.filters[name] = value;
		});
	}

	if (action.type === FILTER_PRODUCTS) {
		const { allProducts } = state;
		const { search, category, company, color, price, shipping } = state.filters;
		let tempProducts = [...allProducts];

		if (search) {
			tempProducts = tempProducts.filter((product) =>
				product.name.toLowerCase().startsWith(search)
			);
		}
		if (category !== 'all') {
			tempProducts = tempProducts.filter((product) => product.category === category);
		}
		if (company !== 'all') {
			tempProducts = tempProducts.filter((product) => product.company === company);
		}
		if (color !== 'all') {
			tempProducts = tempProducts.filter((product) => product.colors.includes(color));
		}
		if (shipping) {
			tempProducts = tempProducts.filter((product) => product.shipping === true);
		}

		tempProducts = tempProducts.filter((product) => product.price <= price);

		return { ...state, filteredProducts: tempProducts };
	}

	if (action.type === CLEAR_FILTERS) {
		return produce(state, (draftState) => {
			draftState.filters = {
				...draftState.filters,
				search: '',
				category: 'all',
				company: 'all',
				color: 'all',
				minPrice: 0,
				price: state.filters.maxPrice,
				shipping: false,
			};
		});
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

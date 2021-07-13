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

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		return produce(state, (draftState) => {
			draftState.allProducts = action.payload;
			draftState.filteredProducts = action.payload;
		});
	}

	if (action.type === TOGGLE_PRODUCTS_VIEW) {
		return produce(state, (draftState) => {
			draftState.gridView = !state.gridView;
		});
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

import { produce } from 'immer';
import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;
		return produce(state, (draftState) => {
			const tempItem = state.cart.find((item) => item.id === id + color);
			if (tempItem) {
				draftState.cart = draftState.cart.map((item) => {
					if (item.id === id + color) {
						item.amount = item.amount + amount;
						if (item.amount > item.max) {
							item.amount = item.max;
						}
					}

					return item;
				});
			} else {
				const newItem = {
					id: id + color,
					name: product.name,
					color,
					amount,
					image: product.images[0].url,
					price: product.price,
					max: product.stock,
				};
				draftState.cart.push(newItem);
			}
		});
	}

	if (action.type === REMOVE_CART_ITEM) {
		return produce(state, (draftState) => {
			draftState.cart = draftState.cart.filter((item) => item.id !== action.payload);
		});
	}
	if (action.type === CLEAR_CART) {
		return produce(state, (draftState) => {
			draftState.cart = [];
		});
	}

	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		return produce(state, (draftState) => {
			draftState.cart.map((item) => {
				if (action.payload.id === item.id) {
					if (action.payload.value === 'inc') {
						item.amount += 1;
						if (item.amount > item.max) return (item.amount = item.max);
					}
					if (action.payload.value === 'dec') {
						item.amount -= 1;
						if (item.amount < 1) item.amount = 1;
					}
				}
				return item;
			});
		});
	}

	if (action.type === COUNT_CART_TOTALS) {
		return produce(state, (draftState) => {
			const { totalItem, totalAmount } = draftState.cart.reduce(
				(total, item) => {
					total.totalItem += item.amount;
					total.totalAmount += item.price * item.amount;

					return total;
				},
				{ totalItem: 0, totalAmount: 0 }
			);
			draftState.totalAmount = totalAmount;
			draftState.totalItem = totalItem;
		});
	}

	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;

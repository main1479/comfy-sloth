export const formatPrice = (number) => {
	const newNumber = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(number / 100);

	return newNumber;
};

export const getUniqueValues = (data, type) => {
	if (type === 'colors') return ['all', ...new Set(data.map((item) => item[type]).flat())];
	return ['all', ...new Set(data.map((item) => item[type]))];
};

export const inc_dec_itemCount = (itemCount, stock, type) => {
	if (type === 'inc') {
		itemCount += 1;
		if (itemCount > stock) return (itemCount = stock);
	}
	if (type === 'dec' && itemCount > 1) {
		itemCount -= 1;
		if (itemCount < 1) return (itemCount = 1);
	}

	return itemCount;
};

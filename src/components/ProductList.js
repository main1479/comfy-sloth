import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
	const { filteredProducts: products, gridView } = useFilterContext();

	if (!products.length) {
		return <h3 style={{ textTransform: 'none' }}>Sorry, no products matched your search.</h3>;
	}

	if (gridView) {
		return <GridView products={products} />;
	}

	return <ListView products={products} />;
};

export default ProductList;

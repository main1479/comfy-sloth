import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
	AboutPage,
	AuthWrapper,
	CartPage,
	CheckoutPage,
	ErrorPage,
	HomePage,
	PrivateRoute,
	ProductsPage,
	SingleProductPage,
} from './pages';

function App() {
	return (
		<Router>
			<Navbar />
			<Sidebar />
			<Switch>
				<Route path="/products/:id" component={SingleProductPage} />
				<Route path="/cart" component={CartPage} />
				<Route path="/products" exact component={ProductsPage} />
				<Route path="/checkout" component={CheckoutPage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/" exact component={HomePage} />
				<Route path="*" component={ErrorPage} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;

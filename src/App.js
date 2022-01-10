import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import ScrollToTop from './components/ScrollToTop';
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
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<ScrollToTop>
					<Switch>
						<Route path="/products/:id" component={SingleProductPage} />
						<Route path="/cart" component={CartPage} />
						<Route path="/products" exact component={ProductsPage} />
						<PrivateRoute path="/checkout">
							<CheckoutPage />
						</PrivateRoute>
						<Route path="/about" component={AboutPage} />
						<Route path="/" exact component={HomePage} />
						<Route path="*" component={ErrorPage} />
					</Switch>
				</ScrollToTop>
				<Footer />
			</Router>
		</AuthWrapper>
	);
}

export default App;

import React from 'react';
import { BsBag, BsPersonPlus, BsPersonDash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';

const CartButtons = () => {
	const { isSidebarOpen, sidebarToggle } = useProductsContext();
	const { totalItem } = useCartContext();
	const { myUser, loginWithRedirect, logout } = useUserContext();
	return (
		<Wrapper className="cart-btn-wrapper">
			<Link onClick={() => sidebarToggle(!isSidebarOpen)} className="cart-btn" to="/cart">
				Cart
				<span className="cart-container">
					<BsBag />
					<span className="cart-value">{totalItem}</span>
				</span>
			</Link>

			{myUser ? (
				<button onClick={() => logout({ returnTo: window.location.origin })} className="auth-btn">
					Logout <BsPersonDash />
				</button>
			) : (
				<button onClick={loginWithRedirect} className="auth-btn">
					Login <BsPersonPlus />
				</button>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	width: 225px;

	.cart-btn {
		display: flex;
		align-items: center;
		color: var(--clr-grey-3);
		font-size: 1rem;
		text-transform: capitalize;
		letter-spacing: var(--spacing);
		padding: 0.5rem;
		position: relative;
	}
	.cart-container {
		display: flex;
		align-items: center;
		position: relative;
		svg {
			height: 1.6rem;
			margin-left: 5px;
		}
	}
	.cart-value {
		position: absolute;
		top: -10px;
		right: -16px;
		background: var(--clr-primary-5);
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 0.75rem;
		color: var(--clr-white);
		padding: 12px;
		transition: all 0.3s;
	}

	.cart-btn:hover {
		color: var(--clr-primary-7);

		.cart-value {
			background: var(--clr-grey-3);
			transform: scale(1.2);
		}
	}
	.auth-btn {
		display: flex;
		align-items: center;
		background: transparent;
		border-color: transparent;
		cursor: pointer;
		color: var(--clr-grey-3);
		font-size: 1rem;
		text-transform: capitalize;
		letter-spacing: var(--spacing);
		padding: 0.5rem;
		position: relative;
		transition: all 0.3s;
		svg {
			margin-left: 5px;
		}

		&:hover {
			color: var(--clr-primary-7);
		}
	}
`;
export default CartButtons;

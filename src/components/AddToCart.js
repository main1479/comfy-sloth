import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product }) => {
	const { id, stock, colors } = product;
	const [selectedColor, setSelectedColor] = useState(colors[0]);
	const [itemCount, setItemCount] = useState(1);
	const { addToCart } = useCartContext();

	const increase = () => {
		if (itemCount < stock) {
			setItemCount(itemCount + 1);
		}
		if (itemCount > stock) {
			setItemCount(stock);
		}
	};

	const decrease = () => {
		if (itemCount > 1) {
			setItemCount(itemCount - 1);
		}
		if (itemCount < 1) {
			setItemCount(1);
		}
	};

	return (
		<Wrapper>
			<div className="colors">
				<span>Colors :</span>
				<div>
					{colors.map((color, index) => (
						<button
							key={index}
							className={selectedColor === color ? 'color-btn active' : 'color-btn'}
							style={{ background: color }}
							onClick={() => setSelectedColor(colors[index])}
						>
							{selectedColor === color && <FaCheck />}
						</button>
					))}
				</div>
			</div>
			<div className="btn-container">
				<AmountButtons increase={increase} decrease={decrease} itemCount={itemCount} />
				<Link
					to="/cart"
					className="btn"
					onClick={() => addToCart(id, selectedColor, itemCount, product)}
				>
					Add to cart
				</Link>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 2rem;
	.colors {
		display: grid;
		grid-template-columns: 125px 1fr;
		align-items: center;
		margin-bottom: 1rem;
		span {
			text-transform: capitalize;
			font-weight: 700;
		}
		div {
			display: flex;
		}
	}
	.color-btn {
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.75rem;
			color: var(--clr-white);
		}
	}
	.active {
		opacity: 1;
	}
	.btn-container {
		margin-top: 2rem;
	}

	.btn {
		margin-top: 1rem;
		width: 140px;
	}
`;
export default AddToCart;

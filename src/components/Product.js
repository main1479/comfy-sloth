import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Product = ({ id, image, name, price }) => {
	return (
		<Wrapper>
			<div className="container">
				<img src={image} alt={name} />
				<Link to={`/products/${id}`} className="link">
					<span className="icon">
						<BsSearch />
					</span>
				</Link>
			</div>
			<footer>
				<Link to={`/products/${id}`}>
					<h5>{name}</h5>
				</Link>
				<p>{formatPrice(price)}</p>
			</footer>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	.container {
		position: relative;
		background: var(--clr-black);
		border-radius: var(--radius);
    overflow: hidden;
	}
	img {
		width: 100%;
		display: block;
		object-fit: cover;
		border-radius: var(--radius);
		transition: var(--transition);
	}
	.link {
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		transition: var(--transition);
		cursor: pointer;
    transform: scale(0);

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			height: 45px;
			border-radius: 50%;
			background: var(--clr-grey-3);
		}
		svg {
			font-size: 1.25rem;
			color: var(--clr-white);
		}
	}
	.container:hover .link {
		transform: scale(1);
	}

	footer {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	footer h5,
	footer p {
		margin-bottom: 0;
		font-weight: 400;
		color: var(--clr-grey-1);
	}

	footer p {
		color: var(--clr-primary-5);
		letter-spacing: var(--spacing);
	}
`;
export default Product;

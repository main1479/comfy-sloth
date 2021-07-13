import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const PageHero = ({ title, product }) => {
	return (
		<Wrapper>
			<div className="section-center">
				<h3>
					<Link to="/">Home</Link>/ {product && <Link to="/products">Products /</Link>} {title}
				</h3>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	background: var(--clr-primary-10);
	width: 100%;
	min-height: 20vh;
	display: flex;
	align-items: center;

	color: var(--clr-primary-1);
	a {
		color: var(--clr-primary-3);
		padding: 0.5rem;
		transition: var(--transition);
	}
	a:hover {
		color: var(--clr-primary-1);
	}

	@media only screen and (max-width: 575px) {
		h3 {
			letter-spacing: 0.2px;
			font-size: 16px;
		}
	}
	@media only screen and (max-width: 480px) {
		h3 {
			letter-spacing: 0.2px;
			font-size: 14px;
		}
	}
`;

export default PageHero;

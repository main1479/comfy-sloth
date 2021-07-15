import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
	const {
		allProducts,
		filters: { search, category, company, minPrice, maxPrice, price, color, shipping },
		handleClearFilters,
		handleFilterChange,
	} = useFilterContext();

	const categories = getUniqueValues(allProducts, 'category');
	const companies = getUniqueValues(allProducts, 'company');
	const colors = getUniqueValues(allProducts, 'colors');

	const handleRange = () => {
		return (100 * price) / maxPrice;
	};

	return (
		<Wrapper>
			<div className="content">
				<form onSubmit={(e) => e.preventDefault()}>
					<div className="form-control">
						<input
							type="search"
							name="search"
							placeholder="search"
							className="search-input"
							onChange={handleFilterChange}
							value={search}
						/>
					</div>

					<div className="form-control">
						<h5>category</h5>
						<div>
							{categories.map((item, index) => (
								<button
									key={item + index}
									name="category"
									className={item === category ? 'category-btn active' : 'category-btn'}
									data-category={item}
									onClick={handleFilterChange}
								>
									{item}
								</button>
							))}
						</div>
					</div>

					<div className="form-control">
						<h5>company</h5>
						<select
							name="company"
							value={company}
							onChange={handleFilterChange}
							className="company"
						>
							{companies.map((item, index) => (
								<option key={item + index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>

					<div className="form-control">
						<h5>colors</h5>

						<div className="colors">
							{colors.map((item, index) => {
								if (item === 'all')
									return (
										<button
											key={item + index}
											name="color"
											data-color="all"
											className={item === color ? 'all-btn active' : 'all-btn'}
											onClick={handleFilterChange}
										>
											all
										</button>
									);
								return (
									<button
										key={item + index}
										name="color"
										className={item === color ? 'color-btn active' : 'color-btn'}
										data-color={item}
										style={{ background: item }}
										onClick={handleFilterChange}
									>
										{item === color && <FaCheck />}
									</button>
								);
							})}
						</div>
					</div>

					<div className="form-control">
						<h5>price</h5>
						<p className="price">{formatPrice(price)}</p>
						<div className="progress">
							<div className="bar">
								<div className="fill" style={{ width: `${handleRange()}%` }}></div>
							</div>
							<input
								type="range"
								name="price"
								min={minPrice}
								max={maxPrice}
								value={price}
								id="slider"
								onChange={handleFilterChange}
							/>
						</div>
					</div>
					<div className="form-control">
						<input
							type="checkbox"
							name="shipping"
							id="shipping"
							checked={shipping}
							onChange={handleFilterChange}
						/>
						<label
							htmlFor="shipping"
							className={shipping ? 'shipping-label active' : 'shipping-label'}
						>
							Free Shipping
							<span className="icon">{shipping && <FaCheck />}</span>
						</label>
					</div>
				</form>
				<button type="button" className="clear-btn" onClick={handleClearFilters}>
					clear filters
				</button>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.8rem 1.2rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
		width: 100%;
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.8rem 1rem;
		width: 100%;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
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
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.8rem 1.2rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}

	#shipping {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
		overflow: 0;
		visibility: hidden;
	}
	.shipping-label {
		font-size: 15px;
		font-weight: bold;
		border: 1px solid var(--clr-grey-2);
		padding: 0.5rem 1rem;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		/* max-width: 20rem; */

		.icon {
			width: 25px;
			height: 25px;
			border-radius: 50%;
			border: 1px solid var(--clr-grey-2);
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			transition: all 0.3s;
		}

		&.active {
			.icon {
				background: var(--clr-grey-2);
			}
		}
	}
`;

export default Filters;

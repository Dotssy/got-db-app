import PropTypes from "prop-types";
import React, { Component } from 'react';
import styled from 'styled-components';

import Spinner from '../spinner/spinner';

const DetailsBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
	opacity: .8;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}
	.select-error {
		color: #fff;
		text-align: center;
		font-size: 26px;
	}
	.term {
		font-weight: bold;
	}
`;

const ItemSelectMsg = styled.div`
	display: flex;
	background: #fff;
	opacity: .8;
	border-radius: 6px;
	justify-content: center;
	border: 1px solid #000;
	align-self: center;
	width: 100%;
	height: 100%;
	span {
		font-size: 24px;
		color: #3a3636;
		margin: auto;
	}
`;

const Field = ({ item, field, label }) => {
	return (
		<li className='list-group-item d-flex justify-content-between'>
			<span className='term'>{`${label}:`}</span>
			<span>{item[field]}</span>
		</li>
	)
};

Field.propTypes = {
	field: PropTypes.string,
	item: PropTypes.object,
	label: PropTypes.string
}

export { Field };

export default class ItemDetails extends Component {
	state = {
		item: null,
		loading: false
	}

	static propTypes = {
		itemId: PropTypes.number,
		itemType: PropTypes.string,
		getData: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();

			this.setState({
				loading: true
			});
		}
	}

	updateItem = () => {
		const { itemId, getData } = this.props;

		if (!itemId) return;

		getData(itemId)
			.then(item => {
				this.setState({
					item,
					loading: false
				});
			});
	}

	makeDetailsList = () => {
		const { item } = this.state;
		const { name } = item;

		return (
			<>
				<h4>{name}</h4>
				<ul className='list-group list-group-flush'>
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, { item })
						})
					}
				</ul>
			</>
		);
	}

	render() {
		const { item, loading } = this.state;

		if (!item) {
			return (
				<ItemSelectMsg>
					<span>Please select a {this.props.itemType}</span>
				</ItemSelectMsg>
			)
		}

		const content = loading ? <Spinner /> : this.makeDetailsList();

		return (
			<DetailsBlock className='rounded'>
				{content}
			</DetailsBlock>
		)
	}
}
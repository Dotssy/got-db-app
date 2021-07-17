import PropTypes from "prop-types";
import React, { Component } from 'react';
import styled from 'styled-components';

import Spinner from '../spinner/spinner';

const CharList = styled.ul`
	opacity: .8;
	width: 100%;
	li {
		cursor: pointer;
	}
`;

const ListBlock = styled.div`
	opacity: .8;
	background-color: #fff;
	height: 100%;
	display: flex;
	border-radius: 0.25rem;
	div {
		margin: auto;
	}
`;

export default class ItemList extends Component {
	state = {
		itemList: null
	}

	static defaultProps = {
		onItemSelect: () => {}
	}

	static propTypes = {
		getData: PropTypes.func,
		onItemSelect: PropTypes.func,
		renderItem: PropTypes.func
	}

	componentDidMount() {
		const { getData } = this.props;

		getData()
			.then((itemList) => {
				this.setState({
					itemList,
				})
			});
	}

	renderList = (itemList) => {
		const items = itemList.map((item) => {
			const { id } = item;
			const label = this.props.renderItem(item);

			return (
				<li
					key={id}
					className='list-group-item'
					onClick={() => this.props.onItemSelect(id)}>
					{label}
				</li>
			);
		});

		return (
			<CharList className='item-list list-group'>
				{items}
			</CharList>
		);
	}

	render() {
		const { itemList } = this.state;
		let content;

		if (!itemList) {
			content = <Spinner />;
		} else {
			content = this.renderList(itemList);
		}

		return (
			<ListBlock>
				{content}
			</ListBlock>
		);
	}
}
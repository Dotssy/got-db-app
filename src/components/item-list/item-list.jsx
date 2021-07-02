import PropTypes from "prop-types";
import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../service/got-service';
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
	gotService = new GotService();

	state = {
		charList: null
	}

	componentDidMount() {
		this.gotService.getAllChars()
			.then((charList) => {
				this.setState({
					charList,
				})
			});
	}

	renderList = (charList) => {
		const items = charList.map((char) => {
			const {name, id} = char;
			return (
				<li
					key={id}
					className='list-group-item'
					onClick={() => this.props.onCharSelect(id)}>
					{name}
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
		const {charList} = this.state;
		let content;

		if (!charList) {
			content = <Spinner />;
		} else {
			content = this.renderList(charList);
		}

		return (
			<ListBlock>
				{content}
			</ListBlock>
		);
	}
}

ItemList.propTypes = {
	onCharSelect: PropTypes.func
}
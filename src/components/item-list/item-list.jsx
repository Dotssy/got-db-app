import PropTypes from "prop-types";
import React, {Component} from 'react';
import styled from 'styled-components';

import GotService from '../../service/got-service';
import Spinner from '../spinner/spinner';

const CharList = styled.ul`
	opacity: .8;
	li {
		cursor: pointer;
	}
`;
export default class ItemList extends Component {
	gotService = new GotService();

	state = {
		charList: null
	};

	componentDidMount() {
		this.gotService.getAllChars()
			.then((charList) => {
				this.setState({
					charList
				})
			})
	}

	renderItems = (charList) => {
		return charList.map((char, i) => {
			return (
				//TODO Сделать генерацию айдишников
				//TODO Сделать чё то с нумерацией страниц
				<li 
					key={i} 
					className='list-group-item'
					onClick={() => this.props.onCharSelect(41 + i)}>
					{char.name}
				</li>
			);
		});
	}

	render() {
		const {charList} = this.state;
		//TODO Запилить реализацию спиннера как в рандом чар
		if (!charList) return <Spinner />

		const items = this.renderItems(charList);
		
		return (
			<CharList className='item-list list-group'>
				{items}				
			</CharList>
		);
	}
}

ItemList.propTypes = {
  onCharSelect: PropTypes.func
}

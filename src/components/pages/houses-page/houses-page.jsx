import React, { Component } from 'react';

import GotService from '../../../service/got-service';
import ItemDetails, { Field } from '../../item-details/item-details';
import ItemList from '../../item-list/item-list';
import ErrorMsg from '../../error-msg/error-msg';
import RowBlock from '../../row-block/row-block';

export default class BooksPage extends Component {
	gotService = new GotService();

	state = {
		selectedHouse: null,
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({
			selectedHouse: id
		});
	}

	render() {

		if (this.state.error) {
			return <ErrorMsg />
		}

		const itemList = (
			<ItemList
				onItemSelect={this.onItemSelected}
				getData={this.gotService.getAllHouses}
				renderItem={({ name }) => `${name}`} />
		)

		const charDetails = (
			<ItemDetails 
				itemId={this.state.selectedHouse} 
				itemType='book'
				getData={this.gotService.getHouse}>
					<Field field='overlord' label='Overlord' />
					<Field field='heir' label='Heir' />
					<Field field='words' label='Words' />
					<Field field='founded' label='Founded' />
			</ItemDetails>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)
	}
}
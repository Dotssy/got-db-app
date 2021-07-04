import React, { Component } from 'react';

import GotService from '../../../service/got-service';
import ItemDetails, { Field } from '../../item-details/item-details';
import ItemList from '../../item-list/item-list';
import ErrorMsg from '../../error-msg/error-msg';
import RowBlock from '../../row-block/row-block';

export default class BooksPage extends Component {
	gotService = new GotService();

	state = {
		selectedBook: null,
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({
			selectedBook: id
		});
	}

	render() {

		if (this.state.error) {
			return <ErrorMsg />
		}

		const itemList = (
			<ItemList
				onItemSelect={this.onItemSelected}
				getData={this.gotService.getAllBooks}
				renderItem={({ name }) => `${name}`} />
		)

		const charDetails = (
			<ItemDetails 
				itemId={this.state.selectedBook} 
				itemType='book'
				getData={this.gotService.getBook}>
					<Field field='numberOfPages' label='Number of pages' />
					<Field field='released' label='Released' />
					<Field field='publiser' label='Publiser' />
			</ItemDetails>
		)

		return (
			<RowBlock left={itemList} right={charDetails} />
		)
	}
}
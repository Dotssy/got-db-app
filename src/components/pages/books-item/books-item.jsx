import React, { Component } from 'react';
import GotService from '../../../service/got-service';
import ItemDetails, { Field } from '../../item-details/item-details';

export default class BooksItem extends Component {
	gotService = new GotService();

	render() {
		return (
			<ItemDetails 
				itemId={this.props.bookId} 
				itemType='book'
				getData={this.gotService.getBook}>
					<Field field='numberOfPages' label='Number of pages' />
					<Field field='publiser' label='Publiser' />
					<Field field='released' label='Released' />
			</ItemDetails>
		)
	}
}
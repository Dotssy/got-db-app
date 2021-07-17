import React, { Component } from 'react';

import GotService from '../../../service/got-service';
import ItemDetails, { Field } from '../../item-details/item-details';
import ItemList from '../../item-list/item-list';
import ErrorMsg from '../../error-msg/error-msg';
import RowBlock from '../../row-block/row-block';

export default class CharacterPage extends Component {
	gotService = new GotService();

	state = {
		selectedChar: null,
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	onItemSelected = (id) => {
		this.setState({
			selectedChar: id
		});
	}

	render() {

		if (this.state.error) {
			return <ErrorMsg />
		}

		const itemList = (
			<ItemList
				onItemSelect={this.onItemSelected}
				getData={this.gotService.getAllChars}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		);

		const charDetails = (
			<ItemDetails 
				itemId={this.state.selectedChar} 
				itemType='character'
				getData={this.gotService.getChar}>
					<Field field='gender' label='Gender' />
					<Field field='born' label='Born' />
					<Field field='died' label='Died' />
					<Field field='culture' label='Culture' />
			</ItemDetails>
		);

		return (
			<RowBlock left={itemList} right={charDetails} />
		);
	}
}
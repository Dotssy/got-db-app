import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import GotService from '../../../service/got-service';
import ItemList from '../../item-list/item-list';
import ErrorMsg from '../../error-msg/error-msg';

class BooksPage extends Component {
	gotService = new GotService();

	state = {
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	render() {

		if (this.state.error) {
			return <ErrorMsg />
		}

		return (
			<ItemList
				onItemSelect={(itemId) => {
					this.props.history.push(String(itemId));
				}}
				getData={this.gotService.getAllBooks}
				renderItem={({ name }) => `${name}`} />
		)
	}
}

export default withRouter(BooksPage);
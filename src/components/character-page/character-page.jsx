import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
// import styled from 'styled-components';

import CharDetails from '../char-details/char-details';
import ItemList from '../item-list/item-list';
import ErrorMsg from '../error-msg/error-msg';

export default class CharacterPage extends Component {
	state = {
		selectedChar: 130,
		error: false
	}

	componentDidCatch() {
		this.setState({error: true});
	}

	onCharSelected = (id) => {
		this.setState({
			selectedChar: id
		});
	}

	render() {

		if (this.state.error) {
			return <ErrorMsg />
		}

		return (
			<Row>
				<Col md='6'>
					<ItemList onCharSelect={this.onCharSelected} />
				</Col>
				<Col md='6'>
					<CharDetails charId={this.state.selectedChar} />
				</Col>
			</Row>
		);
	}
}
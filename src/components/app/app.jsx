import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';

import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import CharacterPage from '../pages/character-page/character-page';
import ErrorMsg from '../error-msg/error-msg';

// import CharDetails from '../char-details/char-details';
// import ItemList from '../item-list/item-list';
import GotService from '../../service/got-service';

const ToggleBtn = styled.button`
	margin-bottom: 35px;
`;
export default class App extends Component {
	gotService = new GotService();

	state = {
		showRandomChar: true,
		error: false
	}

	componentDidCatch() {
		this.setState({ error: true });
	}

	hideToggle = () => {
		this.setState({ showRandomChar: !this.state.showRandomChar });
	}

	render() {
		const { showRandomChar } = this.state;

		if (this.state.error) {
			return <ErrorMsg />
		}

		return (
			<>
				<Container>
					<Header />
					<Row>
						<Col className='text-center' lg={{ size: 5, offset: 4 }}>
							{showRandomChar ? <RandomChar /> : null}
							<ToggleBtn className='btn btn-secondary' type='button' onClick={this.hideToggle}>
								Click me to toggle random character
							</ToggleBtn>
						</Col>
					</Row>
					<CharacterPage />
					{/* <Row>
						<Col md='6'>
							<ItemList 
								onItemSelect={this.onItemSelected}
								getData={this.gotService.getAllBooks}
								renderItem={(item) => item.name} />
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
					<Row>
						<Col md='6'>
							<ItemList 
								onItemSelect={this.onItemSelected}
								getData={this.gotService.getAllHouses}
								renderItem={(item) => item.name} />
						</Col>
						<Col md='6'>
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row> */}
				</Container>
			</>
		);
	}
}
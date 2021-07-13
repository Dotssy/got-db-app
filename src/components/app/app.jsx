import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import './app.css';

import GotService from '../../service/got-service';
import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import CharacterPage from '../pages/character-page/character-page';
import BooksPage from '../pages/books-page/books-page';
import HousesPage from '../pages/houses-page/houses-page';
import BooksItem from '../pages/books-item/books-item';
import ErrorMsg from '../error-msg/error-msg';

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
			<Router>
				<div className="app">
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

						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' component={HousesPage} />
						<Route path='/books' exact component={BooksPage} />
						<Route path='/books/:id' render={
							({ match }) => {
								const { id } = match.params;
								return <BooksItem bookId={+id} />
							}
						} />

					</Container>
				</div>
			</Router>
		);
	}
}
import React, {Component} from 'react';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';

import Header from '../header/header';
import RandomChar from '../random-char/random-char';
import CharacterPage from '../character-page/character-page';
import ErrorMsg from '../error-msg/error-msg';

const ToggleBtn = styled.button`
	margin-bottom: 35px;
`;
export default class App extends Component {
	state = {
		showRandomChar: true,
		error: false
	}

	componentDidCatch() {
		this.setState({error: true});
	}

	hideToggle = () => {
		this.setState({showRandomChar: !this.state.showRandomChar});
	}

	render() {
		const {showRandomChar} = this.state;

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
				</Container>
			</>
		);
	}
}
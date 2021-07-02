import PropTypes from "prop-types";
import React, { Component } from 'react';
import styled from 'styled-components';

import GotService from '../../service/got-service';
import Spinner from '../spinner/spinner';

const DetailsBlock = styled.div`
	background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
	opacity: .8;
	h4 {
		margin-bottom: 20px;
    	text-align: center;
	}
	.select-error {
		color: #fff;
    	text-align: center;
    	font-size: 26px;
	}
	.term {
		font-weight: bold;
	}
`;

const CharSelectMsg = styled.div`
	display: flex;
	background: #fff;
	opacity: .8;
	border-radius: 6px;
	justify-content: center;
	border: 1px solid #000;
	align-self: center;
	width: 100%;
	height: 100%;
	span {
		font-size: 24px;
		color: #3a3636;
		margin: auto;
	}
`;

export default class CharDetails extends Component {
	gotService = new GotService();

	state = {
		char: null,
		loading: false
	}

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();

			this.setState({
				loading: true
			});
		}
	}

	updateChar = () => {
		const { charId } = this.props;

		if (!charId) return;

		this.gotService.getChar(charId)
			.then(char => {
				this.setState({
					char,
					loading: false
				});
			});
	}

	makeDetailsList = () => {
		const { name, gender, born, died, culture } = this.state.char;

		return (
			<>
				<h4>{name}</h4>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item d-flex justify-content-between'>
						<span className='term'>Gender: </span>
						<span>{gender}</span>
					</li>
					<li className='list-group-item d-flex justify-content-between'>
						<span className='term'>Born: </span>
						<span>{born}</span>
					</li>
					<li className='list-group-item d-flex justify-content-between'>
						<span className='term'>Died: </span>
						<span>{died}</span>
					</li>
					<li className='list-group-item d-flex justify-content-between'>
						<span className='term'>Culture: </span>
						<span>{culture}</span>
					</li>
				</ul>
			</>
		);
	}

	render() {
		if (!this.state.char) {
			return (
				<CharSelectMsg>
					<span>Please select a character</span>
				</CharSelectMsg>
			);
		}

		let content;

		if (this.state.loading) {
			content = <Spinner />
		} else {
			content = this.makeDetailsList();
		}

		return (
			<DetailsBlock className='rounded'>
				{content}
			</DetailsBlock>
		);
	}
}

CharDetails.propTypes = {
	charId: PropTypes.number
}

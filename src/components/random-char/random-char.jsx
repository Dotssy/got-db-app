import PropTypes from "prop-types";
import React, { Component } from 'react';
import styled from 'styled-components';

import GotService from '../../service/got-service';
import Spinner from '../spinner/spinner';
import ErrorMsg from '../error-msg/error-msg';

const RandomBlock = styled.div`
	background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
	opacity: .8;
	h4 {
		margin-bottom: 20px;
    	text-align: center;
	}
	.term {
		font-weight: bold;
	}
`;

export default class RandomChar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			char: {},
			loading: true
		};
		this.onCharLoaded = this.onCharLoaded.bind(this);
		this.onError = this.onError.bind(this);
		
		this.gotService = new GotService();
		this.updateChar();
	}

	onCharLoaded(char) {
		this.setState({
			char,
			loading: false,
			error: false
		});
	}

	onError() {
		this.setState({
			error: true,
			loading: false
		});
	}

	updateChar() {
		const id = Math.floor(Math.random() * 150 + 25); // 25 - 150

		this.gotService.getChar(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {
		const { char, loading, error } = this.state;

		const errorMessage = error ? <ErrorMsg/> : null;
		const content = loading ? <Spinner /> : <View char={char} />;

		return (
			<RandomBlock className='rounded'>
				{errorMessage || content}
			</RandomBlock>
		);
	}
}

const View = ({char}) => {
	const {name, gender, born, died, culture} = char;

	return (
		<>
			<h4>Random Character: {name}</h4>
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
};

View.propTypes = {
  char: PropTypes.shape({
    born: PropTypes.string,
    culture: PropTypes.string,
    died: PropTypes.string,
    gender: PropTypes.string,
    name: PropTypes.string
  })
}
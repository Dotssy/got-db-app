import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
	text-align: center;
	img {
		width: 100%;
		height: auto;
	}
	span {
		font-size: 20px;
		color: red;
		margin-top: -8px;
	}
`;

const ErrorMsg = () => {
	return (
		<Error>
			<img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='Error'/>
			<span>Something gone wrong</span>
		</Error>
	);
};

export default ErrorMsg;
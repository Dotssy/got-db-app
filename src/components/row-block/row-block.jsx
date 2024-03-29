import PropTypes from "prop-types";
import React from 'react';
import { Col, Row } from 'reactstrap';


const RowBlock = ({ left, right }) => {
	return (
		<Row>
			<Col md='6'>
				{left}
			</Col>
			<Col md='6'>
				{right}
			</Col>
		</Row>
	)
};

RowBlock.propTypes = {
	left: PropTypes.node,
	right: PropTypes.node
}

export default RowBlock;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FaStar, FaRegStar } from 'react-icons/fa';


class Starred extends Component {
    constructor(props) {
        super(props);
    }

    renderFilled(i) {
        return <FaStar key={i} color = "teal" onClick={() => this.props.putStars(i)} title = {i}/>
    }

    renderEmpty(i) {
        return <FaRegStar key={i} color = "grey" onClick={() => this.props.putStars(i)} title = {i}/>
    }

    render() {
        const { stars } = this.props;
        if (stars) {
            var i;
            var output = [];
            for (i = 1; i <= 5; i++) {
                if (i <= stars) {
                    output.push(this.renderFilled(i));
                } else {
                    output.push(this.renderEmpty(i));
                }
            }
            return <span>{output}</span>;
        }
        // Initial position
        return (
            <span>
                <FaRegStar key={1} color="grey" onClick={() => this.props.putStars(1)} title = "1"/>
                <FaRegStar key={2} color="grey" onClick={() => this.props.putStars(2)} title = "2"/>
                <FaRegStar key={3} color="grey" onClick={() => this.props.putStars(3)} title = "3"/>
                <FaRegStar key={4} color="grey" onClick={() => this.props.putStars(4)} title = "4"/>
                <FaRegStar key={5} color="grey" onClick={() => this.props.putStars(5)} title = "5"/>
            </span>
        );
    }
}

Starred.propTypes = {
    stars: PropTypes.number, // initial position without any stars
    putStars: PropTypes.func.isRequired
};

export default Starred;
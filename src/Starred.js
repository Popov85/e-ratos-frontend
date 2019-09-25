import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';

class Starred extends Component {
    constructor(props) {
        super(props);
    }

    renderFilled(i) {
        return <FaStar key={i} color="teal" onClick={() => this.props.putStars(i)} title={i} />
    }

    renderEmpty(i) {
        return <FaRegStar key={i} color="grey" onClick={() => this.props.putStars(i)} title={i} />
    }

    renderRegular() {
        const { stars } = this.props;
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

    renderInit() {
        return (
            <span>
                {
                    [1, 2, 3, 4, 5].map(i => {
                        return <FaRegStar
                            key={i}
                            color="grey"
                            title={i}
                            onClick={() => this.props.putStars(i)} />
                    })
                }
            </span>
        );
    }

    render() {
        const { stars } = this.props;
        return (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="CheckTooltip"><strong>Stars</strong> current question</Tooltip>}>
                {stars ? this.renderRegular() : this.renderInit()}
            </OverlayTrigger>
        );
    }

}

Starred.propTypes = {
    stars: PropTypes.number, // initial position without any stars
    putStars: PropTypes.func.isRequired
};

export default Starred;
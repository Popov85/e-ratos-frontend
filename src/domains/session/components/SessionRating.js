import React from 'react';
import PropTypes from 'prop-types';
import Rating from "react-rating";
import {FaRegStar, FaStar} from "react-icons/fa";

const SessionRating = props => {

    const {questionId} = props;
    const {schemeId, isLMS} = props.context;

    return (
        <Rating
            initialRating={props.initStars}
            emptySymbol={<FaRegStar color="grey"/>}
            fullSymbol={<FaStar color="teal"/>}
            onChange={rate => props.getStarred(schemeId, questionId, isLMS, rate)}
        />
    );
};

SessionRating.propTypes = {
    context: PropTypes.object.isRequired,
    questionId: PropTypes.number.isRequired,
    initStars: PropTypes.number,

    getStarred: PropTypes.func.isRequired
};

export default SessionRating;
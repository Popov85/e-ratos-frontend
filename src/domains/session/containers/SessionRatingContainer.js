import {connect} from "react-redux";
import {getStarred} from "../actions/sessionActions";
import {getQuestion, getStars} from "../selectors/sessionSelector";
import SessionRating from "../components/SessionRating";
import {getContext} from "../selectors/contextSelector";

const mapStateToProps = state => {
    return {
        context: getContext(state),
        questionId: getQuestion(state).questionId,
        initStars: getStars(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStarred: (schemeId, questionId, isLMS, rate) => dispatch(getStarred(schemeId, questionId, isLMS, rate)),
    }
}

const SessionRatingContainer = connect(mapStateToProps, mapDispatchToProps)(SessionRating);

export default SessionRatingContainer;
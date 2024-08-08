import React from 'react';
import Rating from "react-rating";
import {FaRegStar, FaStar} from "react-icons/fa";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../types/Context";
import {RootState} from "../../../store/rootReducer";
import {getContext} from "../selectors/contextSelector";
import {getStarred} from "../actions/sessionActions";
import {getQuestion, getStars} from "../selectors/sessionSelector";
import {Stars} from "../types/Stars";
import {BaseQuestion} from "../types/questions/BaseQuestion";


const SessionRating: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const question: BaseQuestion | null = useSelector((state: RootState) => getQuestion(state));
    const initStars: Stars | null = useSelector((state: RootState) => getStars(state));

    if (!context || !question) return null;

    const {questionId} = question;
    const {schemeId, isLMS} = context;

    return (
        <Rating
            initialRating={initStars?.stars}
            emptySymbol={<FaRegStar color="grey"/>}
            fullSymbol={<FaStar color="teal"/>}
            onChange={(rate: number) => dispatch(getStarred(schemeId, questionId, isLMS, rate))}
        />
    );
};

export default SessionRating;
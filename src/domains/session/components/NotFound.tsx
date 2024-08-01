import React from 'react';
import {FaRedo} from 'react-icons/fa';
import LogoMini from '../../common/components/LogoMini';
import Header from "../../common/components/Header";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {resetSession} from "../actions/sessionActions";
import {resetFailure} from "../actions/failureActions";

const NotFound: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    return (
        <div className="container-fluid p-0 mt-1">
            <LogoMini/>
            <Header title="SESSION NOT FOUND" color="alert-warning"/>
            <div className="text-center mt-3">
                <button className="btn btn-secondary"
                        onClick={() => {
                            dispatch(resetSession());
                            dispatch(resetFailure());
                        }}
                        title="Start the scheme again">
                    Re-start&nbsp;<FaRedo color="white"/>
                </button>
            </div>
        </div>
    );
}

export default NotFound;

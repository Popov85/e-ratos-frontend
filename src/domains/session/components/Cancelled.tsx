import React from 'react';
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {FaRedo} from 'react-icons/fa';
import Header from "../../common/components/Header";
import {resetSession} from "../actions/sessionActions";
import {RootState} from "../../../store/rootReducer";
import {getResult} from "../selectors/contextSelector";
import {FinishInfo} from "../types/FinishInfo";

const Cancelled: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const result: FinishInfo | null = useSelector((state: RootState) => getResult(state));

    if (!result) return null;

    const {user, scheme, passed} = result;

    return (
        <div className="container-fluid p-0">
            <div className="mt-5">
                <Header title="CANCELLED" color="alert-warning"/>
                <div className="row mt-1">
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"/>
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                        <div className="bg-light">
                            <div className="row mb-1">
                                <div className="col-4">
                                    <div className="text-secondary">name:</div>
                                </div>
                                <div className="col-8">
                                    <div className="alert-sm alert-info">{user}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-4">
                                    <div className="text-secondary">scheme:</div>
                                </div>
                                <div className="col-8">
                                    <div className="alert-sm alert-info">{scheme}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-4">
                                    <div className="text-secondary">passed:</div>
                                </div>
                                <div className="col-8">
                                    <div
                                        className={`alert-sm alert-${(passed) ? "success" : "danger"}`}>{(passed) ? "Yes" : "No"}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"/>
                </div>

                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-secondary" onClick={() => dispatch(resetSession())}>
                            Re-start&nbsp;<FaRedo color="white"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cancelled;
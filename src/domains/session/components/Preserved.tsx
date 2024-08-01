import React from 'react';
import {FaArrowLeft, FaRedo} from 'react-icons/fa';

import LogoMini from '../../common/components/LogoMini';
import Spinner from '../../common/components/Spinner';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getRetrieved, resetSession} from "../actions/sessionActions";
import {getContext} from "../selectors/contextSelector";
import {Context} from "../types/Context";
import {RootState} from "../../../store/rootReducer";

const Preserved: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const isLoaded: boolean = useSelector((state: RootState) => state.session.session.isLoaded);
    const preserved: Map<string, string> = useSelector((state: RootState) => state.session.session.preserved);
    const failure = useSelector((state: RootState) => state.session.failure);

    let key: string | undefined = preserved.get('key'); // Key of preserved session stored at the BE in the DB

    if (!context || !key) return null;

    if (!isLoaded)
        return (<div>
            <LogoMini/>
            <Header title="SESSION HAS BEEN PRESERVED" color="alert-success"/>
            <Spinner message="Retrieving..."/>
        </div>);

    return (
        <div className="container-fluid p-0">
            <LogoMini/>
            <Header title="SESSION HAS BEEN PRESERVED" color="alert-success"/>
            {
                failure.is ? <Failure message={failure.message ?? undefined}
                                      serverError={failure.serverError ?? undefined}/> : null
            }
            <div className="text-center mt-3">
                    <span>
                        <button className="btn btn-secondary mr-1"
                                onClick={() => dispatch(resetSession())}
                                title="Start the scheme again">Re-start&nbsp;<FaRedo color="white"/>
                        </button>
                        <button className="btn btn-secondary"
                                onClick={() => dispatch(getRetrieved(key as string, context.isLMS))}
                                title="Retrieve and proceed">Retrieve&nbsp;<FaArrowLeft color="white"/>
                        </button>
                    </span>
            </div>
        </div>
    );

}

export default Preserved;
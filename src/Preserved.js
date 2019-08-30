import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from "./Header";
import Start from './Start';
import Batch from './Batch';
import Spinner from './Spinner';
import Failure from './Failure';
import LogoMini from './LogoMini';
import { processError } from './Error';
import ApiBatch from "./ApiBatch";

import { FaRedo, FaArrowLeft} from 'react-icons/fa';


class Preserved extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRestarted: false,
            isRetrieved: false,
            batch: null,

            isLoaded: true,
            error: null,
            serverError: null
        }
    }

    reTryRetrieveAPICall() {
        this.setState({
            isLoaded: false,
            error: null,
            serverError: null
        });
        const { preservedKey, panelInfo} = this.props;
        ApiBatch.retrieve(preservedKey, panelInfo.lms)
            .then(batch => {
                console.log("Retrieved success = ", batch);
                this.setState({ batch, isRetrieved: true });
            }).catch(e => {
                processError(e, "Failed to perform 'retrieve' API call", this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }


    render() {
        const { isRestarted, isRetrieved, batch, isLoaded, error, serverError } = this.state;
        const { panelInfo, schemeInfo } = this.props;
        if (!isLoaded)
            return (<div>
                <LogoMini/>
                <Header title="SESSION HAS BEEN PRESERVED" color="alert-success" />
                <Spinner message="Retrieving..." />
            </div>);
        if (isRetrieved)
            return <Batch
                panelInfo={panelInfo}
                schemeInfo={schemeInfo}
                batch={batch} />
        if (isRestarted)
            return <Start
                panelInfo={panelInfo} 
                schemeInfo={schemeInfo} />;
        return (
            <div>
                <LogoMini/>
                <Header title="SESSION HAS BEEN PRESERVED" color="alert-success" />
                {
                    error ? <Failure message={error.message} serverError={serverError} /> : null
                }
                <div className="text-center mt-3">
                    <span>
                        <button className="btn btn-secondary mr-1"
                            onClick={() => this.setState({ isRestarted: true })}
                            title="Start the scheme again">Re-start&nbsp;<FaRedo color="white" />
                        </button>
                        <button className="btn btn-secondary"
                            onClick={() => this.reTryRetrieveAPICall()}
                            title="Retrieve and proceed">Retrieve&nbsp;<FaArrowLeft color="white" />
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}

Preserved.propTypes = {
    preservedKey: PropTypes.string.isRequired,
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
};

export default Preserved;
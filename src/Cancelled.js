import React from 'react';
import PropTypes from 'prop-types';

const Cancelled = props => {
    const { user, scheme} = props.result;
    return (
        <div className="row pt-5">
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"/>
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">

                <div className="row mb-1 text-center">
                    <div className="col-12">
                        <div className="pt-3 pb-3 alert-sm alert-warning">CANCELLED</div>
                    </div>
                </div>

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

                </div>

            </div>
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"/>
        </div>)
};

Cancelled.propTypes = {
    result: PropTypes.object.isRequired
};

export default Cancelled;
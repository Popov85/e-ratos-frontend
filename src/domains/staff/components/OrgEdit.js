import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import OrgEditForm from "../forms/OrgEditForm";
import {Redirect} from "react-router-dom";

class OrgEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearOrgState();
    }

    handleSubmit(data) {
        //console.log("orgDTO = ", data);
        !data.orgId ?
            this.props.saveOrg(data) :
            this.props.updateOrg(data);
    }

    render() {
        const authorization = this.props.authorization;
        if (!authorization.isGlobalAdmin) return <Redirect to="/unauthorized"/>

        const {isLoading, error, message} = this.props.orgEdit;

        return (
            <div>
                <div className="row mt-1">
                    <div className="col-12">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            error &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            message &&
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success"><strong>{message}</strong></span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="card-body">
                                <OrgEditForm
                                    initialValues={ this.props.org ?
                                        {
                                            orgId: this.props.org.orgId,
                                            name: this.props.org.name
                                        }
                                        : null
                                    }
                                    onSubmit={data => this.handleSubmit(data)}
                                    finished={!!message}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                                <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

OrgEdit.propTypes = {
    authorization: PropTypes.object.isRequired,
    orgEdit: PropTypes.object.isRequired,
    org: PropTypes.object, // Nullable for new objects

    clearOrgState: PropTypes.func.isRequired,
    saveOrg: PropTypes.func.isRequired,
    updateOrg: PropTypes.func.isRequired,

};

export default OrgEdit;

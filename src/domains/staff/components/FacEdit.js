import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import FacEditForm from "../forms/FacEditForm";
import {Redirect} from "react-router-dom";

class FacEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearFacState();
    }

    handleSubmit(data) {
        //console.log("facDTO = ", data);
        if (!data.orgId) data.orgId =
            this.props.userInfo.staff.department.faculty.organisation.orgId;
        !data.facId ?
            this.props.saveFac(data) :
            this.props.updateFac(data);
    }

    render() {
        const {fac} = this.props;
        const {organisations} = this.props;
        const authorization = this.props.authorization;
        if (!authorization.isAtLeastOrgAdmin) return <Redirect to="/unauthorized"/>

        const {isLoading, error, message} = this.props.facEdit;

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
                                <FacEditForm
                                    initialValues={ fac ?
                                        {
                                            facId: fac.facId,
                                            name: fac.name,
                                            orgId: fac.organisation.orgId
                                        }
                                        : null
                                    }
                                    authorization={authorization}
                                    organisations = {organisations}
                                    disabled={isLoading}
                                    finished = {!!message}
                                    onSubmit={data => this.handleSubmit(data)}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden = {!!message}>
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

FacEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    facEdit: PropTypes.object.isRequired,
    fac: PropTypes.object, // Nullable for new objects
    organisations: PropTypes.array,

    clearFacState: PropTypes.func.isRequired,
    saveFac: PropTypes.func.isRequired,
    updateFac: PropTypes.func.isRequired
};

export default FacEdit;

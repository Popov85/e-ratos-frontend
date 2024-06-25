import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import DepEditForm from "../forms/DepEditForm";
import {Redirect} from "react-router-dom";

class DepEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearDepState();
        this.props.clearOrgIdSelected();
        const {dep} = this.props;
        if (dep) this.props.setOrgIdSelected(dep.faculty.organisation.orgId);
    }

    handleSubmit(data) {
        //console.log("depDTO = ", data);
        if (!data.facId) data.facId =
            this.props.userInfo.staff.department.faculty.facId;
        !data.depId ?
            this.props.saveDep(data) :
            this.props.updateDep(data);
    }

    render() {
        const {dep} = this.props;
        const {organisations, faculties} = this.props;
        const authorization = this.props.authorization;
        if (!authorization.isAtLeastFacAdmin) return <Redirect to="/unauthorized"/>

        const {isLoading, error, message} = this.props.depEdit;

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
                                <DepEditForm
                                    initialValues={ dep ?
                                        {
                                            depId: dep.depId,
                                            name: dep.name,
                                            facId: dep.faculty.facId,
                                            orgId: dep.faculty.organisation.orgId
                                        }
                                        : null
                                    }
                                    authorization = {authorization}
                                    organisations = {organisations}
                                    faculties={faculties}
                                    disabled={isLoading}
                                    finished = {!!message}
                                    setOrgIdSelected = {this.props.setOrgIdSelected}
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

DepEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    depEdit: PropTypes.object.isRequired,
    dep: PropTypes.object, // Nullable for new objects
    organisations: PropTypes.array, // Empty for lower admins
    faculties: PropTypes.array, // // Empty for lower admins

    clearDepState: PropTypes.func.isRequired,
    saveDep: PropTypes.func.isRequired,
    updateDep: PropTypes.func.isRequired,
    setOrgIdSelected: PropTypes.func.isRequired,
    clearOrgIdSelected: PropTypes.func.isRequired
};

export default DepEdit;

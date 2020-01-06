import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/Failure";
import ProtectedResource from "../../common/ProtectedResource";
import DepEditForm from "../forms/DepEditForm";
import {departmentsTransformer} from "../../utils/transformers/departmentsTransformer";

class DepEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearDepState();
        this.props.clearOrgIdSelected();
        const {dep} = this.props;
        if (dep) this.props.setOrgIdSelected(dep.faculty.organisation.orgId);
    }

    handleSubmit(data) {
        let {facContent} = this.props;
        let depDTO = departmentsTransformer
            .depFormToDTO(data, facContent);
        console.log("depDTO = ", depDTO);
        !data.depId ?
            this.props.saveDep(depDTO) :
            this.props.updateDep(depDTO);
    }

    render() {
        const {dep} = this.props;
        const {userInfo, organisations, faculties} = this.props;
        const {authenticated} = this.props.userInfo;
        if (!authenticated.isAtLeastFacAdmin) return <ProtectedResource/>

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
                                    userInfo = {userInfo}
                                    organisations = {organisations}
                                    faculties={faculties}
                                    setOrgIdSelected = {this.props.setOrgIdSelected}
                                    onSubmit={data => this.handleSubmit(data)}
                                    finished = {message ? true : false}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden = {message ? true : false}>
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
    depEdit: PropTypes.object.isRequired,
    dep: PropTypes.object, // Nullable for new objects
    facContent: PropTypes.array,
    organisations: PropTypes.array,
    faculties: PropTypes.array,

    clearDepState: PropTypes.func.isRequired,
    saveDep: PropTypes.func.isRequired,
    updateDep: PropTypes.func.isRequired,
    setOrgIdSelected: PropTypes.func.isRequired,
    clearOrgIdSelected: PropTypes.func.isRequired
};

export default DepEdit;

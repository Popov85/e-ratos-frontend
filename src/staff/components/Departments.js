import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import {Redirect} from "react-router-dom";
import DepEditModal from "./DepEditModal";
import DepTable from "./DepTable";

class Departments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
    }

    componentDidMount() {
        const {departments} = this.props;
        if (!departments.content) this.loadDepartmentsBasedOnRole();
    }

    loadDepartmentsBasedOnRole() {
        const {isGlobalAdmin, isAtLeastOrgAdmin} =
            this.props.userInfo.authenticated;
        if (isGlobalAdmin) {// and organisation and faculties
            this.props.getAllDepartmentsBunchByRatos();
        } else if (isAtLeastOrgAdmin) {// and faculties
            this.props.getAllDepartmentsBunchByOrganisation();
        } else {//only departments
            this.props.getAllDepartmentsByFaculty();
        }
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    handleUpdate(facId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateDepName(facId, newValue);
                return;
            }
            default:
                return;
        }
    }

    handleTableChange(type, {cellEdit}) {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            this.handleUpdate(rowId, dataField, newValue);
        }
    }

    render() {
        const {newMode} = this.state;
        const {userInfo} = this.props;
        const {authenticated} = this.props.userInfo;
        if (!authenticated.isAtLeastFacAdmin) return <Redirect to='/protected'/>;

        const {departments, faculties, organisations} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = departments;

        return (
            <div className="row p-3">
                <div className="col-12">
                    {
                        (error || errorUpdate) &&
                        <Error message="Operation failed!" close={() => this.props.clearAllDepFailures()}/>
                    }
                    {
                        !isLoading &&
                        <div className="text-right mb-1">
                            <button className="btn btn-sm btn-success" onClick={()=>this.setState({newMode: true})}>
                                <FaPlus/>&nbsp;New
                            </button>
                            <button className="btn btn-sm btn-info ml-2"
                                    onClick={() => this.loadDepartmentsBasedOnRole()}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    }
                    {
                        departments.content &&
                        <div className="pb-5">
                            <LoadingOverlay
                                active={isUpdating ? true : false}
                                spinner
                                text='Performing API call...'>
                                <DepTable
                                    userInfo = {userInfo}
                                    departments={departments.content}
                                    organisations={organisations}
                                    faculties={faculties}
                                    deleteDep={this.props.deleteDep}
                                    onTableChange={this.handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    }
                    <Overlay show={isLoading ? true : false}/>
                    {
                        newMode &&
                        <DepEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                    }
                </div>
            </div>
        );
    }
}

Departments.propTypes = {
    userInfo: PropTypes.object.isRequired,
    departments: PropTypes.object.isRequired,

    organisations: PropTypes.object, // Only needed for Global admin
    faculties: PropTypes.object, // Only needed for Global and Org admins

    getAllDepartmentsBunchByRatos: PropTypes.func.isRequired,
    getAllDepartmentsBunchByOrganisation: PropTypes.func.isRequired,
    getAllDepartmentsByFaculty: PropTypes.func.isRequired,
    clearAllDepFailures: PropTypes.func.isRequired,
    updateDepName: PropTypes.func.isRequired,
    deleteDep: PropTypes.func.isRequired
};

export default Departments;
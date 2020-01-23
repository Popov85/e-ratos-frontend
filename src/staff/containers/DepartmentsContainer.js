import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Departments from "../components/Departments";
import {getAllOrgForFilter} from "../selectors/organisationsSelector";
import {getAllFacForFilter} from "../selectors/facultiesSelector";
import {
    clearAllDepFailures,
    deleteDep,
    getAllDepartmentsByFaculty,
    getAllDepartmentsBunchByOrganisation,
    getAllDepartmentsBunchByRatos,
    updateDepName
} from "../actions/departmentsActions";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        departments: state.departments,
        organisations: getAllOrgForFilter(state),
        faculties: getAllFacForFilter(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDepartmentsByFaculty: () => dispatch(getAllDepartmentsByFaculty()),
        getAllDepartmentsBunchByOrganisation: () => dispatch(getAllDepartmentsBunchByOrganisation()),
        getAllDepartmentsBunchByRatos: () => dispatch(getAllDepartmentsBunchByRatos()),
        clearAllDepFailures: () => dispatch(clearAllDepFailures()),
        updateDepName: (depId, name) => dispatch(updateDepName(depId, name)),
        deleteDep: (depId) => dispatch(deleteDep(depId))
    }
}

const DepartmentsContainer = connect(mapStateToProps, mapDispatchToProps)(Departments);

export default DepartmentsContainer;
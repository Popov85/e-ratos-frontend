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
    getAllDepartmentsByOrganisation,
    getAllDepartmentsByRatos,
    updateDepName
} from "../actions/departmentsActions";
import {clearOrgIdSelected, setOrgIdSelected} from "../actions/organisationsActions";

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
        getAllDepartmentsByOrganisation: () => dispatch(getAllDepartmentsByOrganisation()),
        getAllDepartmentsByRatos: () => dispatch(getAllDepartmentsByRatos()),
        clearAllDepFailures: () => dispatch(clearAllDepFailures()),
        updateDepName: (depId, name) => dispatch(updateDepName(depId, name)),
        deleteDep: (depId) => dispatch(deleteDep(depId)),
        setOrgIdSelected: (orgId) => dispatch(setOrgIdSelected(orgId)),
        clearOrgIdSelected: () => dispatch(clearOrgIdSelected()),
    }
}

const DepartmentsContainer = connect(mapStateToProps, mapDispatchToProps)(Departments);

export default DepartmentsContainer;
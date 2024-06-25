import {connect} from "react-redux";
import Departments from "../components/Departments";
import {getAllOrgForFilter} from "../selectors/organisationsSelector";
import {getAllFacForFilter} from "../selectors/facultiesSelector";
import {
    clearAllDepFailures,
    deleteDep,
    getAllDepartmentsBunchByOrganisation,
    getAllDepartmentsBunchByRatos,
    getAllDepartmentsByFaculty,
    updateDepName
} from "../actions/departmentsActions";

const mapStateToProps = state => {
    return {
        authorization: state.auth.authorization,
        departments: state.staff.departments,
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
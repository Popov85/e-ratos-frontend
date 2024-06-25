import {connect} from "react-redux";
import Faculties from "../components/Faculties";
import {
    clearAllFacFailures,
    deleteFac,
    getAllFacultiesBunchByRatos,
    getAllFacultiesByOrganisation,
    updateFacName
} from "../actions/facultiesActions";
import {getAllOrgForFilter} from "../selectors/organisationsSelector";

const mapStateToProps = state => {
    return {
        authorization: state.auth.authorization,
        faculties: state.staff.faculties,
        organisations: getAllOrgForFilter(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllFacultiesBunchByRatos: () => dispatch(getAllFacultiesBunchByRatos()),
        getAllFacultiesByOrganisation: () => dispatch(getAllFacultiesByOrganisation()),
        clearAllFacFailures: () => dispatch(clearAllFacFailures()),
        updateFacName: (facId, name) => dispatch(updateFacName(facId, name)),
        deleteFac: (facId) => dispatch(deleteFac(facId)),
    }
}

const FacultiesContainer = connect(mapStateToProps, mapDispatchToProps)(Faculties);

export default FacultiesContainer;
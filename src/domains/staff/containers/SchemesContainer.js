import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {
    clearAllSchemesFailures,
    deleteScheme,
    getAllSchemesByDepartment,
    updateSchemeActive,
    updateSchemeLMSOnly,
    updateSchemeName
} from "../actions/schemesActions";
import Schemes from "../components/Schemes";
import {
    extractAccessesFromSchemesForTableFilter,
    extractCoursesFromSchemesForTableFilter,
    extractGradingsFromSchemesForTableFilter,
    extractModesFromSchemesForTableFilter,
    extractOptionsFromSchemesForTableFilter,
    extractSettingsFromSchemesForTableFilter,
    extractStrategiesFromSchemesForTableFilter
} from "../selectors/schemesSelector";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        authorization: state.auth.authorization,
        schemes: state.staff.schemes,
        // We extract rather then load whole data, because whole data may result in zero search results in table!
        // But it will be needed for creating new objects!
        courses: extractCoursesFromSchemesForTableFilter(state), //{ 1: "Course_#1"},
        accesses: extractAccessesFromSchemesForTableFilter(state), //{1: "dep-private", 2: "private"},
        settings: extractSettingsFromSchemesForTableFilter(state),// {1: "default"},
        modes: extractModesFromSchemesForTableFilter(state),// {1: "exam", 2: "training"},
        options: extractOptionsFromSchemesForTableFilter(state),// {1: "exam", 2: "training"},
        gradings: extractGradingsFromSchemesForTableFilter(state),// {1: "four-point", 2:"two-point", 3: "free-point"},
        strategies: extractStrategiesFromSchemesForTableFilter(state),// {1: "default", 2: "random",  3: "types&levels"}
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllSchemesByDepartment: () => dispatch(getAllSchemesByDepartment()),
        clearAllSchemesFailures: () => dispatch(clearAllSchemesFailures()),
        updateSchemeName: (schemeId, name) => dispatch(updateSchemeName(schemeId, name)),
        updateSchemeActive: (schemeId, isActive) => dispatch(updateSchemeActive(schemeId, isActive)),
        updateSchemeLMSOnly: (schemeId, isLmsOnly) => dispatch(updateSchemeLMSOnly(schemeId, isLmsOnly)),
        deleteScheme: (schemeId) => dispatch(deleteScheme(schemeId))
    }
}

const SchemesContainer = connect(mapStateToProps, mapDispatchToProps)(Schemes);

export default SchemesContainer;
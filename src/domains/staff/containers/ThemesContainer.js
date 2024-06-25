import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Themes from "../components/Themes";
import {
    clearAllThemesFailures,
    deleteTheme,
    getAllThemesByDepartment,
    getAllThemesByDepartmentId,
    updateThemeName
} from "../actions/themesActions";
import {
    extractAccessesFromThemesForTableFilter,
    extractCoursesFromThemesForTableFilter
} from "../selectors/themesSelector";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        authorization: state.auth.authorization,
        themes: state.staff.themes,
        courses: extractCoursesFromThemesForTableFilter(state),
        accesses: extractAccessesFromThemesForTableFilter(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllThemesByDepartment: ()=>dispatch(getAllThemesByDepartment()),
        getAllThemesByDepartmentId: (depId)=>dispatch(getAllThemesByDepartmentId(depId)),
        clearAllThemesFailures: ()=>dispatch(clearAllThemesFailures()),
        updateThemeName: (themeId, name)=>dispatch(updateThemeName(themeId, name)),
        deleteTheme: (themeId)=>dispatch(deleteTheme(themeId))
    }
}

const ThemesContainer = connect(mapStateToProps, mapDispatchToProps)(Themes);

export default ThemesContainer;
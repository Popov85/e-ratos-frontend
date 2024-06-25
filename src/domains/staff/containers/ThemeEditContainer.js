import {connect} from "react-redux";
import {reset} from "redux-form";
import {getAllAccessesForSelect} from "../selectors/accessSelector";
import {getAccesses} from "../actions/accessActions";
import {getThemeById} from "../selectors/themesSelector";
import {clearThemeState, saveTheme, updateTheme} from "../actions/themeEditActions";
import {getAllCoursesForSelect} from "../selectors/coursesSelector";
import {getAllCoursesByDepartmentForDropDown} from "../actions/coursesActions";
import ThemeEdit from "../components/ThemeEdit";

const mapStateToProps = (state, ownProps) => {
    const {themeId} = ownProps;
    return {
        themeEdit: state.staff.themeEdit,
        coursesForSelect: getAllCoursesForSelect(state), //nullable
        accessesForSelect: getAllAccessesForSelect(state), //nullable
        theme: themeId ? getThemeById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveTheme: (themeDTO) => dispatch(saveTheme(themeDTO)),
        updateTheme: (themeDTO) => dispatch(updateTheme(themeDTO)),
        clearThemeState: ()=>dispatch(clearThemeState()),
        getAccesses: ()=>dispatch(getAccesses()),
        getAllCoursesByDepartmentForDropDown: ()=>dispatch(getAllCoursesByDepartmentForDropDown()),
        resetForm: ()=>dispatch(reset('theme-edit')),
    }
}

const ThemeEditContainer = connect(mapStateToProps, mapDispatchToProps)(ThemeEdit);

export default ThemeEditContainer;
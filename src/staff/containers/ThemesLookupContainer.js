import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearAllThemesFailures, getAllThemesByDepartment} from "../actions/themesActions";
import {extractCoursesFromThemesForTableFilter} from "../selectors/themesSelector";
import ThemesLookup from "../components/ThemesLookup";
import {getAllQuestionsTypesAndLevelsByThemeId} from "../actions/themesSupportActions";

const mapStateToProps = (state, ownProps) => {
    const {fields} = ownProps;
    return {
        userInfo: getUserInfo(state),
        fields: fields,
        themes: state.themes,
        themesSupport: state.themesSupport,
        courses: extractCoursesFromThemesForTableFilter(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllThemesByDepartment: ()=>dispatch(getAllThemesByDepartment()),
        getAllQuestionsTypesAndLevelsByThemeId: (themeId)=>dispatch(getAllQuestionsTypesAndLevelsByThemeId(themeId)),
        clearAllThemesFailures: ()=>dispatch(clearAllThemesFailures())
    }
}

const ThemesLookupContainer = connect(mapStateToProps, mapDispatchToProps)(ThemesLookup);

export default ThemesLookupContainer;
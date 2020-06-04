import React from 'react';
import {connect} from "react-redux";
import {clearLoadingFailure, getAllQuestionsTypesAndLevelsByThemeId} from "../actions/themesSupportActions";
import {getThemeSupportById} from "../selectors/themesSupportSelector";
import SchemeThemeEdit from "../components/SchemeThemeEdit";
import {reset} from "redux-form";

const mapStateToProps = (state, ownProps) => {
    const {themeId, theme, fields, settings, index} = ownProps;
    return {
        themeId: themeId,
        theme: theme,
        fields: fields,
        index: index,
        settings:settings,
        themesSupport: state.themesSupport,
        themeSupport : getThemeSupportById(state, ownProps) // find by id in the store
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllQuestionsTypesAndLevelsByThemeId: (themeId)=>dispatch(getAllQuestionsTypesAndLevelsByThemeId(themeId)),
        clearLoadingFailure: ()=>dispatch(clearLoadingFailure()),
        resetForm: ()=>dispatch(reset('scheme-theme-edit')),
    }
}

const SchemeThemeEditContainer = connect(mapStateToProps, mapDispatchToProps)(SchemeThemeEdit);

export default SchemeThemeEditContainer;
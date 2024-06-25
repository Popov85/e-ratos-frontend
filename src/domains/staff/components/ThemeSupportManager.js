import React from 'react';
import PropTypes from 'prop-types';
import PeekThemeSupport from "./PeekThemeSupport";

const ThemeSupportManager = props => {

    const {themeId, action, themeSupport, themesSupport} = props;
    if (action === 'peek') {
        return <PeekThemeSupport
            themeId={themeId}
            themesSupport = {themesSupport}
            themeSupport={themeSupport}
            clearLoadingFailure = {props.clearLoadingFailure}
            getAllQuestionsTypesAndLevelsByThemeId = {props.getAllQuestionsTypesAndLevelsByThemeId}
        />;
    } else {
        return "New";
    }
}

ThemeSupportManager.propTypes = {
    themeId: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    themesSupport: PropTypes.object.isRequired,
    themeSupport: PropTypes.object,
    clearLoadingFailure: PropTypes.func.isRequired,
    getAllQuestionsTypesAndLevelsByThemeId: PropTypes.func.isRequired
};

export default ThemeSupportManager;
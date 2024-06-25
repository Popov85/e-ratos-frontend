import {connect} from "react-redux";
import {clearLoadingFailure, getAllQuestionsTypesAndLevelsByThemeId} from "../actions/themesSupportActions";
import {getThemeSupportById} from "../selectors/themesSupportSelector";
import ThemeSupportManager from "../components/ThemeSupportManager";

const mapStateToProps = (state, ownProps) => {
    const {themeId, action} = ownProps;
    return {
        themeId: themeId,
        action: action,
        themesSupport: state.staff.themesSupport,
        themeSupport: themeId ? getThemeSupportById(state, ownProps) : null // find by id in the store
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllQuestionsTypesAndLevelsByThemeId: (themeId) => dispatch(getAllQuestionsTypesAndLevelsByThemeId(themeId)),
        clearLoadingFailure: () => dispatch(clearLoadingFailure())
    }
}

const ThemesSupportContainer = connect(mapStateToProps, mapDispatchToProps)(ThemeSupportManager);

export default ThemesSupportContainer;
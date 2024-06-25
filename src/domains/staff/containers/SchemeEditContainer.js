import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getSchemeById} from "../selectors/schemesSelector";
import {
    clearSchemeFailures,
    getAllSchemeComponentsForCreate,
    getOneSchemeByIdForEdit,
    saveScheme,
    updateScheme
} from "../actions/schemeEditActions";
import SchemeEdit from "../components/SchemeEdit";
import {getAllAccessesForSelectWithoutDummy} from "../selectors/accessSelector";
import {getAllCoursesForSelect} from "../selectors/coursesSelector";
import {getAllStrategiesForSelect} from "../selectors/strategySelector";
import {getAllSettingsForSelect} from "../selectors/settingsSelector";
import {getAllModesForSelect} from "../selectors/modesSelector";
import {getAllOptionsForSelect} from "../selectors/optionsSelector";
import {getAllGradingsForSelectWithoutDummy} from "../selectors/gradingSelector";
import {getAllGradingsTwoPointForSelect} from "../selectors/gradingTwoPointSelector";
import {getAllGradingsFourPointForSelect} from "../selectors/gradingFourPointSelector";
import {getAllGradingsFreePointForSelect} from "../selectors/gradingFreePointSelector";


const mapStateToProps = (state, ownProps) => {
    const {schemeId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        schemeEdit: state.staff.schemeEdit,
        //Load all needed select-s
        accessesForSelect: getAllAccessesForSelectWithoutDummy(state), //nullable
        coursesForSelect: getAllCoursesForSelect(state), //nullable
        strategiesForSelect: getAllStrategiesForSelect(state), //nullable

        gradingsForSelect: getAllGradingsForSelectWithoutDummy(state), //nullable
        gradings: state.staff.gradings.contentMin,

        modesForSelect: getAllModesForSelect(state), // nullable
        modes: state.staff.modes.content,
        settingsForSelect: getAllSettingsForSelect(state), //nullable
        settings: state.staff.settings.content,
        optionsForSelect: getAllOptionsForSelect(state), //nullable
        options: state.staff.options.content,

        // add grading details of all types
        gradingsTwoPointForSelect: getAllGradingsTwoPointForSelect(state),
        gradingsTwoPoint: state.staff.gradingsTwoPoint.content,
        gradingsFourPointForSelect: getAllGradingsFourPointForSelect(state),
        gradingsFourPoint: state.staff.gradingsFourPoint.content,
        gradingsFreePointForSelect: getAllGradingsFreePointForSelect(state),
        gradingsFreePoint: state.staff.gradingsFreePoint.content,

        scheme: schemeId ? getSchemeById(state, ownProps) : null, //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveScheme: (schemeDTO) => dispatch(saveScheme(schemeDTO)),
        updateScheme: (schemeDTO) => dispatch(updateScheme(schemeDTO)),
        clearSchemeState: () => dispatch(clearSchemeFailures()),
        getAllSchemeComponentsForCreate: () => dispatch(getAllSchemeComponentsForCreate()),
        getOneSchemeByIdForEdit: (schemeId) => dispatch(getOneSchemeByIdForEdit(schemeId)),
        resetForm: () => dispatch(reset('scheme-edit')),
    }
}

const SchemeEditContainer = connect(mapStateToProps, mapDispatchToProps)(SchemeEdit);

export default SchemeEditContainer;
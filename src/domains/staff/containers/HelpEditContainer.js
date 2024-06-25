import {connect} from "react-redux";
import {reset} from "redux-form";
import HelpEdit from "../components/HelpEdit";
import {clearHelpState, saveHelp, updateHelp} from "../actions/helpEditActions";
import {getHelpById} from "../selectors/helpsSelector";

const mapStateToProps = (state, ownProps) => {
    const {helpId} = ownProps;
    return {
        authorization: state.auth.authorization,
        helpEdit: state.staff.helpEdit,
        help: helpId ? getHelpById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveHelp: (helpDTO) => dispatch(saveHelp(helpDTO)),
        updateHelp: (helpDTO) => dispatch(updateHelp(helpDTO)),
        clearHelpState: () => dispatch(clearHelpState()),
        resetForm: () => dispatch(reset('help-edit')),
    }
}

const HelpEditContainer = connect(mapStateToProps, mapDispatchToProps)(HelpEdit);

export default HelpEditContainer;
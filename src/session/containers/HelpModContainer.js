import {connect} from "react-redux";
import HelpMod from "../components/HelpMod";
import {hideHelp} from "../actions/sessionActions";
import {getHelp} from "../selectors/sessionSelector";

const mapStateToProps = state => {
    return {
        show: state.session.help,
        content: getHelp(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideHelp: ()=>dispatch(hideHelp()),
    }
}

const HelpModContainer = connect(mapStateToProps, mapDispatchToProps)(HelpMod);

export default HelpModContainer;
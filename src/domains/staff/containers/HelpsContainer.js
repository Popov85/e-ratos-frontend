import {connect} from "react-redux";
import {
    clearAllHelpsFailures,
    deleteHelp,
    getAllHelpsByDepartment,
    updateHelpName,
    updateHelpText
} from "../actions/helpsActions";
import Helps from "../components/Helps";

const mapStateToProps = state => {
    return {
        authorization: state.auth.authorization,
        helps: state.staff.helps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllHelpsByDepartment: () => dispatch(getAllHelpsByDepartment()),
        clearAllHelpsFailures: () => dispatch(clearAllHelpsFailures()),
        updateHelpName: (helpId, name) => dispatch(updateHelpName(helpId, name)),
        updateHelpText: (helpId, help) => dispatch(updateHelpText(helpId, help)),
        deleteHelp: (helpId) => dispatch(deleteHelp(helpId))
    }
}

const HelpsContainer = connect(mapStateToProps, mapDispatchToProps)(Helps);

export default HelpsContainer;
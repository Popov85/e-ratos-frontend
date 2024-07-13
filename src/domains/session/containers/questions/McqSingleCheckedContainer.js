import {connect} from "react-redux";
import {getResponseChecked} from "../../selectors/sessionSelector";
import McqSingleCheckedComponent from "../../components/questions/McqSingleCheckedComponent";

const mapStateToProps = state => {
    return {
        checkedResponse: getResponseChecked(state),
        fontSize: state.session.session.fontSize,
    }
}

const McqSingleCheckedContainer = connect(mapStateToProps)(McqSingleCheckedComponent);

export default McqSingleCheckedContainer;
import {connect} from "react-redux";
import {getResponseChecked} from "../../selectors/sessionSelector";
import McqMultiCheckedComponent from "../../components/questions/McqMultiCheckedComponent";

const mapStateToProps = state => {
    return {
        checkedResponse: getResponseChecked(state)
    }
}

const McqMultiCheckedContainer = connect(mapStateToProps)(McqMultiCheckedComponent);

export default McqMultiCheckedContainer;
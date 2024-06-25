import {connect} from "react-redux";
import {getResponseChecked} from "../../selectors/sessionSelector";
import McqSingleCheckedComponent from "../../components/questions/McqSingleCheckedComponent";

const mapStateToProps = state => {
    return {
        checkedResponse: getResponseChecked(state)
    }
}

const McqSingleCheckedContainer = connect(mapStateToProps)(McqSingleCheckedComponent);

export default McqSingleCheckedContainer;
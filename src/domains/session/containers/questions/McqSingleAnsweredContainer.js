import {connect} from "react-redux";
import {getResponseChecked} from "../../selectors/sessionSelector";
import McqSingleAnsweredComponent from "../../components/questions/McqSingleAnsweredComponent";

const mapStateToProps = state => {
    return {
        checkedResponse: getResponseChecked(state)
    }
}

const McqSingleAnsweredContainer = connect(mapStateToProps)(McqSingleAnsweredComponent);

export default McqSingleAnsweredContainer;
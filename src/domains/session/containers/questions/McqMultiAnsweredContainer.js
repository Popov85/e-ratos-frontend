import {connect} from "react-redux";
import {getResponseChecked} from "../../selectors/sessionSelector";
import McqMultiAnsweredComponent from "../../components/questions/McqMultiAnsweredComponent";

const mapStateToProps = state => {
    return {
        checkedResponse: getResponseChecked(state)
    }
}

const McqMultiAnsweredContainer = connect(mapStateToProps)(McqMultiAnsweredComponent);

export default McqMultiAnsweredContainer;
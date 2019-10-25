import {connect} from "react-redux";
import SessionInfo from "../components/SessionInfo";

const mapStateToProps = state => {
    return {
        batch: state.session.batch
    }
}

const SessionInfoContainer = connect(mapStateToProps)(SessionInfo);

export default SessionInfoContainer;
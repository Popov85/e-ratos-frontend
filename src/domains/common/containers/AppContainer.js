import {connect} from "react-redux";
import {checkLogged} from "../actions/authActions";
import App from "../components/App";

const mapStateToProps = (state) => ({
    logged: state.auth.logged,
    checkLogging: state.auth.checkLogging,
    userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
    checkLogged: () => dispatch(checkLogged()),
});

export default connect(mapStateToProps, mapDispatchToProps) (App);
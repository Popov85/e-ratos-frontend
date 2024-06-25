import {connect} from "react-redux";
import {clearLoadingFailure} from "../actions/affiliationSelectorCacheableActions";
import Structure from "../components/Structure";

const mapStateToProps = state => {
    return {
        authorization: state.auth.authorization
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearLoadingFailure: ()=>dispatch(clearLoadingFailure()),
    }
}

const StructureContainer = connect(mapStateToProps, mapDispatchToProps)(Structure);

export default StructureContainer;
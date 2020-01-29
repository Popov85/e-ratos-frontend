import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Lms from "../components/Lms";
import {
    clearAllLMSFailures,
    deleteLMS,
    getAllLMSByOrganisation,
    getAllLMSByOrganisationId,
    updateLMSName
} from "../actions/lmsActions";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        lms: state.lms,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllLMSByOrganisation: ()=>dispatch(getAllLMSByOrganisation()),
        getAllLMSByOrganisationId: (orgId)=>dispatch(getAllLMSByOrganisationId(orgId)),
        clearAllLMSFailures: ()=>dispatch(clearAllLMSFailures()),
        updateLMSName: (lmsId, name)=>dispatch(updateLMSName(lmsId, name)),
        deleteLMS: (lmsId)=>dispatch(deleteLMS(lmsId))
    }
}

const LmsContainer = connect(mapStateToProps, mapDispatchToProps)(Lms);

export default LmsContainer;
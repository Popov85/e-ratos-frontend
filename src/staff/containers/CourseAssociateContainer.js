import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getCourseById} from "../selectors/coursesSelector";
import {clearCourseState} from "../actions/courseEditActions";
import {getAllLMSesMin, getLMSesForSelect} from "../selectors/lmsSelector";
import {getLMSesByOrganisationForDropDown} from "../actions/lmsActions";
import CourseAssociate from "../components/CourseAssociate";
import {associateCourseWithLMS} from "../actions/courseEditActions";

const mapStateToProps = (state, ownProps) => {
    const {courseId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        courseEdit: state.courseEdit,
        lmses: getAllLMSesMin(state), //nullable
        lmsesForSelect: getLMSesForSelect(state), //nullable
        course: courseId ? getCourseById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        associateCourseWithLMS: (courseId, lms) => dispatch(associateCourseWithLMS(courseId, lms)),
        clearCourseState: ()=>dispatch(clearCourseState()),
        getLMSes: ()=>dispatch(getLMSesByOrganisationForDropDown()),
        resetForm: ()=>dispatch(reset('course-associate')),
    }
}

const CourseAssociateContainer = connect(mapStateToProps, mapDispatchToProps)(CourseAssociate);

export default CourseAssociateContainer;
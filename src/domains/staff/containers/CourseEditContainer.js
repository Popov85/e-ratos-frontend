import {connect} from "react-redux";
import {reset} from "redux-form";
import CourseEdit from "../components/CourseEdit";
import {getCourseById} from "../selectors/coursesSelector";
import {clearCourseState, saveCourse, saveLMSCourse, updateCourse, updateLMSCourse} from "../actions/courseEditActions";
import {getLMSesForSelect} from "../selectors/lmsSelector";
import {getAllAccessesForSelect} from "../selectors/accessSelector";
import {getAccesses} from "../actions/accessActions";
import {getLMSesByOrganisationForDropDown} from "../actions/lmsActions";

const mapStateToProps = (state, ownProps) => {
    const {courseId} = ownProps;
    return {
        courseEdit: state.staff.courseEdit,
        accessesForSelect: getAllAccessesForSelect(state), //nullable
        lmsesForSelect: getLMSesForSelect(state), //nullable
        course: courseId ? getCourseById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveCourse: (courseDTO) => dispatch(saveCourse(courseDTO)),
        saveLMSCourse: (lmsCourseDTO) => dispatch(saveLMSCourse(lmsCourseDTO)),
        updateCourse: (courseDTO) => dispatch(updateCourse(courseDTO)),
        updateLMSCourse: (lmsCourseDTO) => dispatch(updateLMSCourse(lmsCourseDTO)),
        clearCourseState: ()=>dispatch(clearCourseState()),
        getAccesses: ()=>dispatch(getAccesses()),
        getLMSes: ()=>dispatch(getLMSesByOrganisationForDropDown()),
        resetForm: ()=>dispatch(reset('course-edit')),
    }
}

const CourseEditContainer = connect(mapStateToProps, mapDispatchToProps)(CourseEdit);

export default CourseEditContainer;
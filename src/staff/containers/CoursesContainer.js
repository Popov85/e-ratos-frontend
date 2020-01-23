import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Courses from "../components/Courses";
import {
    associateCourseWithLMS,
    clearAllCoursesFailures,
    deleteCourse, disassociateCourseWithLMS,
    getAllCoursesByDepartment,
    getAllCoursesByDepartmentId,
    updateCourseName
} from "../actions/coursesActions";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        courses: state.courses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCoursesByDepartment: ()=>dispatch(getAllCoursesByDepartment()),
        getAllCoursesByDepartmentId: (depId)=>dispatch(getAllCoursesByDepartmentId(depId)),
        clearAllCoursesFailures: ()=>dispatch(clearAllCoursesFailures()),
        updateCourseName: (courseId, name)=>dispatch(updateCourseName(courseId, name)),
        associateCourseWithLMS: (courseId, lms)=>dispatch(associateCourseWithLMS(courseId, lms)),
        disassociateCourseWithLMS: (courseId)=>dispatch(disassociateCourseWithLMS(courseId)),
        deleteCourse: (courseId)=>dispatch(deleteCourse(courseId))
    }
}

const CoursesContainer = connect(mapStateToProps, mapDispatchToProps)(Courses);

export default CoursesContainer;
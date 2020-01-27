import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Courses from "../components/Courses";
import {
    clearAllCoursesFailures,
    deleteCourse,
    disassociateCourseWithLMS,
    getAllCoursesByDepartment,
    getAllCoursesByDepartmentId,
    updateCourseName
} from "../actions/coursesActions";
import {extractAccessesFromCoursesForTableFilter} from "../selectors/coursesSelector";
import {associateCourseWithLMS} from "../actions/courseEditActions";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        courses: state.courses,
        accesses: extractAccessesFromCoursesForTableFilter(state),
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
import {coursesAPI} from "../_api/coursesAPI";

const SET_COURSES_FOR_DROPDOWN = "SET_COURSES_FOR_DROPDOWN";
export const setCoursesForDropDown = (courses) => ({type: SET_COURSES_FOR_DROPDOWN, payload: courses});

export const getAllCoursesForDropDownByDepId = () => {
    return (dispatch) => {
        coursesAPI.fetchAllForDropDownByDepartmentId().then(result => {
            let courses = result.data;
            dispatch(setCoursesForDropDown(courses));
        }).catch(e => {
            console.log("Error fetching courses for drop down!", e);
        });
    }
}
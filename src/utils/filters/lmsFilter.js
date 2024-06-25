export const lmsFilter = {

    getLMSFiltered (filterVal, data) {
        if (filterVal) {
            if (filterVal === 'non-LMS') {
                return data.filter(item => item.lms === null);
            } else {
                return data.filter(item => item.lms !== null);
            }
        }
        return data;
    },

    getLMSFromCourseFiltered (filterVal, data) {
        if (filterVal) {
            if (filterVal === 'non-LMS') {
                return data.filter(item => item.course.lms === null);
            } else {
                return data.filter(item => item.course.lms !== null);
            }
        }
        return data;
    },

}
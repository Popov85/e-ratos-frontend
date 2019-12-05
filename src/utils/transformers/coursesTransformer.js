export const coursesTransformer = {

    toObject(courses) {
        return courses.reduce((map, course) => {
            map[course.courseId] = course.name;
            return map;
        }, {});
    },

}
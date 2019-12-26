export const coursesTransformer = {

    toObject(courses) {
        return courses.reduce((map, course) => {
            map[course.courseId] = course.name;
            return map;
        }, {});
    },

    toSelect(courses) {
        return courses.map(c => {
            let item = {};
            item.value = c.courseId;
            item.label = c.name;
            return item;
        });
    },

}
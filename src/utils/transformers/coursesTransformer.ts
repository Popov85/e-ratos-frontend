//@ts-ignore
import {dummy} from "../constants";
import {TableObject} from "../../domains/staff/types/table/TableObject";
import {Course} from "../../domains/staff/types/Course";
import {FormSelect} from "../../domains/staff/types/form/FormSelect";
import {CourseDropDown} from "../../domains/staff/_api/coursesAPI";

export const coursesTransformer = {

    toObject(courses: Course[]): TableObject {
        return courses.reduce((map: TableObject, course: Course) => {
            map[course.courseId!] = course.name;
            return map;
        }, {});
    },

    toSelect(courses: Course[]): FormSelect[] {
        return courses.map((c: Course): FormSelect => ({
            value: c.courseId!.toString(),
            label: c.name,
        }));
    },

    toSelectWithDummy(courses: Course[] | CourseDropDown[]): FormSelect[] {
        let result: Array<FormSelect> = courses.map((c: Course | CourseDropDown): FormSelect => ({
            value: c.courseId!.toString(),
            label: c.name,
        }));
        result.unshift(dummy);
        return result;
    }
}
import {instance} from "../../common/_api/axios";
import {Course} from "../types/Course";
import {AxiosResponse} from "axios";

// TODO: consider this precise type..
export type CourseInput = Omit<Course, 'access' | 'lms'> & {
    accessId: number;
    lmsId: number;
};

export type CourseDropDown = Pick<Course, 'courseId' | 'name'>;

// TODO: consider merge both LMS and non-LMS courses API!
export const coursesAPI = {

    async saveCourse(course: Course): Promise<Course> {
        const result: AxiosResponse<Course> = await instance.post(`/instructor/courses`, course);
        return result.data;
    },

    async saveLMSCourse(lmsCourse: Course): Promise<Course> {
        const result: AxiosResponse<Course> = await instance.post(`/instructor/lms-courses`, lmsCourse);
        return result.data;
    },

    async updateCourse(course: Course): Promise<Course> {
        const result: AxiosResponse<Course> = await instance.put(`/instructor/courses`, course);
        return result.data;
    },

    async updateLMSCourse(lmsCourse: Course): Promise<Course> {
        const result: AxiosResponse<Course> = await  instance.put(`/instructor/lms-courses`, lmsCourse);
        return result.data;
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------

    async updateCourseName(courseId: number , name: string): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/instructor/courses/${courseId}/name`, {value: name});
        return result.status;
    },

    async associateCourseWithLMS(courseId: number, lmsId: number): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/instructor/courses/${courseId}/associate/${lmsId}`);
        return result.status;
    },

    async disassociateCourseWithLMS(courseId: number): Promise<number> {
        const result: AxiosResponse = await instance.patch(`/instructor/lms-courses/${courseId}/disassociate`);
        return result.status;
    },

    async deleteCourse(courseId: number): Promise<number> {
        const result: AxiosResponse = await instance.delete(`/instructor/courses/${courseId}`);
        return result.status;
    },


    //---------------------------------------------------For drop down--------------------------------------------------
    async fetchAllCoursesByDepartmentForDropDown(): Promise<Array<CourseDropDown>> {
        const result: AxiosResponse<Array<CourseDropDown>> = await instance.get('/department/courses-dropdown/all-courses-by-department');
        return result.data;
    },

    async fetchAllCoursesByDepartmentIdForDropDown(depId: number): Promise<Array<CourseDropDown>>  {
        const result: AxiosResponse<Array<CourseDropDown>> = await instance.get(`/fac-admin/courses-dropdown/all-courses-by-department?depId=${depId}`);
        return result.data;
    },

    //-----------------------------------------------------For table----------------------------------------------------
    async fetchAllCoursesByDepartmentForTable(): Promise<Array<Course>> {
        const result: AxiosResponse<Array<Course>> = await instance.get('/department/courses-table/all-courses-by-department');
        return result.data;
    },

    async fetchAllCoursesByDepartmentIdForTable(depId: number): Promise<Array<Course>> {
        const result: AxiosResponse<Array<Course>> = await instance.get(`/fac-admin/courses-table/all-courses-by-department?depId=${depId}`);
        return result.data;
    }
}
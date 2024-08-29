import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {clearCourseState, saveCourse, saveLMSCourse, updateCourse, updateLMSCourse} from "../actions/courseEditActions";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {Course} from "../types/Course";
import {getCourseById} from "../selectors/coursesSelector";
import {reset} from "redux-form";
import CourseEditForm from "../forms/CourseEditForm";

type Props = {
    courseId?: number
}

const CourseEdit: React.FC<Props> = ({courseId}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const courseEdit = useSelector((state: RootState) => state.staff.courseEdit);

    const {isLoading, error, message} = courseEdit;

    const course: Course | null = courseId ? useSelector((state: RootState) => getCourseById(state, {courseId: courseId})) : null


    useEffect(() => {
        dispatch(clearCourseState());
        //dispatch(getLMSes());//TODO!
    }, []);

    const handleSubmit = (course: Course): void => {
        if (!course.courseId) { // new
            !course.lms?.lmsId ? dispatch(saveCourse(course)) : dispatch(saveLMSCourse(course));
        } else { // update
            !course.lms?.lmsId ? dispatch(updateCourse(course)) : dispatch(updateLMSCourse(course));
        }
    };

    return (
        <div>
            <div className="row mt-1">
                <div className="col-12">
                    {isLoading && (
                        <div className="text-center text-secondary m-2">
                            <span>Saving...</span>
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger text-center p-1" role="alert">
                            <span className="text-danger">
                                <strong>
                                    <Failure message={error.message}/>
                                </strong>
                            </span>
                        </div>
                    )}
                    {message && (
                        <div className="alert alert-success text-center p-1" role="success">
                            <span className="text-success">
                                <strong>{message}</strong>
                            </span>
                        </div>
                    )}
                    <div className="card bg-transparent">
                        <div className="card-body">
                            <CourseEditForm
                                initialValues={
                                    course ? {
                                        courseId: course.courseId,
                                        name: course.name,
                                        accessId: course.access!.accessId,
                                        lmsId: course.lms ? course.lms.lmsId : undefined,
                                    } : undefined
                                }
                                finished={!!message}
                                disabled={isLoading}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                            <a href="#" className="badge badge-secondary"
                               onClick={() => dispatch(reset('course-edit'))}>
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseEdit;

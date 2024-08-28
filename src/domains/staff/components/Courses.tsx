import React, {useEffect, useState} from 'react';
import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
//@ts-ignore
import CourseEditModal from "./CourseEditModal";
import {getUserInfo} from "../../common/selectors/userSelector";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {clearAllCoursesFailures, getAllCoursesByDepartment, updateCourseName} from "../actions/coursesActions";
import {getAllAccessesForTable} from "../selectors/accessSelector";
import {TableObject} from "../types/table/TableObject";
import CoursesTable from "./CoursesTable";


const Courses: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const courses = useSelector((state: RootState) => state.staff.courses);

    const accesses: TableObject = useSelector((state: RootState) => getAllAccessesForTable(state));

    const [newMode, setNewMode] = useState<boolean>(false);

    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        loadCoursesBasedOnRole();
    }, []);

    const loadCoursesBasedOnRole = (): void => {
        dispatch(getAllCoursesByDepartment());
    };

    const deactivateModal = (): void => {
        setNewMode(false);
    };

    const expandedSwitch = (): void => {
        setExpanded(!expanded);
    };

    const handleUpdate = (courseId: number, dataField: string, newValue: string): void => {
        if (dataField === "name") {
            dispatch(updateCourseName(courseId, newValue));
        }
    };

    const handleTableChange = (type: string, {cellEdit}: any): void => {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            handleUpdate(rowId, dataField, newValue);
        }
    };

    const {isLoading, isUpdating, error, errorUpdate} = courses;

    return (
        <div className="container-fluid p-0">
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>Courses management</strong>
                    </h5>
                </div>
                {(error || errorUpdate) && (
                    <Error message="Operation failed!" close={() => dispatch(clearAllCoursesFailures())}/>
                )}
                {!isLoading && (
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {courses.content && courses.content.length > 0 && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    title="Expand/compress"
                                    onClick={expandedSwitch}
                                >
                                    {expanded ? <FaCompress/> : <FaExpand/>}
                                </button>
                            )}
                        </div>

                        <div>
                            {authorization.isAtLeastInstructor && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-success"
                                    onClick={() => setNewMode(true)}
                                >
                                    <FaPlus/>
                                    &nbsp;New
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn btn-sm btn-info ml-2"
                                onClick={loadCoursesBasedOnRole}
                            >
                                <FaSync/>
                                &nbsp;Refresh
                            </button>
                        </div>
                    </div>
                )}
                {courses.content && (
                    <div className="pb-5">
                        <LoadingOverlay
                            active={!!isUpdating}
                            spinner
                            text="Performing API call..."
                        >
                            <CoursesTable
                                userInfo={userInfo}
                                authorization={authorization}
                                courses={courses.content}
                                accesses={accesses}
                                expanded={expanded}
                                onTableChange={handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                )}
                <Overlay show={!!isLoading}/>
                {newMode && (
                    <CourseEditModal show={newMode} deactivateModal={deactivateModal}/>
                )}
            </div>
        </div>
    );
};

export default Courses;
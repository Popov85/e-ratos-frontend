import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaExpand, FaCompress, FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/Error";
import Overlay from "../../common/Overlay";
import CoursesTable from "./CoursesTable";
import CourseEditModal from "./CourseEditModal";

class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false,
            expanded: false
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.expandedSwitch = this.expandedSwitch.bind(this);

    }

    componentDidMount() {
        const {courses} = this.props;
        if (!courses.content) this.loadCoursesBasedOnRole();
    }

    loadCoursesBasedOnRole() {
        // If there is some depId selected by AffiliationSelector,
        // the the current role is at least fac admin, load this different department courses
        this.props.getAllCoursesByDepartment();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    handleUpdate(courseId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateCourseName(courseId, newValue);
                return;
            }
            default:
                return;
        }
    }

    handleTableChange(type, {cellEdit}) {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            this.handleUpdate(rowId, dataField, newValue);
        }
    }

    render() {
        const {newMode, expanded} = this.state;
        const {userInfo} = this.props;
        const {courses} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = courses;

        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>Courses management</strong>
                    </h5>
                </div>
                {
                    (error || errorUpdate) &&
                    <Error message="Operation failed!" close={() => this.props.clearAllCoursesFailures()}/>
                }
                {
                    !isLoading &&
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {
                                courses.content &&
                                <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                                        onClick={() => this.expandedSwitch()}>
                                    {expanded ? <FaCompress/> : <FaExpand/>}
                                </button>
                            }
                        </div>

                        <div>
                            <button type="button" className="btn btn-sm btn-success"
                                    onClick={() => this.setState({newMode: true})}>
                                <FaPlus/>&nbsp;New
                            </button>
                            <button type="button" className="btn btn-sm btn-info ml-2"
                                    onClick={() => this.loadCoursesBasedOnRole()}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    </div>
                }
                {
                    courses.content &&
                    <div className="pb-5">
                        <LoadingOverlay
                            active={isUpdating ? true : false}
                            spinner
                            text='Performing API call...'>
                            <CoursesTable
                                userInfo={userInfo}
                                courses={courses.content}
                                deleteCourse={this.props.deleteCourse}
                                associateCourseWithLMS={this.props.associateCourseWithLMS}
                                disassociateCourseWithLMS={this.props.disassociateCourseWithLMS}
                                expanded={expanded}
                                onTableChange={this.handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                }
                <Overlay show={isLoading ? true : false}/>
                {
                    newMode &&
                    <CourseEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                }
            </div>
        );
    }
}

Courses.propTypes = {
    userInfo: PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,

    getAllCoursesByDepartment: PropTypes.func.isRequired,
    getAllCoursesByDepartmentId: PropTypes.func.isRequired,
    clearAllCoursesFailures: PropTypes.func.isRequired,
    updateCourseName: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    associateCourseWithLMS: PropTypes.func.isRequired,
    disassociateCourseWithLMS: PropTypes.func.isRequired,
};

export default Courses;
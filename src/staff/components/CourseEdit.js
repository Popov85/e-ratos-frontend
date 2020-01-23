import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/Failure";
import ProtectedResource from "../../common/ProtectedResource";
import CourseEditForm from "../forms/CourseEditForm";

class CourseEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearCourseState();
        const {accessesForSelect, lmsesForSelect} = this.props;
        if (!accessesForSelect || accessesForSelect.length===1) this.props.getAccesses();
        if (!lmsesForSelect || lmsesForSelect.length===1) this.props.getLMSes();
    }

    handleSubmit(data) {
        //console.log("courseDTO = ", data);
        if (!data.courseId) {//new
            !data.lmsId ?
                this.props.saveCourse(data)
                : this.props.saveLMSCourse(data)
        } else {//update
            !data.lmsId ?
                this.props.updateCourse(data)
                : this.props.updateLMSCourse(data)
        }
    }

    render() {
        const {course} = this.props;
        const {userInfo, accessesForSelect, lmsesForSelect} = this.props;
        const {authenticated} = this.props.userInfo;
        if (!authenticated.isAtLeastInstructor) return <ProtectedResource/>

        const {isLoading, error, message} = this.props.courseEdit;

        return (
            <div>
                <div className="row mt-1">
                    <div className="col-12">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            error &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            message &&
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success"><strong>{message}</strong></span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="card-body">
                                <CourseEditForm
                                    initialValues={course ?
                                        {
                                            courseId: course.courseId,
                                            name: course.name,
                                            accessId: course.access.accessId,
                                            lmsId: course.lms ? course.lms.lmsId : null,
                                            created: course.created,
                                            active: course.active
                                        }
                                        : null
                                    }
                                    userInfo={userInfo}
                                    lmses={lmsesForSelect}
                                    accesses={accessesForSelect}
                                    finished={message ? true : false}
                                    disabled={isLoading}
                                    onSubmit={data => this.handleSubmit(data)}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden={message ? true : false}>
                                <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CourseEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    courseEdit: PropTypes.object.isRequired,
    course: PropTypes.object, // Nullable for new objects
    accessesForSelect: PropTypes.array, // Array adopted for select
    lmsesForSelect: PropTypes.array, // Array adopted for select

    clearCourseState: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    saveLMSCourse: PropTypes.func.isRequired,
    updateCourse: PropTypes.func.isRequired,
    updateLMSCourse: PropTypes.func.isRequired,
    getAccesses:PropTypes.func.isRequired,
    getLMSes:PropTypes.func.isRequired

};

export default CourseEdit;

import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/Failure";
import ProtectedResource from "../../common/ProtectedResource";
import CourseAssociateForm from "../forms/CourseAssociateForm";

class CourseAssociate extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearCourseState();
        const {lmses} = this.props;
        if (!lmses) this.props.getLMSes();
    }

    handleSubmit(data) {
        const {courseId, lmsId} = data;
        const {lmses} = this.props;
        let lms = lmses
            .find(l => l.lmsId === Number(lmsId));
        let dto = {courseId, lms };
        console.log("dto = ", dto);
        this.props.associateCourseWithLMS(courseId, lms);
    }

    render() {
        const {course, userInfo, lmsesForSelect} = this.props;
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
                                <CourseAssociateForm
                                    initialValues={
                                        {
                                            courseId: course.courseId
                                        }
                                    }
                                    userInfo={userInfo}
                                    name = {course.name}
                                    lmses={lmsesForSelect}
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

CourseAssociate.propTypes = {
    userInfo: PropTypes.object.isRequired,
    courseEdit: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    lmses: PropTypes.array, // Initial array
    lmsesForSelect: PropTypes.array, // Array adopted for select

    associateCourseWithLMS: PropTypes.func.isRequired,
    clearCourseState: PropTypes.func.isRequired,
    getLMSes:PropTypes.func.isRequired

};

export default CourseAssociate;

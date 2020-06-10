import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import ThemeEditForm from "../forms/ThemeEditForm";

class ThemeEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearThemeState();
        const {accessesForSelect, coursesForSelect} = this.props;
        if (!accessesForSelect || accessesForSelect.length===1) this.props.getAccesses();
        if (!coursesForSelect || coursesForSelect.length===1) this.props.getAllCoursesByDepartmentForDropDown();
    }

    handleSubmit(data) {
        !data.themeId ?
            this.props.saveTheme(data)
            : this.props.updateTheme(data)
    }

    render() {
        const {theme} = this.props;
        const {userInfo, accessesForSelect, coursesForSelect} = this.props;
        const {isLoading, error, message} = this.props.themeEdit;

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
                                <ThemeEditForm
                                    initialValues={theme ?
                                        {
                                            themeId: theme.themeId,
                                            name: theme.name,
                                            accessId: theme.access.accessId,
                                            courseId: theme.course.courseId
                                        }
                                        : null
                                    }
                                    userInfo={userInfo}
                                    courses={coursesForSelect}
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

ThemeEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    themeEdit: PropTypes.object.isRequired,
    theme: PropTypes.object, // Nullable for new objects
    coursesForSelect: PropTypes.array, // Array adopted for select
    accessesForSelect: PropTypes.array, // Array adopted for select

    clearThemeState: PropTypes.func.isRequired,
    saveTheme: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
    getAccesses:PropTypes.func.isRequired,
    getAllCoursesByDepartmentForDropDown:PropTypes.func.isRequired
};

export default ThemeEdit;

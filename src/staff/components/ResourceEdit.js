import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import ResourceEditForm from "../forms/ResourceEditForm";

class ResourceEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearResourceState();
    }

    handleSubmit(data) {
        const { iframe, ...resourceDTO } = data;
        //console.log("resourceDTO = ", resourceDTO);
        !data.resourceId ?
            this.props.saveResource(data)
            : this.props.updateResource(data)
    }

    render() {
        const {userInfo, resource} = this.props;
        const {isLoading, error, message} = this.props.resourceEdit;

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
                                <ResourceEditForm
                                    initialValues={resource ?
                                        {
                                            resourceId: resource.resourceId,
                                            link: resource.link,
                                            description: resource.description,
                                            type: resource.type,
                                            width: resource.width,
                                            height: resource.height
                                        }
                                        : null
                                    }
                                    userInfo={userInfo}
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

ResourceEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    resourceEdit: PropTypes.object.isRequired,
    resource: PropTypes.object, // Nullable for new objects

    clearResourceState: PropTypes.func.isRequired,
    saveResource: PropTypes.func.isRequired,
    updateResource: PropTypes.func.isRequired
};

export default ResourceEdit;

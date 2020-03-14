import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/Error";
import Overlay from "../../common/Overlay";
import ResourcesLookupTable from "./ResourcesLookupTable";

class ResourcesLookup extends Component {

    componentDidMount() {
        const {resources} = this.props;
        if (!resources.content) this.props.getAllResourcesByDepartment()
    }

    render() {
        const {userInfo, resources} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = resources;

        return (
            <div className="p-1">
                {
                    (error || errorUpdate) &&
                    <Error message="Operation failed!" close={() => this.props.clearAllResourcesFailures()}/>
                }
                {
                    resources.content &&
                    <div className="pb-5">
                        <LoadingOverlay
                            active={isUpdating ? true : false}
                            spinner
                            text='Performing API call...'>
                            <ResourcesLookupTable
                                userInfo={userInfo}
                                resources={resources.content}
                                selectResource={this.props.selectResource}
                            />
                        </LoadingOverlay>
                    </div>
                }
                <Overlay show={isLoading ? true : false}/>
            </div>
        );
    }
}

ResourcesLookup.propTypes = {
    userInfo: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,

    selectResource: PropTypes.func.isRequired,
    getAllResourcesByDepartment: PropTypes.func.isRequired
};

export default ResourcesLookup;
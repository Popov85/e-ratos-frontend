import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import ResourcesLookupTable from "./ResourcesLookupTable";
import HelpsLookupTable from "./HelpsLookupTable";

class HelpsLookup extends Component {

    componentDidMount() {
        const {helps} = this.props;
        if (!helps.content) this.props.getAllHelpsByDepartment();
    }

    render() {
        const {userInfo, helps} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = helps;

        return (
            <div className="p-1">
                {
                    (error || errorUpdate) &&
                    <Error message="Operation failed!" close={() => this.props.clearAllHelpsFailures()}/>
                }
                {
                    helps.content &&
                    <div className="pb-5">
                        <LoadingOverlay
                            active={isUpdating ? true : false}
                            spinner
                            text='Performing API call...'>
                            <HelpsLookupTable
                                userInfo={userInfo}
                                helps={helps.content}
                                selectHelp={this.props.selectHelp}
                            />
                        </LoadingOverlay>
                    </div>
                }
                <Overlay show={isLoading ? true : false}/>
            </div>
        );
    }
}

HelpsLookup.propTypes = {
    userInfo: PropTypes.object.isRequired,
    helps: PropTypes.object.isRequired,

    selectHelp: PropTypes.func.isRequired,
    clearAllHelpsFailures: PropTypes.func.isRequired,
    getAllHelpsByDepartment: PropTypes.func.isRequired
};

export default HelpsLookup;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import SchemesTable from "./SchemesTable";

class Schemes extends Component {

    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.loadSchemesBasedOnRole = this.loadSchemesBasedOnRole.bind(this);
    }

    componentDidMount() {
        this.loadSchemesBasedOnRole();
    }

    loadSchemesBasedOnRole() {
        // If there is some depId selected by AffiliationSelector,
        // the current role is at least fac admin, load this different department schemes
        this.props.getAllSchemesByDepartment();
    }

    handleUpdate(schemeId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateSchemeName(schemeId, newValue);
                return;
            }
            case "active": {
                this.props.updateSchemeActive(schemeId, newValue);
                return;
            }
            case "lmsOnly": {
                this.props.updateSchemeLMSOnly(schemeId, newValue);
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
        const {
            userInfo,
            authorization,
            schemes,
            courses,
            accesses,
            settings,
            strategies,
            modes,
            gradings,
            options
        } = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = schemes;

        return (
            <div className="container-fluid p-0">
                <div className="p-1">
                    <div className="alert alert-secondary text-center mb-1">
                        <h5 className="alert-heading">
                            <strong>Schemes management</strong>
                        </h5>
                    </div>
                    {
                        (error || errorUpdate) &&
                        <Error message="Operation failed!" close={() => this.props.clearAllSchemesFailures()}/>
                    }
                    {
                        schemes.content &&
                        <div className="pb-5">
                            <LoadingOverlay
                                active={!!isUpdating}
                                spinner
                                text='Performing API call...'>
                                <SchemesTable
                                    userInfo={userInfo}
                                    authorization={authorization}
                                    schemes={schemes.content}
                                    courses={courses}
                                    accesses={accesses}
                                    settings={settings}
                                    strategies={strategies}
                                    options={options}
                                    gradings={gradings}
                                    modes={modes}
                                    isLoading={isLoading}
                                    updateSchemeName={this.props.updateSchemeName}
                                    updateSchemeActive={this.props.updateSchemeActive}
                                    updateSchemeLMSOnly={this.props.updateSchemeLMSOnly}
                                    deleteScheme={this.props.deleteScheme}
                                    handleRefresh={this.loadSchemesBasedOnRole}
                                    onTableChange={this.handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    }
                    <Overlay show={!!isLoading}/>
                </div>
            </div>
        );
    }
}

Schemes.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    schemes: PropTypes.object.isRequired,
    courses: PropTypes.object,
    accesses: PropTypes.object,
    settings: PropTypes.object,
    strategies: PropTypes.object,
    options: PropTypes.object,
    modes: PropTypes.object,
    gradings: PropTypes.object,

    getAllSchemesByDepartment: PropTypes.func.isRequired,
    clearAllSchemesFailures: PropTypes.func.isRequired,
    updateSchemeName: PropTypes.func.isRequired,
    updateSchemeActive: PropTypes.func.isRequired,
    updateSchemeLMSOnly: PropTypes.func.isRequired,
    deleteScheme: PropTypes.func.isRequired
};

export default Schemes;
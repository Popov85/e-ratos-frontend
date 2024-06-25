import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Overlay from "../../common/components/Overlay";
import LoadingOverlay from "react-loading-overlay";
import Error from "../../common/components/Error";
import ResultsTable from "./ResultsTable";
import Admin from "./Admin";
import Switcher from "./Switcher";

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changeDepartmentMode: false,
        }
        this.activateModal = this.activateModal.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.afterAffiliationSelected = this.afterAffiliationSelected.bind(this);
        this.afterOwnDepartmentSelected = this.afterOwnDepartmentSelected.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        const {affiliation, results} = this.props;
        // Do anything only if there is nothing to display!
        // Otherwise you could always update the needed results!
        if (!affiliation) {
            this.props.getAllDepResultsDataForTable();
        } else {
            if (!affiliation.org) {
                this.props.getAllDepResultsDataForTableAdmin(affiliation);
            } else {
                this.props.getAllDepResultsDataForTableGlobalAdmin(affiliation);
            }
        }
    }

    activateModal() {
        this.setState({changeDepartmentMode: true});
    }

    deactivateModal() {
        this.setState({changeDepartmentMode: false});
    }

    /**
     * Describe what to do after an admin switched departments
     * @param affiliation
     */
    afterAffiliationSelected(affiliation) {
        if (!affiliation.org) {
            this.props.getAllDepResultsDataForTableAdmin(affiliation);
        } else {
            this.props.getAllDepResultsDataForTableGlobalAdmin(affiliation);
        }
        this.deactivateModal();
    }

    /**
     * Describe what to do when an admin switched back to own department
     */
    afterOwnDepartmentSelected() {
        this.props.getAllDepResultsDataForTable();
        this.deactivateModal();
    }

    /**
     * Some columns must be sorted not by Id, but by a name, tweaking is needed!
     * @param sortFiled
     * @returns {string|*}
     */
    adjustSort(sortFiled) {
        const adjustableFields = ["scheme", "scheme.course", "student.faculty"];
        if (adjustableFields.includes(sortFiled)) return `${sortFiled}.name`;
        return sortFiled;
    }

    /**
     * Special case: when course filter changes, schemes filter must be changed as well!
     * ALWAYS, when course filter is emptied - set default all schemes from store!
     * @param filterMap map of filter values
     */
    courseFilter(filterMap) {
        let courseFilter = filterMap.get("scheme.course");
        if (!courseFilter) {
            this.props.setExistingDepResultsFilterSchemes('All');
            return;
        }
        const {schemesMap} = this.props.results;
        let courseId = Number(courseFilter.filterVal);
        if (schemesMap.has(courseId)) {
            this.props.setExistingDepResultsFilterSchemes(courseId);
        } else {
            this.props.getAllSchemesForDepResultsTableFilterByCourseId(courseId);
        }
    }

    handleTableChangeDefault(filters, filterMap, params) {
        if (filterMap.size === 0) {
            this.props.getDepResults(params);
            // Activate all the original schemes
            this.props.setExistingDepResultsFilterSchemes('All');
        } else {
            this.courseFilter(filterMap);
            this.props.getDepResultsWithSpecs(params, filters);
        }
    }

    handleTableChangeAdmin(filters, filterMap, params) {
        const {affiliation} = this.props;
        const {dep} = affiliation;
        if (filterMap.size === 0) {
            this.props.getDepResultsAdmin(dep.value, params);
            // Activate all the original schemes
            this.props.setExistingDepResultsFilterSchemes('All');
        } else {
            this.courseFilter(filterMap);
            this.props.getDepResultsWithSpecAdmin(dep.value, params, filters);
        }
    }


    handleTableChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
        const {affiliation} = this.props;
        let params = `page=${page}&size=${sizePerPage}${sortField ? '&sort=' +
            this.adjustSort(sortField) + ',' + sortOrder : ''}`;
        let filterMap = new Map(Object.entries(filters));
        // N.B. We keep this dummy filter exceptionally to trigger table update!
        if (filterMap.has("update")) filterMap.delete("update");
        if (affiliation) {
            this.handleTableChangeAdmin(filters, filterMap, params);
            return;
        }
        this.handleTableChangeDefault(filters, filterMap, params);
    }

    render() {
        const {userInfo, authorization, results, affiliation} = this.props;
        const {data, courses, schemes, faculties, isLoading, error} = results;

        const {changeDepartmentMode} = this.state;

        return (
            <div className="container-fluid p-0">
                <div className="p-1">
                    <div className="alert alert-secondary text-center mb-1">
                        <h5><strong>Department results</strong></h5>
                    </div>
                    <Overlay show={(isLoading && !data)}/>
                    {
                        userInfo && userInfo.staff
                        && authorization.isAtLeastFacAdmin
                        && <Admin affiliation={affiliation} activateModal={this.activateModal} userInfo={userInfo}/>
                    }
                    {
                        error && <Error message="Operation failed!" close={() => this.props.clearLoadingFailure()}/>
                    }
                    {
                        data && courses && schemes && faculties &&
                        <LoadingOverlay
                            active={!!isLoading}
                            spinner
                            text='Performing API call...'>
                            <ResultsTable
                                results={data.content}
                                courses={courses}
                                schemes={schemes}
                                faculties={faculties}
                                page={data.number}
                                sizePerPage={data.size}
                                totalSize={data.totalElements}
                                onTableChange={this.handleTableChange}
                            />
                        </LoadingOverlay>
                    }
                    <Switcher show={changeDepartmentMode}
                              deactivateModal={this.deactivateModal}
                              afterAffiliationSelected={this.afterAffiliationSelected}
                              afterOwnDepartmentSelected={this.afterOwnDepartmentSelected}/>
                </div>
            </div>
        );
    }
}

Results.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,
    affiliation: PropTypes.object,

    clearLoadingFailure: PropTypes.func.isRequired,

    setExistingDepResultsFilterSchemes: PropTypes.func.isRequired,

    getAllSchemesForDepResultsTableFilterByCourseId: PropTypes.func.isRequired,

    getDepResults: PropTypes.func.isRequired,
    getDepResultsWithSpecs: PropTypes.func.isRequired,
    getDepResultsAdmin: PropTypes.func.isRequired,
    getDepResultsWithSpecAdmin: PropTypes.func.isRequired,

    getAllDepResultsDataForTable: PropTypes.func.isRequired,
    getAllDepResultsDataForTableAdmin: PropTypes.func.isRequired,
    getAllDepResultsDataForTableGlobalAdmin: PropTypes.func.isRequired
};

export default Results;
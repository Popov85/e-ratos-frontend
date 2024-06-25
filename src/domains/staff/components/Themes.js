import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import ThemesTable from "./ThemesTable";
import ThemeEditModal from "./ThemeEditModal";

class Themes extends Component {

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
        this.loadThemesBasedOnRole();
    }

    loadThemesBasedOnRole() {
        // If there is some depId selected by AffiliationSelector,
        // the the current role is at least fac admin, load this different department themes
        this.props.getAllThemesByDepartment();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    handleUpdate(themeId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateThemeName(themeId, newValue);
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
        const {userInfo, authorization, themes, courses, accesses} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = themes;

        return (
            <div className="container-fluid p-0">
                <div className="p-1">
                    <div className="alert alert-secondary text-center mb-1">
                        <h5 className="alert-heading">
                            <strong>Themes management</strong>
                        </h5>
                    </div>
                    {
                        (error || errorUpdate) &&
                        <Error message="Operation failed!" close={() => this.props.clearAllThemesFailures()}/>
                    }
                    {
                        !isLoading &&
                        <div className="d-flex justify-content-between mb-1">
                            <div>
                                {
                                    themes.content &&
                                    <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                                            onClick={() => this.expandedSwitch()}>
                                        {expanded ? <FaCompress/> : <FaExpand/>}
                                    </button>
                                }
                            </div>

                            <div>
                                {
                                    authorization.isAtLeastInstructor &&
                                    <button type="button" className="btn btn-sm btn-success"
                                            onClick={() => this.setState({newMode: true})}>
                                        <FaPlus/>&nbsp;New
                                    </button>
                                }
                                <button type="button" className="btn btn-sm btn-info ml-2"
                                        onClick={() => this.loadThemesBasedOnRole()}>
                                    <FaSync/>&nbsp;Refresh
                                </button>
                            </div>
                        </div>
                    }
                    {
                        themes.content &&
                        <div className="pb-5">
                            <LoadingOverlay
                                active={!!isUpdating}
                                spinner
                                text='Performing API call...'>
                                <ThemesTable
                                    userInfo={userInfo}
                                    authorization={authorization}
                                    themes={themes.content}
                                    courses={courses}
                                    accesses={accesses}
                                    expanded={expanded}
                                    deleteTheme={this.props.deleteTheme}
                                    onTableChange={this.handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    }
                    <Overlay show={!!isLoading}/>
                    {
                        newMode &&
                        <ThemeEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                    }
                </div>
            </div>
        );
    }
}

Themes.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    themes: PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,
    accesses: PropTypes.object.isRequired,

    getAllThemesByDepartment: PropTypes.func.isRequired,
    getAllThemesByDepartmentId: PropTypes.func.isRequired,
    clearAllThemesFailures: PropTypes.func.isRequired,
    updateThemeName: PropTypes.func.isRequired,
    deleteTheme: PropTypes.func.isRequired
};

export default Themes;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import FacTable from "./FacTable";
import {Redirect} from "react-router-dom";
import FacEditModal from "./FacEditModal";

class Faculties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
    }

    componentDidMount() {
        this.loadFacultiesBasedOnRole();
    }

    loadFacultiesBasedOnRole() {
        const {isGlobalAdmin} =
            this.props.authorization;
        if (isGlobalAdmin) {// and organisations
            this.props.getAllFacultiesBunchByRatos();
        } else {//only faculties
            this.props.getAllFacultiesByOrganisation();
        }
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    handleUpdate(facId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateFacName(facId, newValue);
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
        const {newMode} = this.state;
        const authorization = this.props.authorization;
        if (!authorization.isAtLeastOrgAdmin) return <Redirect to='/unauthorized'/>;

        const {faculties, organisations} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = faculties;

        return (
            <div className="container-fluid p-0">
                <div className="row p-3">
                    <div className="col-12">
                        {
                            (error || errorUpdate) &&
                            <Error message="Operation failed!" close={() => this.props.clearAllFacFailures()}/>
                        }
                        {
                            !isLoading &&
                            <div className="text-right mb-1">
                                <button className="btn btn-sm btn-success"
                                        onClick={() => this.setState({newMode: true})}>
                                    <FaPlus/>&nbsp;New
                                </button>
                                <button className="btn btn-sm btn-info ml-2"
                                        onClick={() => this.loadFacultiesBasedOnRole()}>
                                    <FaSync/>&nbsp;Refresh
                                </button>
                            </div>
                        }
                        {
                            faculties.content &&
                            <div className="pb-5">
                                <LoadingOverlay
                                    active={!!isUpdating}
                                    spinner
                                    text='Performing API call...'>
                                    <FacTable
                                        authorization={authorization}
                                        faculties={faculties.content}
                                        organisations={organisations}
                                        deleteFac={this.props.deleteFac}
                                        onTableChange={this.handleTableChange}
                                    />
                                </LoadingOverlay>
                            </div>
                        }
                        <Overlay show={!!isLoading}/>
                        {
                            newMode &&
                            <FacEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                        }
                    </div>
                </div>
            </div>

        );
    }
}

Faculties.propTypes = {
    authorization: PropTypes.object.isRequired,
    faculties: PropTypes.object.isRequired,
    organisations: PropTypes.object, // Only needed for Global admin!

    getAllFacultiesBunchByRatos: PropTypes.func.isRequired,
    getAllFacultiesByOrganisation: PropTypes.func.isRequired,
    clearAllFacFailures: PropTypes.func.isRequired,
    updateFacName: PropTypes.func.isRequired,
    deleteFac: PropTypes.func.isRequired
};

export default Faculties;
import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import UserEditForm from "../forms/UserEditForm";
import {Staff} from "../objects/Staff";
import {User} from "../objects/User";

class UserEdit extends React.Component {

    componentDidMount() {
        // Reset possible previous errors
        this.props.resetStaffState();
        let positions = this.props.positions;
        // Only fetch positions when store array is empty!
        if (!positions) this.props.getPositions();
        const {userInfo, authorization, user} = this.props;
        // For higher admins (to edit affiliation)
        if (authorization.isAtLeastFacAdmin) {
            if (!user) {// New user
                this.props.initAffiliationSelector(userInfo.role);
            } else {// Edit mode
                this.props.initAffiliationSelectorForStaffEditForm(userInfo.role, user);
            }
        }
    }

    handleSubmit(data) {
        let staffId = data.userId;
        const [role] = data.role;
        const actualRole = (role.length>1) ? role : data.role;
        //console.log("actualRole = ", actualRole);
        let staffDTO = new Staff(
            staffId,
            new User(staffId,
                data.name,
                data.surname,
                data.password,
                data.email),
            actualRole,
            data.active,
            data.positionId,
            data.affiliation ? data.affiliation.depId : null
        );
        //console.log("staffDTO = ", staffDTO);
        !staffId ?
            this.props.saveStaff(staffDTO) :
            this.props.updateStaff(staffDTO);
    }

    render() {
        const {userInfo, authorization, user, positions, roles} = this.props;
        const {isLoading, error, message} = this.props.userEdit;

        return (
            <div className="p-1">
                <div className="mt-1">
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
                            <UserEditForm
                                onSubmit={data => this.handleSubmit(data)}
                                initialValues={user ?
                                    {
                                        userId: user.staffId,
                                        name: user.user.name,
                                        surname: user.user.surname,
                                        email: user.user.email,
                                        active: user.user.active,
                                        role: user.user.role,
                                        positionId: user.position.posId,
                                        affiliation: {
                                            depId: user.department.depId,
                                            facId: user.department.faculty.facId,
                                            orgId: user.department.faculty.organisation.orgId
                                        }
                                    }
                                    : null
                                }
                                positions={positions}
                                roles={roles}
                                userInfo={userInfo}
                                authorization={authorization}
                                disabled={isLoading}
                                isNew={!user}
                                finished={!!message}
                                affiliationSelector={this.props.affiliationSelector}
                                getAllFacultiesForSelectorByOrganisationId={this.props.getAllFacultiesForSelectorByOrganisationId}
                                getAllDepartmentsForSelectorByFacultyId={this.props.getAllDepartmentsForSelectorByFacultyId}
                                clearAllOnOrganisationReset={this.props.clearAllOnOrganisationReset}
                                clearAllOnFacultyReset={this.props.clearAllOnFacultyReset}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2">
                            <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    userEdit: PropTypes.object.isRequired,
    user: PropTypes.object,
    positions: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,

    affiliationSelector: PropTypes.object.isRequired,

    resetStaffState: PropTypes.func.isRequired,
    getPositions: PropTypes.func.isRequired,
    saveStaff: PropTypes.func.isRequired,
    updateStaff: PropTypes.func.isRequired,

    initAffiliationSelector: PropTypes.func.isRequired,
    initAffiliationSelectorForStaffEditForm: PropTypes.func.isRequired,

    getAllFacultiesForSelectorByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForSelectorByFacultyId: PropTypes.func.isRequired,
    clearAllOnOrganisationReset: PropTypes.func.isRequired,
    clearAllOnFacultyReset: PropTypes.func.isRequired,
};

export default UserEdit;

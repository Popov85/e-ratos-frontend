import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/Failure";
import UserEditForm from "../forms/UserEditForm";
import {Staff} from "../objects/Staff";
import {User} from "../objects/User";

class UserEdit extends React.Component {

    componentDidMount() {
        this.props.resetStaffState();
        let positions = this.props.positions;
        // Only fetch positions when story array is empty!
        if (positions.length === 0) this.props.getPositions();
    }

    handleSubmit(data) {
        let staffId = data.userId;
        let staffDTO = new Staff(
            staffId,
            new User(staffId,
                data.name,
                data.surname,
                data.password,
                data.email),
            data.role,
            data.active,
            data.positionId
        );
        console.log("staffDTO = staffId = ", staffDTO, staffId);
        !staffId ?
            this.props.saveStaff(staffDTO) :
            this.props.updateStaff(staffDTO);
    }

    render() {
        const {user, positions} = this.props;
        const {isLoading, error, message} = this.props.userEdit;
        return (
            <div className="mt-2 mb-2">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Staff edit</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
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
                                        }
                                        : null
                                    }
                                    positions={positions}
                                    disabled={isLoading}
                                    isNew={user ? false : true}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2">
                                <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
                </div>
            </div>
        );
    }
}

UserEdit.propTypes = {
    positions: PropTypes.array.isRequired,
    userEdit: PropTypes.object.isRequired,
    user: PropTypes.object,

    resetStaffState: PropTypes.func.isRequired,
    getPositions: PropTypes.func.isRequired,
    saveStaff: PropTypes.func.isRequired,
    updateStaff: PropTypes.func.isRequired

};

export default UserEdit;

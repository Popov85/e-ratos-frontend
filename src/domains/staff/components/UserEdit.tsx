import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
import UserEditForm, {UserEditOwnProps} from "../forms/UserEditForm";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {resetStaffState, saveStaff, updateStaff} from "../actions/userEditActions";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {Staff} from "../types/Staff";
import {reset} from "redux-form";
import {getUserById} from "../selectors/usersSelector";
import {FormSelect} from "../types/form/FormSelect";
import {getPositions} from "../actions/positionsActions";
import {getRoles} from "../selectors/rolesSelector";
import {Roles} from "../objects/Roles";
import {initAffiliationSelector, initAffiliationSelectorForStaffEditForm} from "../actions/affiliationSelectorActions";
import {getSecurityRole, SecurityRole} from "../../common/types/SecurityRole";

type Props = {
    staffId?: number
}

const UserEdit: React.FC<Props> = ({staffId}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    const userEdit = useSelector((state: RootState) => state.staff.userEdit);

    if (!logged || !authorization || !userInfo) return null;

    const {isLoading, error, message} = userEdit;

    const staff: Staff | null = useSelector((state: RootState) => getUserById(state, {staffId: staffId}));

    const role: Roles =  useSelector((state: RootState) => getRoles(state)) as Roles;

    const roles: Array<FormSelect> = staffId ? role.forEdit : role.forNew;

    const position = useSelector((state: RootState) => state.staff.positions);

    const positions: Array<FormSelect> = staffId ? position.forEdit : position.forNew;

    useEffect(() => {
        dispatch(resetStaffState());
        if (!position.actual || position.actual.length > 0) dispatch(getPositions());

        if (authorization.isAtLeastFacAdmin) {
            if (!staff) {
                dispatch(initAffiliationSelector(userInfo.role));
            } else {
                dispatch(initAffiliationSelectorForStaffEditForm(userInfo.role, staff));
            }
        }
    }, []);

    const handleSubmit = (data: UserEditOwnProps): void => {
        const staffId: number = data.userId;
        const staff: Staff = {
            staffId: staffId,
            user: {
                userId: staffId,
                name: data.name,
                surname: data.surname,
                password: data.password,
                email: data.email
            },
            role: getSecurityRole(data.role),
            active: data.active,
            positionId: Number(data.positionId),
            depId: data.affiliation ? Number(data.affiliation.depId) : undefined
        };

        if (!staffId) {
            dispatch(saveStaff(staff));
        } else {
            dispatch(updateStaff(staff));
        }
    };

    return (
        <div className="p-1">
            <div className="mt-1">
                {isLoading && (
                    <div className="text-center text-secondary m-2">
                        <span>Saving...</span>
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger text-center p-1" role="alert">
                        <span className="text-danger">
                            <strong>
                                <Failure message={error.message}/>
                            </strong>
                        </span>
                    </div>
                )}
                {message && (
                    <div className="alert alert-success text-center p-1" role="success">
                        <span className="text-success">
                            <strong>{message}</strong>
                        </span>
                    </div>
                )}
                <div className="card bg-transparent">
                    <div className="card-body">
                        <UserEditForm
                            onSubmit={handleSubmit}
                            initialValues={
                                staff
                                    ? {
                                        userId: staff.staffId as number,
                                        name: staff.user.name,
                                        surname: staff.user.surname,
                                        email: staff.user.email,
                                        active: staff.user.active,
                                        role: staff.user?.role!.toString(),
                                        positionId: staff.position?.posId.toString(),
                                        affiliation: {
                                            depId: staff.department?.depId as string,
                                            facId: staff.department?.faculty?.facId as string,
                                            orgId: staff.department?.faculty?.organisation?.orgId as string,
                                        },
                                    }
                                    : undefined
                            }
                            positions={positions}
                            roles={roles}
                            authorization={authorization}
                            disabled={isLoading}
                            isNew={!staff}
                            finished={!!message}
                        />
                    </div>
                    <div className="form-group text-center mt-n2 mb-2">
                        <a href="#" className="badge badge-secondary" onClick={() => dispatch(reset('staff-edit'))}>
                            Reset
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
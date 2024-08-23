import React from 'react';
import {Field} from "redux-form";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {Dispatch} from "redux";
import {number} from "../../../utils/validators/validators";
import {
    clearAllOnFacultyReset,
    clearAllOnOrganisationReset, getAllDepartmentsForSelectorByFacultyId,
    getAllFacultiesForSelectorByOrganisationId
} from "../actions/affiliationSelectorActions";

type Props = {
    authorization: Authorization;
    change: (field: any, value: any) =>void;
}

const AffiliationSelectorFields: React.FC<Props> = ({authorization, change}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const affiliationSelector = useSelector((state: RootState) => state.staff.affiliationSelector);

    if (!authorization.isAtLeastFacAdmin) return null;

    const orgOnChange =(orgId: number): void => {
        change('affiliation.facId', "");
        change('affiliation.depId', "");
        dispatch(clearAllOnOrganisationReset());
        if (orgId) dispatch(getAllFacultiesForSelectorByOrganisationId(orgId));//TODO: consider use cacheable!
    }

    const facOnChange =(facId: number): void => {
        change('affiliation.depId', "");
        dispatch(clearAllOnFacultyReset());
        if (facId) dispatch(getAllDepartmentsForSelectorByFacultyId(facId));//TODO: consider use cacheable!
    }

    return (
        <div className = "ratos-form-fieldset">
            <fieldset>
                <legend>Affiliation</legend>
            {
                authorization.isGlobalAdmin &&
                <Field name="orgId" component={FieldSelectBadge} badge="Organisation"
                       items={affiliationSelector.organisations || []}
                       validate={[number]}
                       onChange={(event: any, newValue: number) => orgOnChange(newValue)}/>
            }
            {
                authorization.isAtLeastOrgAdmin &&
                <Field name="facId" component={FieldSelectBadge} badge="Faculty"
                       items={affiliationSelector.faculties || []}
                       validate={[number]}
                       onChange={(event: any, newValue: number) => facOnChange(newValue)}/>
            }
            {
                authorization.isAtLeastFacAdmin &&
                <Field name="depId" component={FieldSelectBadge} badge="Department"
                       items={affiliationSelector.departments}
                       validate={[number]}/>
            }
            </fieldset>
        </div>
    );
}

export default AffiliationSelectorFields;
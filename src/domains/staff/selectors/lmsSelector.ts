import {createSelector} from "reselect";
// @ts-ignore
import {lmsTransformer} from "../../../utils/transformers/lmsTransformer";
import {RootState} from "../../../store/rootReducer";
import {LMSDropDown} from "../_api/lmsAPI";
import {LMS} from "../types/LMS";

interface LmsProps {
    lmsId?: number;
}

export const getAllProps = (state: RootState, props: LmsProps) => props;

export const getLmsIdFromProps = (state: RootState, props: LmsProps) => props.lmsId;

export const getAllLMSes = (state: RootState) => state.staff.lms.content;

export const getAllLMSesMin = (state: RootState) => state.staff.lms.contentMin;

export const getAnyLMSes = (state: RootState): LMS[] | LMSDropDown[] | null => {
    const {content, contentMin} = state.staff.lms;
    if ((!content || content.length === 0)
        && (!contentMin || contentMin.length === 0)) return null;
    return content ? content : contentMin;
}

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getLMSById = createSelector(
    [getAllLMSes, getLmsIdFromProps],
    (lmses: LMS[], lmsId: number | undefined) => {
        if (!lmses || lmses.length === 0) return null;
        return lmses.find((lms: LMS): boolean => lms.lmsId === lmsId);
    }) as (state: RootState, props: LmsProps) => LMS | null;

export const getLMSesForSelect = createSelector(getAnyLMSes, (lmses) => {
    return lmsTransformer.toSelectWithDummy(lmses);
});

export const getLMSesForFilter = createSelector(getAnyLMSes, (lmses) => {
    if (!lmses || lmses.length === 0) return null;
    return lmsTransformer.toFilter(lmses);
});
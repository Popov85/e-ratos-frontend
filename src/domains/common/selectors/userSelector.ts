import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../types/UserInfo";
import {SecurityRole} from "../types/SecurityRole";

export const getUserInfo = (state: RootState): UserInfo | null => {
    return state.auth.userInfo;
}

export const getRole = (state: RootState): SecurityRole | null => {
    let userInfo: UserInfo | null = getUserInfo(state);
    return userInfo?.role ?? null;
}

export const isLMS = (state: RootState): boolean => {
    return getUserInfo(state)?.lms ?? false;
}
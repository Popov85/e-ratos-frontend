import React from 'react';
import {useParams} from "react-router-dom";
import UserEditContainer from "../containers/UserEditContainer";

const UserEditManager = props => {
    let {staffId} = useParams();
    return <UserEditContainer staffId = {Number(staffId)}/>
};

export default UserEditManager;
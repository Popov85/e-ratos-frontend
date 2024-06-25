import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaCheck, FaCheckSquare, FaRegSquare} from 'react-icons/fa';
import ReportDetails from "./ReportDetails";

const complaintTypes = [
    {typeId: 1, name: "Incorrect question", abb: "IQ"},
    {typeId: 2, name: "Typo in question", abb: "TQ"},
    {typeId: 3, name: "Typo in answer", abb: "TA"},
    {typeId: 4, name: "Bad question format", abb: "FQ"},
    {typeId: 5, name: "Bad answer format", abb: "FA"},
    {typeId: 6, name: "Other mistake", abb: "OM"}
];

const Reported = (props) => {

    const [state, setState] = useState({complaintTypeIds: props.complaints ? props.complaints : new Array()});

    const updateChecked = (typeId) => {
        const {complaintTypeIds} = state;
        if (complaintTypeIds && complaintTypeIds.includes(typeId)) {
            removeComplaint(typeId);
        } else {
            addComplaint(typeId);
        }
    }

    const addComplaint = (id) => {
        let newArray = state.complaintTypeIds.slice();
        newArray.push(id);
        setState({complaintTypeIds: newArray});
    }

    const removeComplaint = (id) => {
        let newArray = state.complaintTypeIds.slice();
        let pos = newArray.indexOf(id);
        newArray.splice(pos, 1);
        setState({complaintTypeIds: newArray});
    }

    const putComplaint = () => {
        const types = state.complaintTypeIds;
        const {schemeId, isLMS, questionId} = props;
        // Send only types that have not been sent yet
        const oldTypes = props.complaints;
        if (!oldTypes) {// First attempt
            props.getReported(schemeId, questionId, isLMS, types);
        } else {// Second attempt: decide what to send?
            let result = new Array();
            for (let i = 0; i < types.length; i++) {
                if (!oldTypes.includes(types[i])) result.push(types[i]);
            }
            if (result.length > 0) {
                props.getReported(schemeId, questionId, isLMS, result);
            } else {// Nothing changed, just close report mode
                props.hideReport();
            }
        }
    }

    const renderMock = (typeId, name, abb) => {
        return (
            <span key={typeId} className="mr-3">
                <a href="#" className="badge badge-danger mr-1" onClick={() => updateChecked(typeId)} title={name}>
                    {
                        state.complaintTypeIds && state.complaintTypeIds.includes(typeId) ?
                            <span><FaCheckSquare color="white"/>&nbsp; {abb} </span>
                            :
                            <span><FaRegSquare color="white"/>&nbsp; {abb}</span>
                    }
                </a>
            </span>);
    }

    const {complaints} = props;
    const {complaintTypeIds} = state;
    return (
        <div className="row ">
            <div className="col-4"/>
            <div className="col-4 alert alert-danger text-center p-1 m-0">
                <h6 className="alert-heading">Choose error type&nbsp;
                    <ReportDetails/>
                    {
                        complaints ? <span className="text-success">&nbsp;[<FaCheck color="green"/>]</span> : null
                    }
                </h6>
                <span>
                    {
                        complaintTypes.map(c => {
                            return renderMock(c.typeId, c.name, c.abb);
                        })
                    }
                    <button type="button"
                            className="badge badge-warning"
                            disabled={complaintTypeIds.length === 0}
                            onClick={() => putComplaint()}
                            title="Submit and send complaint(s)">
                            OK&nbsp;<FaCheck color="red"/>
                    </button>
                </span>
            </div>
            <div className="col-4"/>
        </div>
    );
}

Reported.propTypes = {
    isLMS: PropTypes.bool.isRequired,
    schemeId: PropTypes.number.isRequired,
    questionId: PropTypes.number.isRequired,
    complaints: PropTypes.array,

    hideReport: PropTypes.func.isRequired,
    getReported: PropTypes.func.isRequired
};

export default Reported;
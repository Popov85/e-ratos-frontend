import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FaCheck, FaRegSquare, FaCheckSquare, FaRegQuestionCircle } from 'react-icons/fa';


const complaintTypes = [
    { typeId: 1, name: "Incorrect question", abb: "IQ" },
    { typeId: 2, name: "Typo in question", abb: "TQ" },
    { typeId: 3, name: "Typo in answer", abb: "TA" },
    { typeId: 4, name: "Bad question format", abb: "FQ" },
    { typeId: 5, name: "Bad answer format", abb: "FA" },
    { typeId: 6, name: "Other mistake", abb: "OM" }
];

class Reported extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complaintTypeIds: props.complains ? props.complains : new Array(),
        }
    }

    updateChecked(typeId) {
        const { complaintTypeIds } = this.state;
        if (complaintTypeIds && complaintTypeIds.includes(typeId)) {
            this.removeComplaint(typeId);
        } else {
            this.addComplaint(typeId);
        }
    }

    addComplaint(id) {
        var newArray = this.state.complaintTypeIds.slice();
        newArray.push(id);
        this.setState({ complaintTypeIds: newArray });
    }

    removeComplaint(id) {
        var newArray = this.state.complaintTypeIds.slice();
        var pos = newArray.indexOf(id);
        newArray.splice(pos, 1);
        this.setState({ complaintTypeIds: newArray });
    }

    renderMock(typeId, name, abb) {
        return (
            <span key={typeId} className="mr-3">
                <a href="#" className="badge badge-danger mr-1" onClick={() => this.updateChecked(typeId)} title={name}>
                    {
                        this.state.complaintTypeIds && this.state.complaintTypeIds.includes(typeId) ?
                            <span><FaCheckSquare color="white" />&nbsp; {abb} </span>
                            :
                            <span><FaRegSquare color="white" />&nbsp; {abb}</span>
                    }
                </a>
            </span>);
    }

    render() {
        const { complains } = this.props;
        const {complaintTypeIds} = this.state;
        return (
            <div className="row ">
                <div className="col-4" />
                <div className="col-4 alert alert-danger text-center p-1 m-0">
                    <h6 className="alert-heading">
                        Choose error type&nbsp;<FaRegQuestionCircle className = "icon-hover" title="Help" />
                        {
                            complains ? <span className="text-success">&nbsp;[<FaCheck color="green" />]</span> : null
                        }
                    </h6>
                    <span>
                        {
                            complaintTypes.map(c => {
                                return this.renderMock(c.typeId, c.name, c.abb);
                            })
                        }
                        <button type="button"
                            className="badge badge-warning"
                            disabled={complaintTypeIds.length ===0}
                            onClick={() => this.props.putReport(complaintTypeIds)}
                            title="Submit and send complaint(s)">
                            OK&nbsp;<FaCheck color="red" />
                        </button>
                    </span>
                </div>
                <div className="col-4" />
            </div>
        );
    }
}

Reported.propTypes = {
    complains: PropTypes.array,
    putReport: PropTypes.func.isRequired
};

export default Reported;
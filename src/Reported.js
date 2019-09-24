import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Popover, OverlayTrigger } from 'react-bootstrap';

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

    renderPopover() {
        return (
            <Popover id="popover-basic">
                <Popover.Title as="h3">FAQ on complaints</Popover.Title>
                <Popover.Content className = "m-0 p-0">
                    <ul>
                        <li><strong>IQ</strong> Incorrect question. Use it when you feel like a question is not correct.</li>
                        <li><strong>TQ</strong> Typo in question. Use it when you see a typo in a question</li>
                        <li><strong>TA</strong> Typo in answer. Use it when you see a typo in an answer.</li>
                        <li><strong>FQ</strong> Bad formatting of question. Use it when you see wrong alignment, bad multimedia element, etc.</li>
                        <li><strong>FA</strong> Bad formatting of answer. Use it when you see wrong alignment, bad multimedia element, etc.</li>
                        <li><strong>OM</strong> Other error type. Use it when you find another reason to complain about</li>
                    </ul>
                </Popover.Content>
            </Popover>);
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
        const { complaintTypeIds } = this.state;
        return (
            <div className="row ">
                <div className="col-4" />
                <div className="col-4 alert alert-danger text-center p-1 m-0">
                    <h6 className="alert-heading">Choose error type&nbsp;
                        <OverlayTrigger trigger="click" placement="right" overlay={this.renderPopover()}>
                            <FaRegQuestionCircle className="icon-hover" title="Help" />
                        </OverlayTrigger>
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
                            disabled={complaintTypeIds.length === 0}
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
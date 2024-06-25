import React from 'react';
import {OverlayTrigger, Popover} from "react-bootstrap";
import {FaRegQuestionCircle} from 'react-icons/fa';

const ReportDetails = () => {

    const renderPopover = () => {
        return (
            <Popover id="popover-basic">
                <Popover.Title as="h3">FAQ on complaints</Popover.Title>
                <Popover.Content className="m-0 p-0">
                    <ul>
                        <li><strong>IQ</strong> Incorrect question. Use it when you feel like a question is not correct.
                        </li>
                        <li><strong>TQ</strong> Typo in question. Use it when you see a typo in a question</li>
                        <li><strong>TA</strong> Typo in answer. Use it when you see a typo in an answer.</li>
                        <li><strong>FQ</strong> Bad formatting of question. Use it when you see wrong alignment, bad
                            multimedia element, etc.
                        </li>
                        <li><strong>FA</strong> Bad formatting of answer. Use it when you see wrong alignment, bad
                            multimedia element, etc.
                        </li>
                        <li><strong>OM</strong> Other error type. Use it when you find another reason to complain about
                        </li>
                    </ul>
                </Popover.Content>
            </Popover>);
    }

    return (
        <OverlayTrigger trigger="click" placement="right" overlay={renderPopover()}>
            <FaRegQuestionCircle className="icon-hover" title="Help"/>
        </OverlayTrigger>
    );
};


export default ReportDetails;
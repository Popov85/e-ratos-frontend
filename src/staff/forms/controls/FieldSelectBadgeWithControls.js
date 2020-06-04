import React from 'react';
import {FaEdit, FaPlusCircle, FaSistrix} from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PeekMode from "../../components/PeekMode";
import PeekSettings from "../../components/PeekSettings";
import PeekOptions from "../../components/PeekOptions";
import PeekTwo from "../../components/PeekTwo";
import PeekFour from "../../components/PeekFour";
import PeekFree from "../../components/PeekFree";

const initItems = {
    "value": "",
    "label": "Select"
};

const FieldSelectBadgeWithControls = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    let {items, itemsFull, badge, width, title, hidden} = props;

    if (!items || items.length === 0) items = initItems;

    const getItemById=()=>{
        let {value} = props.input;
        if (badge=='Mode') {
            let item = itemsFull.find(i => i.modeId == value);
            return <PeekMode mode={item}/>;
        }
        if (badge=='Settings') {
            let item = itemsFull.find(i => i.setId == value);
            return <PeekSettings settings={item}/>;
        }
        if (badge=='Options') {
            let item = itemsFull.find(i => i.optId == value);
            return <PeekOptions options={item}/>;
        }
        if (badge=='Two') {
            let item = itemsFull.find(i => i.twoId == value);
            return <PeekTwo grading={item}/>;
        }
        if (badge=='Four') {
            let item = itemsFull.find(i => i.fourId == value);
            return <PeekFour grading={item}/>;
        }
        if (badge=='Free') {
            let item = itemsFull.find(i => i.freeId == value);
            return <PeekFree grading={item}/>;
        }
        return "Badge is unknown...";
    }

    if (hidden) return null;

    return (
        <div>
            <div className={`input-group input-group-sm form-group w-${width ? width : 100}`} title={title}>
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor={badge}>{badge}</label>
                </div>
                <select id={badge}
                        className={`custom-select custom-select-sm ${!touched ? '' : (error || !props.input.value) ? 'is-invalid' : 'is-valid'}`}
                        onChange={e => props.input.onChange(e)}
                        value={props.input.value}>
                    {
                        items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
                    }
                </select>
                {(hasError || !props.input.value) &&
                <div className="invalid-feedback">Please, provide a valid value..</div>}
            </div>
            <div className="d-flex justify-content-end mt-n2">
                {
                    props.input.value ?
                        <OverlayTrigger overlay={<Tooltip id={`peek-${badge}`}>{itemsFull ? getItemById() : "Loading..."}</Tooltip>}>
                            <a href="#" className="badge badge-secondary mr-1">
                                <FaSistrix color="white"/>
                            </a>
                        </OverlayTrigger>
                        :
                        <span className="badge badge-secondary mr-1">
                            <FaSistrix color="gray"/>
                        </span>
                }
                {
                    props.input.value ?
                        <a href="#" className="badge badge-secondary mr-1"
                           onClick={() => alert('Edit')} title="Wish to edit selected?">
                            <FaEdit color="white"/>
                        </a>
                        :
                        <span className="badge badge-secondary mr-1">
                            <FaEdit color="gray"/>
                        </span>
                }
                <a href="#" className="badge badge-success"
                   onClick={() => alert('New')} title="Wish to add new?">
                    <FaPlusCircle color="white"/>
                </a>
            </div>
        </div>
    );
};

export default FieldSelectBadgeWithControls;
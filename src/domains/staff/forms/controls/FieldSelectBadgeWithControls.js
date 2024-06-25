import React, {useState} from 'react';
import {FaEdit, FaPlusCircle, FaSistrix} from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import PeekMode from "../../components/PeekMode";
import PeekSettings from "../../components/PeekSettings";
import PeekOptions from "../../components/PeekOptions";
import PeekTwo from "../../components/PeekTwo";
import PeekFour from "../../components/PeekFour";
import PeekFree from "../../components/PeekFree";
import ModeEditModal from "../../components/ModeEditModal";
import ThemeLookupModal from "../../components/ThemeLookupModal";
import SettingsEditModal from "../../components/SettingsEditModal";

const initItems = {
    "value": "",
    "label": "Select"
};

const FieldSelectBadgeWithControls = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;
    let {items, itemsFull, badge, width, title, hidden} = props;

    if (!items || items.length === 0) items = initItems;

    // Component edit modal;
    const initComponentMode = {mode: false, component: null, itemId: null};

    const [componentEditMode, setComponentEditMode] = useState(initComponentMode);

    const deactivateComponentEditMode = () => setComponentEditMode(initComponentMode);

    const getItemById = () => {
        let {value} = props.input;
        let item;
        switch (badge) {
            case 'Mode':
                item = itemsFull.find(i => i.modeId == value);
                return <PeekMode mode={item}/>;
            case 'Settings':
                item = itemsFull.find(i => i.setId == value);
                return <PeekSettings settings={item}/>;
            case 'Options':
                item = itemsFull.find(i => i.optId == value);
                return <PeekOptions options={item}/>;
            case 'Two':
                item = itemsFull.find(i => i.twoId == value);
                return <PeekTwo grading={item}/>;
            case 'Four':
                item = itemsFull.find(i => i.fourId == value);
                return <PeekFour grading={item}/>;
            case 'Free':
                item = itemsFull.find(i => i.freeId == value);
                return <PeekFree grading={item}/>;
            default:
                return "Badge is unknown...";
        }
    }

    const activateEditModalOf = isNew => {
        let {value} = props.input;
        if (!isNew && !value) return;
        setComponentEditMode({mode: true, component: badge, itemId: !isNew ? Number(value) : null});
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
                        <OverlayTrigger overlay={<Tooltip
                            id={`peek-${badge}`}>{itemsFull ? getItemById() : "Loading..."}</Tooltip>}>
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
                           onClick={() => activateEditModalOf(false)} title="Wish to edit selected?">
                            <FaEdit color="white"/>
                        </a>
                        :
                        <span className="badge badge-secondary mr-1">
                            <FaEdit color="gray"/>
                        </span>
                }
                <a href="#" className="badge badge-success"
                   onClick={() => activateEditModalOf(true)} title="Wish to add new?">
                    <FaPlusCircle color="white"/>
                </a>
            </div>
            {
                componentEditMode.mode
                && componentEditMode.component === 'Mode'
                && <ModeEditModal show={true}
                                  editableModeId={componentEditMode.itemId}
                                  deactivateModal={deactivateComponentEditMode}/>
            }
            {
                componentEditMode.mode
                && componentEditMode.component === 'Settings'
                && <SettingsEditModal show={true}
                                  editableSetId={componentEditMode.itemId}
                                  deactivateModal={deactivateComponentEditMode}/>
            }
        </div>
    );
};

export default FieldSelectBadgeWithControls;
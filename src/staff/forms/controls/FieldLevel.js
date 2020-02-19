import React, { useState} from 'react';

const FieldLevel = props => {

    const initLevel = props.input.value;
    const [editMode, setEditMode] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(initLevel ? initLevel : 1);

    const doChangeLevel =(l) => {
        const newLevel = Number(l.target.value);
        props.input.onChange(newLevel);
        setCurrentLevel(newLevel);
        setEditMode(false);
    }

    if (editMode) {
        return (
            <select autoFocus value={props.input.value} onChange={(l)=>doChangeLevel(l)} onBlur={()=>setEditMode(false)} style={{fontSize: '13px'}}>
                <option value={1}>Level 1</option>
                <option value={2}>Level 2</option>
                <option value={3}>Level 3</option>
            </select>
        );
    }

    return (
        <a href="#" className={`badge badge-${currentLevel===1 ? 'secondary' : currentLevel===2 ? 'warning' : 'danger'}`} onClick={()=> setEditMode(true)}>
            Level <u>{currentLevel}</u>
        </a>
    );

};

export default FieldLevel;
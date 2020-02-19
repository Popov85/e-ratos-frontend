import React, {useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {stateFromHTML} from 'draft-js-import-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FieldWysiwyg = props => {
    const {touched, error} = props.meta;
    const hasError = touched && error;

    let initContentState = stateFromHTML(props.input.value);
    let initEditorState = EditorState.createWithContent(initContentState);

    const [editorState, setEditorState] = useState(initEditorState);

    return (
        <div className="">
            <Editor
                {...props.input}
                toolbarClassName="toolbar-class pb-0 mb-0"
                wrapperClassName="wrapper-class"
                editorClassName={`form-control ${!touched ? '' : error ? 'is-invalid' : 'is-valid'} pl-1 pr-2 pt-0 pb-0`}
                editorStyle={{lineHeight: '1.0', height: '100px', overFlow: 'auto', fontSize: '14px'}}
                onEditorStateChange={e => setEditorState(e)}
                editorState={editorState}
                readOnly={props.disabled}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'remove', 'history'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript']
                    },
                    list: {
                        options: ['unordered', 'ordered']
                    }
                }}
            />
            {hasError && <div className="invalid-feedback">{error}</div>}
        </div>
    );

};

export default FieldWysiwyg;
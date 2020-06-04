import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaEye, FaImage, FaPencilAlt, FaQuestionCircle, FaRegCheckSquare, FaRegSquare, FaTrashAlt} from "react-icons/fa";
import ConfirmModal from "../../common/ConfirmModal";
import {minLength8, required} from "../../utils/validators";
import {questionSorted} from "../../utils/constants";
import {utilsCSS} from "../../utils/utilsCSS";
import '../../../main.css';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import QuestionMcqEditModal from "./QuestionMcqEditModal";
import {utilsHTML} from "../../utils/utilsHTML";
import McqPreviewModal from "./McqPreviewModal";

const QuestionsMcqTable = props => {

    const initEditState = {mode: false, editableQuestionId: null};
    const initDeleteState = {mode: false, deletableQuestionId: null};
    const initPreviewState = {mode: false, previewQuestionId: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);
    const [preview, setPreviewMode] = useState(initPreviewState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);
    const deactivatePreviewModal = () => setPreviewMode(initPreviewState);

    const {userInfo, questionsMcq, expanded} = props;
    const {authenticated} = userInfo;

    const questionTooltip = question => {
        return <Tooltip>{question}</Tooltip>;
    }

    const questionFormatter = question => (
        <OverlayTrigger
            trigger = "click"
            placement="bottom-start"
            overlay={questionTooltip(question)}>
            <span dangerouslySetInnerHTML={utilsHTML.createMarkup(question)}/>
        </OverlayTrigger>
    );

    const columns = [
        {
            dataField: 'questionId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'question',
            text: 'Question',
            sort: true,
            filter: textFilter({
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            style: !expanded ? utilsCSS.getShortCellStyle('13px') : utilsCSS.getDefaultCellStyle('13px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('750px', 'left', '13px'),
            validator: (newValue) => {
                if (required(newValue) || minLength8(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid question!'
                    };
                }
                return true;
            },
            formatter: cell => questionFormatter(cell),
            editor: {
                type: Type.TEXTAREA // To finish editing press: SHIFT+ENTER
            },
            editorStyle: () => utilsCSS.getShortEditorStyle('13px'),
            editable: () => authenticated.isAtLeastInstructor
        },
        {
            dataField: 'level',
            text: 'Lev',
            sort: true,
            align: 'center',
            title: cell => `Level: ${cell}`,
            formatter: cell => {
                if (cell === 1) return <span className="badge badge-success">{cell}</span>;
                if (cell === 2) return <span className="badge badge-warning">{cell}</span>;
                if (cell === 3) return <span className="badge badge-danger">{cell}</span>;
                return cell;
            },
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center', '13px'),
            style: utilsCSS.getDefaultCellStyle('14px'),
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 1,
                    label: '1'
                }, {
                    value: 2,
                    label: '2'
                }, {
                    value: 3,
                    label: '3'
                }]
            },
            editorStyle: () => utilsCSS.getShortEditorStyle('13px'),
            editable: () => authenticated.isAtLeastInstructor
        },
        {
            dataField: 'required',
            text: 'Req',
            sort: true,
            align: 'center',
            formatter: cell => {
                return cell ?
                    <span className="badge badge-success p-1">
                        <FaRegCheckSquare size="1.25em"/>
                    </span> :
                    <span className="badge badge-light p-1">
                        <FaRegSquare size="1.25em"/>
                    </span>;
            },
            title: cell => `This question is: ${cell ? 'required' : 'not required'}`,
            style: utilsCSS.getShortCellStyle('14px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center', '13px'),
            editor: {
                type: Type.SELECT,
                options: [{
                    value: false,
                    label: 'Not required'
                }, {
                    value: true,
                    label: 'Required'
                }]
            },
            editorStyle: () => utilsCSS.getShortEditorStyle('13px'),
            editable: () => authenticated.isAtLeastInstructor
        },
        {
            dataField: 'help',
            text: 'Hlp',
            sort: true,
            align: 'center',
            style: utilsCSS.getShortCellStyle('14px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center', '13px'),
            formatter: (cell) => {
                return cell ?
                    <span className="badge badge-success p-1">
                        <FaQuestionCircle/>
                    </span> :
                    <span className="badge badge-light p-1">
                        <FaQuestionCircle/>
                    </span>;
            },
            title: cell => `Help is ${cell ? 'available' : 'not present'}`,
            editable: false
        },
        {
            dataField: 'resource',
            text: 'Res',
            sort: true,
            align: 'center',
            style: utilsCSS.getShortCellStyle('14px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center', '13px'),
            formatter: (cell) => {
                return cell ?
                    <span className="badge badge-success p-1">
                        <FaImage/>
                    </span> :
                    <span className="badge badge-light p-1">
                        <FaImage/>
                    </span>;
            },
            title: cell => `Resource is ${cell ? 'available' : 'not present'}`,
            editable: false
        },
        {
            dataField: 'actions',
            isDummyField: true,
            editable: false,
            text: 'Action',
            align: 'center',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('70px', 'center', '13px'),
            formatter: (cell, row) => {
                const {questionId} = row;
                return (
                    <div className="d-flex justify-content-between">
                        <a href="#" className="badge badge-info" title = "Preview"
                           onClick={() => setPreviewMode({mode: true, previewQuestionId: questionId})}>
                            <FaEye/>
                        </a>
                        <a href="#" className="badge badge-success" title = "Edit"
                           onClick={() => setEditMode({mode: true, editableQuestionId: questionId})}>
                            <FaPencilAlt/>
                        </a>
                        <a href="#" className="badge badge-warning" title = "Remove"
                           onClick={() => setDeleteMode({mode: true, deletableQuestionId: questionId})}>
                            <FaTrashAlt/>
                        </a>
                    </div>
                );
            }
        }
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='questionId'
                            data={questionsMcq}
                            columns={columns}
                            defaultSorted={questionSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                sizePerPageList: [
                                    {text: '25', value: 25},
                                    {text: '50', value: 50},
                                    {text: '100', value: 100},
                                    {text: '200', value: 200},
                                    {text: 'All', value: questionsMcq.length}
                                ]
                            })}
                            wrapperClasses="table-responsive"
                            headerClasses="thead-light"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                edit.mode &&
                <QuestionMcqEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                editableQuestionId={edit.editableQuestionId} editableThemeId={props.theme.themeId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={remove.mode} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected question?"
                              params={[props.theme.themeId, remove.deletableQuestionId]}
                              doActionIfOK={props.deleteQuestionMcq}/>
            }
            {
                preview.mode &&
                <McqPreviewModal show={preview.mode} deactivateModal={deactivatePreviewModal}
                                 previewMcqQuestionId={preview.previewQuestionId} previewThemeId={props.theme.themeId}/>
            }
        </div>
    );
};

QuestionsMcqTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    questionsMcq: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteQuestionMcq: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default QuestionsMcqTable;
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaEye, FaPencilAlt, FaQuestionCircle, FaTrashAlt, FaImage, FaRegCheckSquare, FaRegSquare} from "react-icons/fa";
import ConfirmModal from "../../common/ConfirmModal";
import {minLength8, required} from "../../utils/validators";
import {helpOptions, levelOptions, questionSorted, resourceOptions, trueFalseOptions} from "../../utils/constants";
import {cssUtils} from "../../utils/cssUtils";
import '../../../main.css';
import {helpFilter} from "../../utils/filters/helpFilter";
import {resourceFilter} from "../../utils/filters/resourceFilter";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import QuestionMcqEditModal from "./QuestionMcqEditModal";

const QuestionsMcqTable = props => {

    const initEditState = {mode: false, editableQuestionId: null};
    const initDeleteState = {mode: false, deletableQuestionId: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);

    const {userInfo, questionsMcq, theme, expanded} = props;
    const {authenticated} = userInfo;

    const questionTooltip = question => {
        return <Tooltip>{question}</Tooltip>;
    }

    const questionFormatter = question => (
        <OverlayTrigger
            placement="bottom-start"
            overlay={questionTooltip(question)}>
            <span>{question}</span>
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
                style: cssUtils.getDefaultFilterStyle('13px')
            }),
            style: !expanded ? cssUtils.getShortCellStyle('13px') : cssUtils.getDefaultCellStyle('13px'),
            headerStyle: () => cssUtils.getDefaultHeaderStyle('750px', 'left', '13px'),
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
            editorStyle: () => cssUtils.getShortEditorStyle('13px'),
            editable: () => authenticated.isAtLeastInstructor
        },

        {
            dataField: 'level',
            text: 'Level',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: levelOptions,
                style: cssUtils.getDefaultFilterStyle('13px')
            }),
            title: cell => `Level: ${cell}`,
            formatter: cell => {
                if (cell === 1) return <span className="badge badge-success">{cell}</span>;
                if (cell === 2) return <span className="badge badge-warning">{cell}</span>;
                if (cell === 3) return <span className="badge badge-danger">{cell}</span>;
                return cell;
            },
            headerStyle: () => cssUtils.getDefaultHeaderStyle('65px', 'center', '13px'),
            style: cssUtils.getDefaultCellStyle('14px'),
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
            editorStyle: () => cssUtils.getShortEditorStyle('13px'),
            editable: () => authenticated.isAtLeastInstructor
        },
        {
            dataField: 'required',
            text: 'Required',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: trueFalseOptions,
                style: cssUtils.getDefaultFilterStyle('13px')
            }),
            formatter: cell => {
                return cell ?
                    <span className="badge badge-success p-1">
                        <FaRegCheckSquare/>
                    </span> :
                    <span className="badge badge-light p-1">
                        <FaRegSquare/>
                    </span>;
            },
            title: cell => `This question is: ${cell ? 'required' : 'not required'}`,
            style: cssUtils.getShortCellStyle('14px'),
            headerStyle: () => cssUtils.getDefaultHeaderStyle('85px', 'center', '13px'),
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
            editorStyle: () => cssUtils.getShortEditorStyle('13px'),
            editable: () => authenticated.isAtLeastInstructor
        },
        {
            dataField: 'help',
            text: 'Help',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: helpOptions,
                onFilter: helpFilter.getHelpFiltered,
                style: cssUtils.getDefaultFilterStyle('13px')
            }),
            style: cssUtils.getShortCellStyle('14px'),
            headerStyle: () => cssUtils.getDefaultHeaderStyle('80px', 'center', '13px'),
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
            text: 'Resource',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: resourceOptions,
                onFilter: resourceFilter.getResourceFiltered,
                style: cssUtils.getDefaultFilterStyle('13px')
            }),
            style: cssUtils.getShortCellStyle('14px'),
            headerStyle: () => cssUtils.getDefaultHeaderStyle('85px', 'center', '13px'),
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
            dataField: 'preview',
            isDummyField: true,
            editable: false,
            text: 'Prv',
            align: 'center',
            title: () => 'Preview question',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('35px', 'center', '13px'),
            formatter: (cell, row) => {
                return (
                    <a href="#" className="badge badge-info">
                        <FaEye/>
                    </a>
                );
            }
        },
        {
            dataField: 'edit',
            isDummyField: true,
            editable: false,
            text: 'Edt',
            align: 'center',
            title: () => 'Edit',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('35px', 'center', '13px'),
            formatter: (cell, row) => {
                const {questionId} = row;
                return (
                    <a href="#" className="badge badge-success"
                       onClick={() => setEditMode({mode: true, editableQuestionId: questionId})}>
                        <FaPencilAlt/>
                    </a>);
            },
            hidden: !authenticated.isAtLeastInstructor ? true : false
        },
        {
            dataField: 'delete',
            isDummyField: true,
            editable: false,
            text: 'Del',
            align: 'center',
            title: () => 'Delete',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('35px', 'center', '13px'),
            formatter: (cell, row) => {
                const {questionId} = row;
                return (
                    <a href="#" className="badge badge-warning"
                       onClick={() => setDeleteMode({mode: true, deletableQuestionId: questionId})}>
                        <FaTrashAlt/>
                    </a>);
            },
            hidden: !authenticated.isAtLeastInstructor ? true : false
        },
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
import React from "react";

export const utilsTable = {

    getCustomListRenderer({pages, onPageChange}) {
        return (
            <div
                className="react-bootstrap-table-pagination-list col-md-6 col-xs-6 col-sm-6 col-lg-6 col-md-6 col-xs-6 col-sm-6 col-lg-6">
                <ul className="pagination pagination-sm react-bootstrap-table-page-btns-ul">
                    {
                        pages.map(p => (
                            <button key={p.page} className="btn btn-sm btn-secondary"
                                    onClick={() => onPageChange(p.page)}>{p.page}</button>
                        ))
                    }
                </ul>
            </div>
        );
    },

    getCustomPageButtonRenderer({page, active, disabled, title, onPageChange}) {
        const handleClick = (e) => {e.preventDefault();onPageChange(page)};
        return (
            <li className={`${active ? 'active' : ''} page-item`}>
                <a href="#" className="page-link pt-1 pb-1 pl-2 pr-2" onClick={handleClick}>{page}</a>
            </li>
        );
    },

    getCustomSizePerPageRenderer({options, currSizePerPage, onSizePerPageChange}) {
        return <div className="btn-group" role="group">
            {
                options.map(option => (
                    <button
                        key={option.text}
                        type="button"
                        onClick={() => onSizePerPageChange(option.page)}
                        className={`btn btn-sm ${currSizePerPage === `${option.page}` ? 'btn-secondary' : 'btn-light'}`}>
                        {option.text}
                    </button>
                ))
            }
        </div>
    },

    getCustomTotal(from, to, size) {
        return (
            <span className="react-bootstrap-table-pagination-total">
                Rows {from} to {to} of {size}
            </span>);
    }
}



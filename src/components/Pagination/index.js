import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'

const Pagination = props => {
    const { usersPerPage, totalUsers, paginate, isActive} = props
    //const paginationStyling = isActive ? 'active-page' : 'inactive-page'
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push({id: uuidv4(), number: i});
    }
    console.log(pageNumbers)
    return (
        <div>
            {pageNumbers.map(item => <button type="button" onClick={() => paginate(item)} className="btn btn-primary ml-1 mr-1">{item.number}</button>)}
        </div>
    )
};

export default Pagination;
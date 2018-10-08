import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

// const ExpenseListItem = (props) => {
export const
ExpenseListItem = ({description, amount, createdAt, id}) => {

    return (
        <div className="expense-list-item">
            <Link to={`/edit/${id}`}>
                <h3>{description}</h3>
            </Link>
            <p>${amount} - {moment(createdAt).format('MM-DD-YYYY')}</p>
        </div>
    );
};


// ExpenseListItem.defaultProps = {};
// ExpenseListItem.propTypes = {
//     name:        PropTypes.string.isRequired,
//     hndleIptChg: PropTypes.func,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({
//          title: PropTypes.string.isRequired,
//          text: PropTypes.string.isRequired
//     }).isRequired,
//     comments:    PropTypes.arrayOf(PropTypes.object),
//     todos:       PropTypes.array,
//     isComplete:  PropTypes.bool,
//     id:          PropTypes.number,
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

export default ExpenseListItem;


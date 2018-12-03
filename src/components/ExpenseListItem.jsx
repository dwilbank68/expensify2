import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// const ExpenseListItem = (props) => {
export const
ExpenseListItem = ({description, amount, createdAt, id}) => {

    return (
        <Link   to={`/edit/${id}`}
                className='list-item'>
            <div>
                <h3 className='list-item__title'>
                    {description}
                </h3>
                <span className='list-item__sub-title'>
                    {moment(createdAt).format('MMMM Do, YYYY')}
                </span>
            </div>
            <h3 className='list-item__data'>
                {numeral(amount/100).format('$0,0.00')}
            </h3>
        </Link>
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


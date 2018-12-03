import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ExpenseListItem from './ExpenseListItem.jsx';
import selectExpenses from '../selectors/expenses.js';
// const ExpenseList = (props) => {
export const
ExpenseList = ({expenses, filters}) => {

    return (
        <div className="content-container">
            <div className="list-header">
                <div className='show-for-mobile'>Expenses</div>
                <div className='show-for-desktop'>Expense</div>
                <div className='show-for-desktop'>Amount</div>
            </div>
            <div className="list-body">
                {expenses.length === 0 ? (
                    <div className='list-item list-item--message'>
                        <span>no expenses</span>
                    </div>
                ) : (
                    expenses.map(exp => (
                        <ExpenseListItem   {...exp}
                                           key={exp.id}/>
                    ))
                )}
            </div>
        </div>
    );
};

//function mapStateToProps(state, ownProps) {
//    return { whatever: state.whatever }
//}
//or
const mapStateToProps = ({expenses, filters}) => ({
    expenses: selectExpenses(expenses, filters),
    filters
});
///////////////////////////// mapDispatchToProps //////////////////////////////
//
// Option 1. Skip it - dispatch is on props anyway
// -----------> this.props.dispatch(loadCourses());
//
//
// Option 2. Wrap props manually
//
// function mapDispatchToProps(dispatch) {
//     return {
//         loadCourses: () => {dispatch(loadCourses())},
//         createCourse: (course) => {dispatch(createCourse(course))}
//     };
// }
// function mapDispatchToProps(dispatch) => {(
//     loadCourses: () => dispatch(loadCourses()),
//     createCourse: course => dispatch(createCourse(course))
// });
// }
// -> this.props.loadCourses, this.props.createCourse
//
//
// Option 3. use bindActionCreators (which is just a shortcut method)
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { nameYouWantOnProps:nameOfImportedAction },
//         dispatch
//     );
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }
//
// use it like -> this.props.actions.loadCourses();

// ExpenseList.defaultProps = {};
// ExpenseList.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// export default ExpenseList;
export default connect(mapStateToProps)(ExpenseList);
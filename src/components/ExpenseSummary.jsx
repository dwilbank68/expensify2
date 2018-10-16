import React from 'react';
import numeral from 'numeral';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import expensesTotal from '../selectors/expensesTotal.js';
import selectExpenses from '../selectors/expenses.js';

// import ExpenseSummary from './ExpenseSummary.jsx';
// const ExpenseSummary = (props) => {
export const
ExpenseSummary = ({expensesCount, expensesTotal}) => {

    const renderMessage = () => {
        const expenseWord = expensesCount == 1 ? 'expense' : 'expenses';
        return `Viewing ${expensesCount} ${expenseWord} totalling ${expensesTotal}`
    }

    return (
        <div className="expense-summary">
            <h1>{renderMessage()}</h1>
        </div>
    );
};


const mapStateToProps = state => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: numeral(expensesTotal(visibleExpenses)/100).format('$0,0.00')
    }
};
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

// ExpenseSummary.defaultProps = {};
// ExpenseSummary.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// export default ExpenseSummary;
export default connect(mapStateToProps)(ExpenseSummary);
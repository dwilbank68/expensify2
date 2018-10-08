import React, {Component} from 'react';
import {connect} from 'react-redux';

import ExpenseForm from './ExpenseForm.jsx';
import {addExpenseActionGen} from "../actions/expensesActionGenerators";

export class
AddExpensePage extends Component {

    onSubmit = expenseObj => {
        this.props.addExpense(expenseObj);
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, getState) => ({
    addExpense: exp => dispatch(addExpenseActionGen(exp))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
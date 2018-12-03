import React, {Component} from 'react';
import {connect} from 'react-redux';

import ExpenseForm from './ExpenseForm.jsx';
import {startAddExpenseActionGen} from "../actions/expensesActionGenerators";

export class
AddExpensePage extends Component {

    onSubmit = expenseObj => {
        this.props.startAddExpense(expenseObj);
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className='page-header__title'>Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, getState) => ({
    startAddExpense: exp => dispatch(startAddExpenseActionGen(exp))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
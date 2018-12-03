import React, {Component} from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm.jsx';
import {startEditExpenseActionGen,
    startRemoveExpenseActionGen} from "../actions/expensesActionGenerators";

export class
EditExpensePage extends Component {

    onSubmit = expenseObj => {
        this.props.startEditExpense(this.props.expense.id, expenseObj);
        this.props.history.push('/')
    }

    onRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }

    render() {

        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className='page-header__title'>Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm    expense={this.props.expense}
                                    onSubmit={this.onSubmit}/>
                    <button onClick={this.onRemove}
                            className='button button--secondary'>
                        Remove
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const idToLoad = props.match.params.id;
    return {
        expense: state.expenses.find(exp => exp.id == idToLoad)
    }
}

const mapDispatchToProps = (dispatch, getState) => ({
    startEditExpense: (id, exp) => dispatch(startEditExpenseActionGen(id, exp)),
    startRemoveExpense: idObj => dispatch(startRemoveExpenseActionGen(idObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
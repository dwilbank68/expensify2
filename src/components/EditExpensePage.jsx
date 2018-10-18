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
                <ExpenseForm    expense={this.props.expense}
                                onSubmit={this.onSubmit}/>
                <button onClick={this.onRemove}>
                    Remove
                </button>
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

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// }
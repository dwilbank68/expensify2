import React, {Component} from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm.jsx';
import {editExpenseActionGen,
    removeExpenseActionGen} from "../actions/expensesActionGenerators";
// import PropTypes from 'prop-types';

// import EditExpense from './EditExpense.jsx';
class EditExpense extends Component {

    // constructor(props, context){
    //     super(props, context);
    //     this.state = {
    //         whatever:{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }


    // handleClick(e) {
    //    
    //    this.setState(prevState => {
    //        return {}
    //    })
    // }

    /////////// ALTERNATIVE 1 - if using create-react-app
    // state = { whatever: false };

    /////////// ALTERNATIVE 2 - if using ES2016 property initializer
    // no more constructor or 'this' binding required
    //
    // state = { whateve': false }
    //
    // handleClick = (e) => {
    //    this.setState(prevState => {
    //        return {}
    //    })
    // }


    render() {
        const {dispatch} = this.props;
        const {id} = this.props.expense;
        return (
            <div>
                <ExpenseForm    expense={this.props.expense}
                                onSubmit={exp => {
                                    // const {dispatch} = this.props;
                                    // const {id} = this.props.expense;
                                    dispatch(editExpenseActionGen(id, exp));
                                    this.props.history.push('/');
                                }}/>
                <button onClick={() => {
                    // const {dispatch} = this.props;
                    // const {id} = this.props.expense;
                    dispatch(removeExpenseActionGen({id}));
                    this.props.history.push('/');
                }}>
                    Remove
                </button>
            </div>
        );
    }
}


// EditExpense.defaultProps = {};
// EditExpense.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// EditExpense.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

const mapStateToProps = (state, props) => {
    const idToLoad = props.match.params.id;
    return {
        expense: state.expenses.find(exp => exp.id == idToLoad)
    }
}

export default connect(mapStateToProps)(EditExpense);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// }
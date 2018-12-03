import React, {Component} from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';


import {connect} from 'react-redux';

// import {ACTION_CONST1, ACTION_CONST2} from '../actions';

// import { bindActionCreators } from 'redux';

class ExpenseForm extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            description: props.expense ? props.expense.description: '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString(): '',
            error: '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false
        };
       // this.handleClick = this.handleClick.bind(this)
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,16}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }
    }

    onDescriptionChange = e => {
        const description = e.target.value;
        this.setState(() => ({description}))
    }

    onNoteChange = e => {
        e.persist();
        this.setState(() => ({note: e.target.value}))
    }

    onDateChange = (createdAt) => {										// 1
        if (createdAt) {
            this.setState( () => ({createdAt}));
        }
    }

    onFocusChange = ({focused}) => {										// 1.5
        this.setState( () => ({calendarFocused: focused}));
    }

    onSubmit = e => {
        e.preventDefault();
        const {description, amount, createdAt, note} = this.state;
        if (!description || !amount) {
            this.setState( () => ({error: 'please provide description and amount'}));
        } else {
            this.setState( () => ({error: ''}));
            this.props.onSubmit({
                description,
                amount: parseFloat(amount, 10) * 100,
                createdAt: createdAt.valueOf(),
                note
            })
        }
    }

    render() {
        return (
            <form   onSubmit={this.onSubmit}
                    className='form'>
                {this.state.error &&
                    <p className='form__error'>
                        {this.state.error}
                    </p>
                }

                <input  type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        className='text-input'/>
                <input  type="text"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        placeholder="Amount"
                        className='text-input'/>
                <SingleDatePicker   date={this.state.createdAt}
                                    onDateChange={this.onDateChange}
                                    focused={this.state.calendarFocused}
                                    onFocusChange={this.onFocusChange}
                                    numberOfMonths={1}
                                    isOutsideRange={(day) => false}/>
                <textarea    placeholder="Add a note for your expense"
                            value={this.state.note}
                            onChange={this.onNoteChange}
                            className='textarea'>

                </textarea>
                <div>
                    <button  className="button">
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default (ExpenseForm);
import React, {Component} from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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
            <div className="expense-form">
                {this.state.error}
                <form onSubmit={this.onSubmit}>
                    <input type="text"
                           placeholder="Description"
                           autoFocus
                           value={this.state.description}
                           onChange={this.onDescriptionChange}/>
                    <input type="text"
                           value={this.state.amount}
                           onChange={this.onAmountChange}
                           placeholder="Amount"/>
                    <SingleDatePicker   date={this.state.createdAt}
                                        onDateChange={this.onDateChange}
                                        focused={this.state.calendarFocused}
                                        onFocusChange={this.onFocusChange}
                                        numberOfMonths={1}
                                        isOutsideRange={(day) => false}/>
                    <textarea placeholder="Add a note for your expense"
                              value={this.state.note}
                              onChange={this.onNoteChange}>

                    </textarea>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

// ExpenseForm.defaultProps = {};
// ExpenseForm.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

///////////////////////////// mapDispatchToProps //////////////////////////////
//
// Skip it - dispatch is on props anyway                            // 1
//
// function mapDispatchToProps(dispatch) {                          // 2
//     return {
//         loadCourses: () => {dispatch(loadCourses())},
//         createCourse: (course) => {dispatch(createCourse(course))},
//     };
// }
//
// function mapDispatchToProps(dispatch) {                          // 3
//     return bindActionCreators(
//         { nameYouWantOnProps:nameOfImportedAction },
//         dispatch
//     );
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)           // 4
//     };
// }
//
// const mapStateToProps = state => ({
//     articles: state.articles
// });

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default (ExpenseForm);
// export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
// export default connect(mSTP, mDTP)(  someHOC(ExpenseForm, arg2)  );
// export default connect(null, actions)(ExpenseForm);         // 5
// export default connect(mapStateToProps, () => ({}))(ExpenseForm);
// export default connect(mapStateToProps, { nameOfImportedAction })(ExpenseForm);

// 1 -  to access --> this.props.dispatch(loadCourses());
// 2 -  to access --> this.props.loadCourses, this.props.createCourse
// 3 -  use bindActionCreators (which is just a shortcut method)
// 4 -  to access --> this.props.actions.loadCourses();
// 5 -  if you "import * as actions from '../actions/actionsIndex';"


// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')
// 5. see ALTERNATIVE 2 above - no 'this' binding required
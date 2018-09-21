import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
// import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import {setTextFilter, sortByDate, sortByAmount,
        setStartDate, setEndDate} from '../actions/filtersActionGenerators.js';

class ExpenseListFilters extends Component {

    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        console.log('------------------------------------------');
        console.log('startDate ',startDate);
        console.log('endDate ',endDate);
        console.log('------------------------------------------');
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    render() {
        const {filters, dispatch} = this.props;
        return (
            <div className="expense-list-filters">
                <input type="text"
                       value={filters.text}
                       onChange={e => dispatch(setTextFilter(e.target.value))}/>
                <select value={filters.sortBy}
                        onChange={e => {
                            if (e.target.value === 'date') {
                                dispatch(sortByDate());
                            } else if (e.target.value = 'amount') {
                                dispatch(sortByAmount());
                            }
                        }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker    startDate={filters.startDate}
                                    endDate={filters.endDate}
                                    onDatesChange={this.onDatesChange}
                                    focusedInput={this.state.calendarFocused}
                                    onFocusChange={this.onFocusChange}
                                    numberOfMonths={1}
                                    isOutsideRange={() => false}
                                    startDateId="startDateId"
                                    endDateId="endDateId"
                                    showClearDates={true}/>
            </div>
        );
    }
}

const mapStateToProps = ({filters}) => ({
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

// ExpenseListFilters.defaultProps = {};
// ExpenseListFilters.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// export default ExpenseListFilters;
export default connect(mapStateToProps)(ExpenseListFilters);
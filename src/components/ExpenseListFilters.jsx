import React, {Component} from 'react';

import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';

import {setTextFilter, sortByDate, sortByAmount,
        setStartDate, setEndDate} from '../actions/filtersActionGenerators.js';

export class
ExpenseListFilters extends Component {

    state = {
        calendarFocused: null
    }

    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    onSortChange = e => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
        } else if (e.target.value = 'amount') {
            this.props.sortByAmount();
        }
    }

    onTextChange = e => {
        this.props.setTextFilter(e.target.value);   
    }

    render() {
        const {filters} = this.props;
        return (
            <div className="expense-list-filters">
                <input type="text"
                       value={this.props.filters.text}
                       onChange={this.onTextChange}/>
                <select value={filters.sortBy}
                        onChange={this.onSortChange}>
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate())

})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
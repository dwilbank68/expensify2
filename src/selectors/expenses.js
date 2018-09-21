import moment from 'moment';

export default
(arr, {text, sortBy, startDate, endDate}) => (
    arr
        .filter(e => {
            // if startDate is undefined, or not a number, 'true', so that 'e' passes thru
            // const startDateMatch =  typeof startDate !== 'number'   || e.createdAt >= startDate;
            // const endDateMatch =    typeof endDate !== 'number'     || e.createdAt <= endDate;
            const createdAtMoment = moment(e.createdAt);
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
            const textMatch = e.description.toLowerCase().includes(text.toLowerCase());
            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return a.createdAt < b.createdAt ? 1 : -1;
            }
            if (sortBy === 'amount') {
                return a.amount < b.amount ? 1 : -1;
            }
        })
)

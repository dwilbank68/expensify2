export default
(expensesArr) => {
    return expensesArr
        .map(e =>  +e.amount)
        .reduce((sum, val) => sum + val, 0)
}

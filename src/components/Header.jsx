import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
// import PropTypes from 'prop-types';

// import Header from './Header.jsx';
class Header extends Component {

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
        return (
            <header className="header">
                <h1>Expensify</h1>
                <NavLink to="/" activeClassName="is-active" exact>Dashboard</NavLink>
                <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
                <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
                <NavLink to="/help" activeClassName="is-active">Help</NavLink>
                Header
            </header>
        );
    }
}

// Header.defaultProps = {};
// Header.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// Header.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default Header;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// }
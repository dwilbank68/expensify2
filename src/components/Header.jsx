import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {startLogout} from "../actions/authActionGenerators";

export
class Header extends Component {

    render() {
        return (
            <header className="header">
                <h1>Expensify</h1>
                <NavLink to="/dashboard" activeClassName="is-active" >Dashboard</NavLink>
                <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
                <button onClick={this.props.startLogout}>
                    Logout
                </button>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(null, mapDispatchToProps)(Header);

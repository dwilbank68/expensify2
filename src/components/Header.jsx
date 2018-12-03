import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {startLogout} from "../actions/authActionGenerators";

export
class Header extends Component {

    render() {
        return (
            <header className="header">
                <div className="content-container">
                    <div className="header__content">
                        <Link   className="header__title"
                                to="/dashboard">
                            <h1>Expensify</h1>
                        </Link>
                        {/*<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>*/}
                        <button className='button button--link'
                                onClick={this.props.startLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(null, mapDispatchToProps)(Header);

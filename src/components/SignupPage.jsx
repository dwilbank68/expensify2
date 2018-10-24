import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

// import {Accounts} from 'meteor/accounts-base';
// import Select from 'react-select';
//
// import {data} from '../../addresses.js';
import {startEmailSignup} from '../actions/authActionGenerators.js';

const styles = {
    boxedViewWrapper: {
        'display': 'flex'
    },
    leftBox: {
        background: 'rgba(255,255,255,.9)',
        borderBottomLeftRadius: '15px',
        borderTopLeftRadius: '15px',
        padding: '2.4rem',
        width: '24rem'
    },
    logo: {
        'height': '250px',
        'marginTop': '30px'
    },
    rightBox: {
        borderBottomRightRadius: '15px',
        borderTopRightRadius: '15px',
    }
}

export
class SignupPage extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            error: '',
            // address: '',
            email:'',
            password:''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    // onAddressChange(val){
    //     this.setState({address:val.value})
    // }

    onEmailChange = e => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onPasswordChange = e => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }

    onSubmit(e){
        e.preventDefault();
        const {email, password} = this.state;

        if (password.length < 8) {
            return this.setState({
                error:'Password must be at least 8 chars long'
            });
        }

        if (!email || !password) {
            this.setState( () => ({error: 'please provide email and password'}));
        } else {
            this.setState( () => ({error: ''}));
            this.props.startEmailSignup( email, password )
        }
    }

// <div className="log-in boxed-view">
    // <div className="boxed-view__box">

    render() {

        // const options = data.addresses.map((a) => {
        //     return {value:a, label:a}
        // })

        return (
            <div className="sign-up boxed-view">
                <div style={styles.boxedViewWrapper}>
                    <div style={styles.leftBox}>
                        <img    style={styles.logo}
                                src="/dist/filler.svg" alt=""/>
                        <div>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                    <div    className="boxed-view__box"
                            style={styles.rightBox}>
                        <h1>Join</h1>

                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit ={this.onSubmit} noValidate className="boxed-view__form">
                            <input type="email"
                                   value={this.state.email}
                                   onChange={this.onEmailChange}
                                   placeholder="Email"/>
                            <input type="password"
                                   value={this.state.password}
                                   onChange={this.onPasswordChange}
                                   placeholder="Password"/>
                           <button className="button">Create Account</button>
                        </form>

                        <Link to="/">
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startEmailSignup: (email, password) => dispatch(startEmailSignup(email, password))
})

export default connect(null, mapDispatchToProps)(SignupPage);
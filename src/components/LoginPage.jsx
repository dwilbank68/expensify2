import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {startEmailLogin, startGoogleLogin} from '../actions/authActionGenerators.js';

const styles = {
    box: {
        borderRadius: '15px',
        background: 'rgba(255,255,255,.9)'
    }
}

export
class LoginPage extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            email:'',
            password:''
        }
       this.onSubmit = this.onSubmit.bind(this)
    }

    onEmailChange = e => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onPasswordChange = e => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }

    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        if (!email || !password) {
            this.setState( () => ({error: 'please provide email and password'}));
        } else {
            this.setState( () => ({error: ''}));
            this.props.startEmailLogin( email, password )
        }
    }

    render() {
        const {startGoogleLogin} = this.props;
        return (
            <div className="log-in boxed-view">
                <div    className="boxed-view__box"
                        style={styles.box}>
                    <h1>Login</h1>

                    <button onClick={startGoogleLogin}>
                        Login with Google
                    </button>

                    {/*{this.state.error ? <p>{this.state.error}</p> : undefined}*/}

                    <form onSubmit ={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email"
                               value={this.state.email}
                               onChange={this.onEmailChange}
                               placeholder="Email"/>
                        <input type="password"
                               value={this.state.password}
                               onChange={this.onPasswordChange}
                               placeholder="Password"/>
                        <button className="button">
                            Log In
                        </button>
                    </form>

                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>

            //     {/*<button onClick={startEmailLogin}>*/}
            //         {/*Login with Email*/}
            //     {/*</button>*/}
            // {/*</div>*/}
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    startEmailLogin: (email, password) => dispatch(startEmailLogin(email, password)),
})

export default connect(null, mapDispatchToProps)(LoginPage);

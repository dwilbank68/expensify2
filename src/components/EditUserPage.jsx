import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import {startSetUserActionGen} from '../actions/userActionGenerators';

import {data} from '../../addresses.js';

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

class EditUserPage extends Component {

    state = {
        address: '',
        error:'',
        fullName: '',
        screenName: ''
    }

    onAddressChange = (val) => {
        this.setState({address:val.value})
    }

    onFullNameChange = e => {
        const fullName = e.target.value;
        this.setState({fullName})
    }

    onScreenNameChange = e => {
        const screenName = e.target.value;
        this.setState({screenName})
    }

    onSubmit = e => {
        e.preventDefault();
        const {address, screenName, fullName} = this.state
        const userData = {address, screenName, fullName};
        const {id} = this.props.match.params;
        if (!userData.address || !userData.screenName) {
            this.setState( () => ({error: 'please provide address and screen name'}));
        } else {
            this.setState( () => ({error: ''}));
            this.props.startSetUser(userData);
            this.props.history.push('/')
        }
    }

    render() {

        const options = data.addresses.map( a => {
            return {value:a, label:a}
        })

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
                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit ={this.onSubmit}
                              noValidate
                              className="boxed-view__form">
                            <input type="text"
                                   value={this.state.screenName}
                                   onChange={this.onScreenNameChange}
                                   placeholder="Screen Name (Short)"/>
                            <input type="text"
                                   value={this.state.fullName}
                                   onChange={this.onFullNameChange}
                                   placeholder="Full Name (optional)"/>
                            <Select className="address"
                                    clearable={false}
                                    placeholder="Type Here Or Select Your Address"
                                    options={options}
                                    onChange={ val => this.onAddressChange(val) }/>
                            <p>{this.state.address ? this.state.address : 'for residents only (address is required)'}</p>
                            <button className="button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

///////////////////////////// mapDispatchToProps //////////////////////////////
//
// Skip it - dispatch is on props anyway                            // 1
//
function mapDispatchToProps(dispatch) {                          // 2
    return {
        startSetUser: (userData) => {dispatch(startSetUserActionGen(userData))}
    };
}
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
// const mapStateToProps = (state, props) => ({
//     articles: state.articles
// });

export default connect(null, mapDispatchToProps)(EditUserPage);
import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header.jsx';

const PrivateRouteAddressRequired = ({hasAddress, isAuthenticated, component: Component, uid, ...rest}) => {

    const PrivateComponent = props => (
        <div>
            <Header/>
            <Component {...props}/>
        </div>
    )

    return (
        <Route  component={props => (
                    isAuthenticated && hasAddress ? PrivateComponent(props) : <Redirect to={`/user_edit/${uid}`}/>
                )}
                {...rest}/>
    );
}


const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid,
    hasAddress: !!state.user.address,
    uid: state.auth.uid
});

export default connect(mapStateToProps)(PrivateRouteAddressRequired);

import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header.jsx';

const PrivateRoute = ({hasAddress, isAuthenticated, component: Component, uid, ...rest}) => {

    const PrivateComponent = props => (
        <div>
            <Header/>
            <Component {...props}/>
        </div>
    )

    return (
        <Route component={props => (
                   isAuthenticated ? PrivateComponent(props) : <Redirect to="/"/>
               )}
               {...rest}/>
    );
}


const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);

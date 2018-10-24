import React, { Component } from 'react';

import { connect } from 'react-redux';

// import {ACTION_CONST1, ACTION_CONST2} from '../actions';

// import { bindActionCreators } from 'redux';

class UserEditPage extends Component {

    // constructor(props, context){
    //     super(props, context);
    //     this.state = {
    //         whatever:{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }

    // state = { whatever: false }; // if using create-react-app
    // and you do not need to init the state based on props

    // handleClick(e) {
    //
    //    this.setState({
    //        dispatch is available under props.dispatch
    //    })
    // }

    /////////// ALTERNATIVE 1 ///////////
    // using create-react-app
    // state = { whatever: false };

    /////////// ALTERNATIVE 2 ///////////
    // using ES2016 property initializer
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
            <div className="user-edit-page">
                UserEditPage
            </div>
        );
    }
}

// UserEditPage.defaultProps = {};
// UserEditPage.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

///////////////////////////// mapDispatchToProps //////////////////////////////
//
// Skip it - dispatch is on props anyway                            // 1
//
// function mapDispatchToProps(dispatch) {                          // 2
//     return {
//         loadCourses: () => {dispatch(loadCourses())},
//         createCourse: (course) => {dispatch(createCourse(course))},
//     };
// }
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

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

// export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);
export default UserEditPage;
// export default connect(mSTP, mDTP)(  someHOC(UserEditPage, arg2)  );
// export default connect(null, actions)(UserEditPage);         // 5
// export default connect(mapStateToProps, () => ({}))(UserEditPage);
// export default connect(mapStateToProps, { nameOfImportedAction })(UserEditPage);

// 1 -  to access --> this.props.dispatch(loadCourses());
// 2 -  to access --> this.props.loadCourses, this.props.createCourse
// 3 -  use bindActionCreators (which is just a shortcut method)
// 4 -  to access --> this.props.actions.loadCourses();
// 5 -  if you "import * as actions from '../actions/actionsIndex';"


// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')
// 5. see ALTERNATIVE 2 above - no 'this' binding required
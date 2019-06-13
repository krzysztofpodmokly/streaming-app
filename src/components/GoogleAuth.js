import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// We want initialize OAuth library added to index.html in script tag only 1 time
// when this component is first rendered to the screen that is why componentDidMount is used
class GoogleAuth extends React.Component {


    componentDidMount() {
        // Initializing library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '760503609094-q37ddi3eui0snmqbthcd207153ttj3ke.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange); // listen accepts callback

                // if auth was defined as const auth then we would have to
                // assign new variable whenever we wanted to reference window.gapi.auth2.getAuthInstance()
                // e.g. onSignInClick = () => { const auth = window.gapi.auth2.getAuthInstance(); auth.signIn() }
            });
        });
    }

    // .listen(callback) allows us to dynamically change content on the page
    // whether the user is signed in or no
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId()); // props.signIn & Out is coming from connect()
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn(); // auth as gapi object
    }

    onSignOutClick = () => {
        this.auth.signOut(); // auth as gapi object
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null; // or display loader
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>Sign In
                </button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
};

const mapStateToProps = (state) => { // reducers/index.js
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth); // signIn & signOut as props
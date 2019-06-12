import React from 'react';

// We want initialize OAuth library added to index.html in script tag only 1 time
// when this component is first rendered to the screen that is why componentDidMount is used
class GoogleAuth extends React.Component {
    state = { isSignedIn: null } // We don't know if a user is logged in or not

    componentDidMount() {
        // Initializing library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '760503609094-q37ddi3eui0snmqbthcd207153ttj3ke.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);

                // if auth was defined as const auth then we would have to
                // assign new variable whenever we wanted to reference window.gapi.auth2.getAuthInstance()
                // e.g. onSignInClick = () => { const auth = window.gapi.auth2.getAuthInstance(); auth.signIn() }
            });
        });
    }

    // .listen(callback) allows us to dynamically change content on the page
    // whether the user is signed in or no
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null; // or display loader
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon" />Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth;
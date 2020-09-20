import React from 'react';
import './Login.css';

class Login extends React.Component {

  render() {
      return (
        <div className="Login">
            <div className="login-container">
                <div className="intro">
                    <h1>Welcome to Biriba Notes</h1>
                    <p>
                      Here you can keep notes on 
                      your favourite card game Biriba
                      using your Google Drive Account
                    </p>
                </div>
                <button
                  onClick={this.props.signInFunction}
                >
                    Login with Google
                </button>
            </div>
        </div>
      );
  }

}

export default Login;
import React from 'react';
import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className="Login">
            <div className="login-container">
                <div className="intro">
                    <h1>Welcome to Biriba Notes</h1>
                    <p>
                      Here you can here you can here
                      you can here you can here you can
                      here you can here
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
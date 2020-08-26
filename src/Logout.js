import React from 'react';
import './Logout.css';

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div className="Logout">
            <div className="logout-container">
                <div className="user">
                  <i className="fa fa-user" /><p>{this.props.userMail}</p>
                </div>
                <button
                  onClick={this.props.signOutFunction}
                >
                    <i className="fa fa-sign-out" />
                </button>
            </div>
        </div>
      );
  }

}

export default Logout;
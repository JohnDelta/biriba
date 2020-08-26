import React from 'react';
import './Menu.css';

class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      googleAuth: ""
    };
  }

  render() {
      return (
        <div className="Menu">
            <div className="menu-container">
                <div className="intro">
                    <h1>Menu</h1>
                </div>
                <button>
                    <i className="fa fa-plus" />
                    <p>New Game Notes</p>
                </button>
                <button>
                    <i className="fa fa-edit" />
                    <p>Existing Game Notes</p>
                </button>
            </div>
        </div>
      );
  }

}

export default Menu;
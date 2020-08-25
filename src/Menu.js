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
            MENU
        </div>
      );
  }

}

export default Menu;
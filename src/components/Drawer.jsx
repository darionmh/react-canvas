import React, {Component} from 'react';

class Drawer extends Component {
    render() {
        return (
            <div className="drawer" onClick={this.props.onClick}>
            </div>
        );
    }
}

export default Drawer;
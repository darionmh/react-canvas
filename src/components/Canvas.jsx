import React from "react";

class Canvas extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        }
    }

    render() {
        return (
            <div id="canvas">
                {this.props.elements}
            </div>
        );
    }
}

export default Canvas
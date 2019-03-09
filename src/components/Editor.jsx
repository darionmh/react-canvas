import React, {Component} from 'react';
import Canvas from "./Canvas";
import Drawer from "./Drawer";
import shortId from "shortid";
import {connect} from "react-redux";
import {addElement, elements, selectedElement} from "../reducers/editor";

class Editor extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.getCenter = this.getCenter.bind(this);
    }

    onClick(){
        let center = this.getCenter(document.getElementById('canvas'))
        let id = shortId.generate()
        this.props.addElement(id, center.x, center.y)
    }

    getCenter(canvas){
        let width = canvas.clientWidth
        let height = canvas.clientHeight

        return {
            x: canvas.offsetLeft + width/2 - 50,
            y: height/2 - 50
        }
    }

    render() {

        return (
            <div className="editor">
                <Drawer onClick={this.onClick}/>
                <Canvas/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedElement: selectedElement(state),
    elements: elements(state)
})

const mapDispatchToProps = (dispatch) => ({
    addElement: (id, x, y) => dispatch(addElement(id, x, y))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
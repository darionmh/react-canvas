import React, {Component} from 'react';
import Canvas from "./Canvas";
import Drawer from "./Drawer";
import Trackable, {defaultStyle} from "./Trackable";
import shortId from "shortid";
import {connect} from "react-redux";
import {addElement, elements, removeElement, selectedElement, setSelectedElement} from "../reducers/editor";

class Editor extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.createChild = this.createChild.bind(this);
        this.getCenter = this.getCenter.bind(this);
    }

    createChild(id, x, y){
        return (
            <Trackable
                key={id}
                id={id}
                x={x}
                y={y}
                onClick={()=>this.props.selectElement(id)}
                remove={()=>this.props.removeElement(id)}>
                <div style={defaultStyle}/>
            </Trackable>
        )
    }

    onClick(){
        let center = this.getCenter(document.getElementById('canvas'))
        let id = shortId.generate()
        let newElement = this.createChild(id, center.x, center.y)
        this.props.addElement(newElement)
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
                <Canvas elements={this.props.elements}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedElement: selectedElement(state),
    elements: elements(state)
})

const mapDispatchToProps = (dispatch) => ({
    addElement: (element) => dispatch(addElement(element)),
    removeElement: (id) => dispatch(removeElement(id)),
    selectElement: (id) => dispatch(setSelectedElement(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
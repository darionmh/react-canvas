import React from "react";
import ElementWrapper, {defaultStyle} from "./ElementWrapper";
import {elements, removeElement, selectedElement, setSelectedElement, updateElement} from "../reducers/editor";
import connect from "react-redux/es/connect/connect";

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.createChild = this.createChild.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    createChild(id, x, y){
        return (
            <ElementWrapper key={id} id={id} x={x} y={y} height={100} width={100}>
                <i className="element fas fa-angry"/>
            </ElementWrapper>
        )
    }

    onClick(e){
        if(this.props.selectedElement !== null)
            this.props.selectElement(null)
    }

    render() {
        let {elements} = this.props
        let mappedElements = elements ? elements.map(e => this.createChild(e.id, e.x, e.y)) : []

        return (
            <div id="canvas" onClick={this.onClick}>
                {mappedElements}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedElement: selectedElement(state),
    elements: elements(state)
})

const mapDispatchToProps = (dispatch) => ({
    removeElement: (id) => dispatch(removeElement(id)),
    selectElement: (id) => dispatch(setSelectedElement(id)),
    updateElement: (id, x, y, height, width) => dispatch(updateElement(id, x, y, height, width))
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
import React from "react";
import ElementWrapper, {defaultStyle} from "./ElementWrapper";
import {elements, removeElement, selectedElement, setSelectedElement} from "../reducers/editor";
import connect from "react-redux/es/connect/connect";

class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.createChild = this.createChild.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    createChild(id, x, y){
        return (
            <ElementWrapper key={id} id={id} x={x} y={y}>
                <i className="element fas fa-angry" style={defaultStyle}/>
                <i className="close far fa-times-circle"/>
                <i className="scale bottom-left fas fa-circle"/>
                <i className="scale bottom-right fas fa-circle"/>
                <i className="scale top-left fas fa-circle"/>
                <i className="scale top-right fas fa-circle"/>
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
    selectElement: (id) => dispatch(setSelectedElement(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
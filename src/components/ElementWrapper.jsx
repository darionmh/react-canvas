import React from "react"
import moment from "moment"
import {removeElement, selectedElement, setSelectedElement, updateElement} from "../reducers/editor";
import connect from "react-redux/es/connect/connect";

class ElementWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.removeElement = this.removeElement.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.startTracking = this.startTracking.bind(this);
        this.stopTracking = this.stopTracking.bind(this);
        this.getStyle = this.getStyle.bind(this);

        this.state = {
            dX: 0, //difference of clientX and element wrapper x
            dY: 0, //difference of clientY and element wrapper y
            x: props.x, //x of client
            y: props.y, //y of client
            height: props.height,
            width: props.width,
            isTracking: false,
            mouseDown: 0,
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove, false)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.x !== this.state.x || nextProps.y !== this.state.y)
            this.setState({
                x: nextProps.x,
                y: nextProps.y,
                height: nextProps.height,
                width: nextProps.width
            })
    }


    onClick(e){
        e.stopPropagation();
    }

    removeElement(){
        this.props.removeElement(this.props.id)
    }

    onMouseMove(e){
        let {dX, dY} = this.state
        if(this.state.isTracking && e.buttons > 0) {
            this.setState({
                x: (e.clientX - dX),
                y: (e.clientY - dY)
            })
        }else{
            this.stopTracking(e)
        }
    }

    onMouseLeave(e){
        console.debug("leave")
        this.stopTracking(e)
    }

    onMouseDown(e){
        console.debug("down")
        e.stopPropagation()
        this.startTracking(e)
    }

    onMouseUp(e){
        console.debug("up")
        e.stopPropagation()
        this.stopTracking(e)
    }

    startTracking(e){
        let dX = e.clientX - this.props.x
        let dY = e.clientY - this.props.y
        this.setState({
            dX,
            dY,
            x: e.clientX - dX,
            y: e.clientY - dY,
            isTracking: true,
            mouseDown: moment()
        }, () => {
            window.addEventListener('mousemove', this.onMouseMove, false)
            if(this.props.selectedElement !== this.props.id)
                this.props.selectElement(this.props.id)
        })
    }

    stopTracking(e){
        let {x, y, dX, dY, height, width} = this.state

        this.setState({
            x: e.clientX-dX,
            y: e.clientY-dY,
            dX: 0,
            dY: 0,
            isTracking: false
        }, () => {
            if(this.props.x !== this.state.x ||  this.props.y !== this.state.y)
                this.props.updateElement(this.props.id, this.state.x, this.state.y, height, width)
            window.removeEventListener('mousemove', this.onMouseMove, false)
        })
    }

    getStyle(){
        let {x, y, dX, dY, height, width} = this.state

        return {
            top: `${y}px`,
            left: `${x}px`,
            height: `${height}px`,
            width: `${width}px`
        }
    }

    render() {
        let style = this.getStyle()
        let className = "element-wrapper"
        if(this.props.selectedElement === this.props.id)
            className += " selected"

        return (
            <div className={className} style={style} onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseUp={(this.onMouseUp)}>
                {this.props.children}
                <i className="close far fa-times-circle" onClick={this.removeElement}/>
                <i className="scale bottom-left fas fa-circle"/>
                <i className="scale bottom-right fas fa-circle"/>
                <i className="scale top-left fas fa-circle"/>
                <i className="scale top-right fas fa-circle"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedElement: selectedElement(state)
})

const mapDispatchToProps = (dispatch) => ({
    selectElement: (id) => dispatch(setSelectedElement(id)),
    removeElement: (id) => dispatch(removeElement(id)),
    updateElement: (id, x, y, height, width) => dispatch(updateElement(id, x, y, height, width))
})

export default connect(mapStateToProps, mapDispatchToProps)(ElementWrapper);
import React from "react"
import moment from "moment"
import {removeElement, selectedElement, setSelectedElement} from "../reducers/editor";
import connect from "react-redux/es/connect/connect";

class ElementWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.startTracking = this.startTracking.bind(this);
        this.stopTracking = this.stopTracking.bind(this);
        this.getStyle = this.getStyle.bind(this);

        this.state = {
            startClientX: 0,
            startClientY: 0,
            dX: 0,
            dY: 0,
            x: props.x,
            y: props.y,
            isTracking: false,
            mouseDown: 0,
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove, false)
    }

    onClick(e){
        e.stopPropagation();
    }

    onDoubleClick(e){
        this.props.removeElement(this.props.id)
    }

    onMouseMove(e){
        if(this.state.isTracking) {
            this.setState({
                dX: (e.clientX - this.state.startClientX),
                dY: (e.clientY - this.state.startClientY)
            })
        }
    }

    onMouseLeave(){
        console.debug("leave")
        this.stopTracking()
    }

    onMouseDown(e){
        console.debug("down")
        e.stopPropagation()
        this.startTracking(e)
    }

    onMouseUp(e){
        console.debug("up")
        e.stopPropagation()
        this.stopTracking()
    }

    startTracking(e){
        this.setState({
            startClientX: e.clientX,
            startClientY: e.clientY,
            isTracking: true,
            mouseDown: moment()
        }, () => {
            window.addEventListener('mousemove', this.onMouseMove, false)
            if(this.props.selectedElement !== this.props.id)
                this.props.selectElement(this.props.id)
        })
    }

    stopTracking(){
        let {x, y, dX, dY} = this.state

        this.setState({
            x: x+dX,
            y: y+dY,
            dX: 0,
            dY: 0,
            isTracking: false
        }, () => window.removeEventListener('mousemove', this.onMouseMove, false))
    }

    getStyle(){
        let {x, y, dX, dY} = this.state

        return {
            top: `${y + dY}px`,
            left: `${x + dX}px`
        }
    }

    render() {
        let style = this.getStyle()
        let className = "element-wrapper"
        if(this.props.selectedElement === this.props.id)
            className += " selected"

        return (
            <div className={className} style={style} onClick={this.onClick} onDoubleClick={this.onDoubleClick} onMouseDown={this.onMouseDown} onMouseUp={(this.onMouseUp)}>
                {this.props.children}
            </div>
        );
    }
}

export const defaultStyle = {
    height: "100px",
    width: "100px",

}

const mapStateToProps = (state) => ({
    selectedElement: selectedElement(state)
})

const mapDispatchToProps = (dispatch) => ({
    selectElement: (id) => dispatch(setSelectedElement(id)),
    removeElement: (id) => dispatch(removeElement(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ElementWrapper);
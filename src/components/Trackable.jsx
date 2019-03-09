import React from "react"

class Trackable extends React.Component{
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
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
            isTracking: false
        }
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.onMouseMove, false)
    }

    onClick(e){
        e.stopPropagation();
        this.props.onClick()
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
            isSelected: true
        }, () => {
            window.addEventListener('mousemove', this.onMouseMove, false)
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
            position: "absolute",
            top: `${y + dY}px`,
            left: `${x + dX}px`
        }
    }

    render() {
        let style = this.getStyle()

        return (
            <div style={style} onClick={this.onClick} onDoubleClick={this.props.remove} onMouseDown={this.onMouseDown} onMouseUp={(this.onMouseUp)}>
                {this.props.children}
            </div>
        );
    }
}

export const defaultStyle = {
    height: "50px",
    width: "50px",
    backgroundColor: "red",
    cursor: "pointer"
}

export default Trackable
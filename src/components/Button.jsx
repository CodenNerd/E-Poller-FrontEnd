import { Component } from "react";
import Config from './config/config'

class Button extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: this.props.text,
            level: this.props.level,
            endpoint: this.props.endpoint,
            context: this.props.context
        }
    }

    handleClick(e) {
        fetch(Config.API+this.state.endpoint)
        .then(response=>response.json())
        .then(data=>{
                const newState = this.state.context.state;
                newState.selected[this.state.level.current] = this.state.level.id
                newState[this.state.level.next] = data.result;
                                
                this.state.context.updateState(newState)
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.handleClick.bind(this)}>
                    {this.state.text}
                </button>
            </div>
        )
    }
}

export default Button

import React, { Component } from "react";
import Config from './config/config'
import Loader from './Loader';

class Button extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: this.props.text,
            level: this.props.level,
            endpoint: this.props.endpoint,
            context: this.props.context,
            selected: this.props.selected,
            loading: false
        }
    }

    handleClick(e) {
        this.setState({loading: true})
        fetch(Config.API+this.state.endpoint)
        .then(response=>response.json())
        .then(data=>{
                const newState = this.state.context.state;
                newState.selected[this.state.level.current] = this.state.level.id
                newState[this.state.level.next] = data.result;
                                
                this.state.context.updateState(newState)
                this.setState({loading: false})
        })

        if(this.state.level.current === "lga"){
            this.setState({loading: true})
            fetch(Config.API+`/LGAs/${this.state.level.id}/summedresults`)
            .then(response=>response.json())
            .then(data=>{
                    const newState = this.state.context.state;
                    newState['results'] = data.summed;
                    newState.lastUpdatedLGA = this.state.text;
                    console.log(newState, this.state.context);
                    this.state.context.updateState(newState)
                    this.setState({loading: false})
            })
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.state.loading && <Loader />}
                <button className={`button ${this.state.context.state.selected[this.state.level.current] === this.state.level.id ? 'selected' : ''}`}  onClick={this.handleClick.bind(this)} >
                    {this.state.text}
                </button>
            </React.Fragment>
        )
    }
}

export default Button

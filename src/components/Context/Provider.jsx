import React, { Component } from "react";
import Config from "../config/config";


export const Context = React.createContext();

class Provider extends Component {
    state = {
        states: [],
        lgas: [],
        wards: [],
        pollingUnits: [],
        results:[],
        selected: {
            state: null,
            lga: null,
            ward: null,
            pollingUnit: null
        }
    }
    componentDidMount(){
       fetch(Config.API+Config.GET_STATES)
         .then(response=> response.json())
         .then(fetchedStates=>{
            this.setState({
                states: fetchedStates.result
            })
         });
    }
    render(){
        return(
            <Context.Provider value={{
                state: this.state,
                updateState: (newState) => this.setState(newState)
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Provider;
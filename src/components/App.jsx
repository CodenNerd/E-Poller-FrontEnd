import React, { Component } from "react";
import Group from './Group';
import Display from './Display'
import Provider from './Context/Provider'


class App extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <Provider className="app">
                <div className="header"><b>Election</b> Poller</div>
                <Group />
                <Display />
            </Provider>
        )
    }
}

export default App

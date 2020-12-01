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
            <Provider>
                <Group />
                <Display />
            </Provider>
        )
    }
}

export default App

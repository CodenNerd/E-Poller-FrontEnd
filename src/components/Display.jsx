import { Component } from "react";
import { Context } from './Context/Provider'

class Display extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <Context.Consumer> 
                    {
                        (context) => (
                                context.state.results.map(result=>{
                                return (
                                    <div>
                                        <div>{result.party_abbreviation}</div>
                                        <div>{result.party_score}</div>
                                        <div>Entered By: {result.entered_by_user}</div>
                                    </div>
                                )                            
                            })
                        )
                    }
            </Context.Consumer>
        )
    }
}

export default Display

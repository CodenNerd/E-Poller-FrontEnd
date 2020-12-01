import { Component } from "react";
import Button from './Button';
import {Context} from './Context/Provider'

class States extends Component {

    render(){
        return(
            <Context.Consumer> 
                    {
                        (context) => (
                                context.state.states.map(state=>{
                                return <Button context={context} key={state.state_id} text={state.state_name} level={{current: 'state', id: state.state_id, next: 'lgas'}} endpoint={`/states/${state.state_id}/LGAs`}/>
                            })
                        )
                    }
            </Context.Consumer>
        )
    }
}

export default States

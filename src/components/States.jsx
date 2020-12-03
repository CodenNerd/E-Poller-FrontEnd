import { Component } from "react";
import Button from './Button';
import {Context} from './Context/Provider'
import {Link} from "react-router-dom";


class States extends Component {

    render(){
        return(
            <Context.Consumer> 
                    {
                        (context) => (
                                context.state.states.map(state=>{
                                return <Link to="/lgas"><Button selected={state.state_id===context.state.selected.state} context={context} key={state.state_id} text={state.state_name} level={{current: 'state', id: state.state_id, next: 'lgas'}} endpoint={`/states/${state.state_id}/LGAs`}/></Link>
                            })
                        )
                    }
            </Context.Consumer>
        )
    }
}

export default States

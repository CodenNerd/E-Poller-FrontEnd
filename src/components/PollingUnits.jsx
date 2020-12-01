import { Component } from "react";
import Button from './Button';
import {Context} from './Context/Provider';

class pollingUnits extends Component {
    constructor(props){
        super(props);

        this.state = {
            pollingUnits: this.props.pollingUnits
        }
    }

    render(){
        return(
            <Context.Consumer> 
                    {
                        (context) => (
                            context.state.pollingUnits.map(pollingUnit=>{
                                return <Button context={context} key={pollingUnit.uniqueid} text={pollingUnit.polling_unit_name+ '-' + pollingUnit.polling_unit_number} level={{current: 'pollingUnit', id: pollingUnit.polling_unit_id, next: 'results'}} endpoint={`/pollingUnits/${pollingUnit.polling_unit_id}/results`} />
                             })
                        )
                    }
            </Context.Consumer>
        )
    }
}

export default pollingUnits

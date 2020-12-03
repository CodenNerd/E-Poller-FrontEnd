import { Component } from "react";
import Button from './Button';
import { Context } from './Context/Provider'
import {Link} from "react-router-dom";

class Wards extends Component {
    constructor(props){
        super(props);

        this.state = {
            wards: this.props.wards
        }
    }

    render(){
        return(
            <Context.Consumer> 
                    {
                        (context) => (
                            context.state.wards.map(ward=>{
                                return <Link to="/polling-units"><Button context={context} key={ward.uniqueid} text={ward.ward_name} level={{current: 'ward', id: ward.ward_id, next: 'pollingUnits'}} endpoint={`/LGAs/${context.state.selected.lga}/wards/${ward.ward_id}/pollingUnits`} /></Link>
                            })
                        )
                    }
            </Context.Consumer>
        )
    }
}

export default Wards

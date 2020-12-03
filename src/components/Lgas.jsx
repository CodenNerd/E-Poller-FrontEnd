import { Component } from "react";
import Button from './Button';
import {Context} from './Context/Provider'
import {Link} from "react-router-dom";

class LGAs extends Component {
    constructor(props){
        super(props);

        this.state = {
            lgas: this.props.lgas
        }
    }

    render(){
        return(

            <Context.Consumer> 
                    {
                        (context) => (
                            context.state.lgas.map(lga=>{
                                return <Link to="/wards"><Button context={context} key={lga.lga_id} text={lga.lga_name} level={{current: 'lga', id: lga.lga_id, next: 'wards'}} endpoint={`/LGAs/${lga.lga_id}/wards`} /></Link>
                             })
                        )
                    }
            </Context.Consumer>
           
        )
    }
}

export default LGAs

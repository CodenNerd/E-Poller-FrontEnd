import { Component } from "react";
import Button from './Button';
import { Context } from './Context/Provider'

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
                                return <Button context={context} key={ward.uniqueid} text={ward.ward_name} level={{current: 'ward', id: ward.ward_id, next: 'pollingUnits'}} endpoint={`/LGAs/${context.state.selected.lga}/wards/${ward.ward_id}/pollingUnits`} />
                            })
                        )
                    }
            </Context.Consumer>
        )
    }
}

export default Wards

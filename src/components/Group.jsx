import { Component } from "react";
import States from './States';
import LGAs from './Lgas';
import Wards from './Wards';
import PollingUnits from './PollingUnits';

class Group extends Component {
    
    render(){
        return(
            
            <div>
                <States />
                <LGAs />
                <Wards />
                <PollingUnits />
            </div>
        )
    }
}

export default Group

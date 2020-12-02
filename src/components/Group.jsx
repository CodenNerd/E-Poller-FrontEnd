import { Component } from "react";
import States from './States';
import LGAs from './Lgas';
import Wards from './Wards';
import PollingUnits from './PollingUnits';

class Group extends Component {
    
    render(){
        return(
            
            <div className="group">
                <div className="state"><States /></div>
                <div className="lwp">
                
                    <div className="lga"><LGAs  /></div>
                    <div className="wp">
                        <div className="ward"><Wards /></div>
                        <div className="polling-unit"><PollingUnits /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group

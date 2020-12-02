import { Component } from "react";
import config from "./config/config";
import { Context } from './Context/Provider'

class Display extends Component {
    constructor(props){
        super(props);

        this.state = {
            showForm: false,
            form: {
                party: '',
                score: '',
                name: '',
            },
            message: "",
        }
    }

    handleClick(){
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            form: {...this.state.form, [name]: event.target.value}
        });
    }

    handleSubmit(context){
        console.log(context);
        if(!(this.state.form.party && this.state.form.score && this.state.form.name)){
            return this.setState({
                message: "Fill all fields to proceed"
            })
        }

        fetch(config.API+`/pollingUnits/${context.state.selected.pollingUnit}/results`, 
        {
            method: 'post',
            body: JSON.stringify({
                polling_unit_uniqueid: context.state.selected.pollingUnit,
                party_abbreviation: this.state.form.party,
                party_score: parseInt(this.state.form.score),
                entered_by_user: this.state.form.name,
                user_ip_address: "127.0.0.1"
            }),
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response=>response.json())
            .then(data=>{
                if(data.response){
                    this.setState({message: data.response})
                }
                else if(!Object.keys(data).length){
                    this.setState({message: "Could not update. Please, select a polling unit and pass an integer to 'score'"})
                }
                else{
                    console.log("data:", data);
                    this.setState({message: 'Results updated'})
                }
            })
    }

    render(){
        return(
            <div>                
                

            <Context.Consumer> 

                    {                        
                        (context) => (    
                                                                
                                context.state.results.map(result=>{
                                return (
                                    <div key={result.party_abbreviation}>  
                                        <div>{result.party_abbreviation}</div>
                                        <div>{result.party_score}</div>
                                        {result.entered_by_user && <div>Entered By: {result.entered_by_user}</div>}
                                    </div>
                                )                            
                            })
                            
                        )
                    }
            </Context.Consumer>
            <Context.Consumer>
                        {
                            (context)=>(
                                    <div>                
                                    <button onClick={this.handleClick.bind(this)} >{ this.state.showForm ? 'x' : 'Store results for a new polling unit' }</button>

                                       {this.state.showForm && (
                                            <div>
                                                <div> Polling Unit Unique ID: {context.state.selected.pollingUnit}</div>                                                
                                                <div>
                                                    Party: <input name="party" onChange={this.handleChange.bind(this)} type="text" value={this.state.form.party}/>
                                                </div>
                                                <div>
                                                    Score: <input name="score" onChange={this.handleChange.bind(this)} type="text" value={this.state.form.score}/>
                                                </div>
                                                <div>
                                                    Enter by: <input name="name" onChange={this.handleChange.bind(this)} type="text" placeholder="Your name" value={this.state.form.name}/>
                                                </div>

                                                <button onClick={()=>this.handleSubmit(context)}>Submit Results</button>
                                            </div>
                                        )}
                                        {
                                            this.state.message && 
                                                <div>
                                                    {this.state.message}
                                                </div>
                                        }
                                        </div>
                            )}
                
            </Context.Consumer>
            </div>
        )
    }
}

export default Display

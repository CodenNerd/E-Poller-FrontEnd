import { Component } from "react";
import config from "./config/config";
import { Context } from './Context/Provider';
import Loader from './Loader';
import {Link} from "react-router-dom";

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
            loading: false
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
        if(!(this.state.form.party && this.state.form.score && this.state.form.name)){
            return this.setState({
                message: "Fill all fields to proceed"
            })
        }
        this.setState({loading: false})
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
                    this.setState({showForm: false})
                    this.setState({message: 'Results updated'})
                }
                this.setState({loading: false})
            })
            this.setState({loading: false})
    }

    render(){
        return(
            <div className="display">                
                
            {this.state.loading && <Loader />}
            <Context.Consumer> 

                    {                        
                        (context) => (   
                                <div>
                                {context.state.results[0] && <div className="puid">{context.state.results[0].entered_by_user ? 'Polling Unit Results': 'Estimated LGA Results for '+ context.state.lastUpdatedLGA}</div>}             
                                {context.state.results.map(result=>{
                                return (
                                    <div key={result.party_abbreviation} className="result">  
                                        <div>{result.party_abbreviation}</div>
                                        <div>{result.party_score}</div>
                                        {result.entered_by_user && <div>Entered By: {result.entered_by_user}</div>}
                                    </div>
                                )                            
                            })}</div> 
                            
                        )
                    }
            </Context.Consumer>
            <Context.Consumer>
                        {
                            (context)=>(
                                    <div className="form-container">                
                                   <Link to="/results">
                                       <button className="store" onClick={this.handleClick.bind(this)} >{ this.state.showForm ? 'close' : 'Store results for a new polling unit' }</button>
                                    </Link> 
                                       {this.state.showForm && (
                                            <div className="form">
                                                <div className="puid"> Polling Unit Unique ID: {context.state.selected.pollingUnit}</div>                                                
                                                <div>
                                                    <input name="party" onChange={this.handleChange.bind(this)} type="text" placeholder="Party Abbreviation" value={this.state.form.party}/>
                                                </div>
                                                <div>
                                                    <input name="score" onChange={this.handleChange.bind(this)} type="text" placeholder="Score" value={this.state.form.score}/>
                                                </div>
                                                <div>
                                                    <input name="name" onChange={this.handleChange.bind(this)} type="text" placeholder="Your name" value={this.state.form.name}/>
                                                </div>

                                                <button onClick={()=>this.handleSubmit(context)}>Submit Score</button>
                                            </div>
                                        )}
                                        {
                                            this.state.message && 
                                                <div className="message">
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

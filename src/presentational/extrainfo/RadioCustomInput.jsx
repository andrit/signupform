import React, {Component} from 'react';
import PropTypes from "prop-types";
import './extrainfo.css';

class RadioCustomInput extends Component{

    // state={
    //     isChecked: false
    // }
    
    // setLocalState = () => {
    //     return new Promise((res, rej)=>{
    //         try{
    //             this.setState({
    //                 isChecked: true
    //             })
    //         }
    //         catch(e){
    //             rej(e)
    //         }
    //     })
    // } 
    handleRadioOnClick = (e) => {
        e.preventDefault();
        let radioState = e.target.childNodes[0].value;
        let radioName = e.target.childNodes[0].name;
        // this.setLocalState()
        // .then(() =>  this.props.handleRadioClick(radioState, radioName))
        this.props.handleRadioClick(radioState, radioName)
        // console.log(radioState);
       
    }

    render(){
        return(
            <div className="radio-group">
                {this.props.options.map((item, i) => {
                    return(
                        <label 
                            className={this.props.radioActiveState === item ? "active-box radio-label" : "radio-label"} 
                            // className={this.state.isChecked ? "active-box radio-label" : "radio-label"} 
                            htmlFor={item + '-card'} 
                            key={i}
                            onClick={(e) => this.handleRadioOnClick(e)}>
                            <input 
                                className="radio-input" 
                                type="radio"
                                name={item} 
                                value={item} 
                                id={item + '_radio'}
                                 />
                            {item}
                        </label>
                    )
                })}
                
            </div>
        )
    }
    
}

export default RadioCustomInput;
import React, {Component} from 'react';
import PropTypes from "prop-types";
import './extrainfo.css';

export class RadioCustomInput extends Component{
    // static propTypes = {
    //     radioActiveState: PropTypes.string,
    //     handleRadioClick: PropTypes.func,
    //     options         : PropTypes.array
    // }
     handleRadioOnClick = (e) => (i) => {
        e.preventDefault();
        let radioState = e.target.value;
        return this.props.handleRadioClick(radioState, i);
    }
    render(){
        return(
            <div className="radio-group">
                {this.props.options.map((item, i) => {
                    return(
                        <label 
                            className={this.props.radioActiveState === item ? "active-box radio-label" : "radio-label"} 
                            htmlFor={item + '-card'} key={i}>
                            <input 
                                className="radio-input" 
                                type="radio" 
                                value={item} 
                                id={item + '_radio'}
                                onClick={() => this.handleRadioOnClick(item)} />
                            {item}
                        </label>
                    )
                })}
                
            </div>
        )
    }
    
}
/**
 * https://reactjs.org/docs/faq-functions.html
 * https://css-tricks.com/react-forms-using-refs/
 */
export class CheckboxCustomInput extends Component {
    static propTypes = {
        selectedBoxes: PropTypes.array,
        handleOnClick: PropTypes.func,
        options      : PropTypes.array,
    }
    handleCheckboxOnClick = (e) => {
        e.preventDefault();
        let checkboxState = e.target.value;
        console.log(checkboxState)
        return this.props.handleCheckboxClick(checkboxState);
    }
    render(){
        return(
            <div className="preference-options">
                {this.props.options.map((item, i) => {
                    return(
                    <div key={i} className="checkbox-group">
                        <label 
                            className={this.props.selectedBoxes.includes(item) ? "active-box checkbox-label" : "checkbox-label"} 
                            htmlFor={item}>
                            <input 
                                className="checkbox-input" 
                                type="checkbox" 
                                value={item}
                                id={item + '_checkbox'}
                                onClick={this.handleCheckboxOnClick} />
                            {item}
                        </label>
                </div>
                    );
                })}
            </div>
    )
    }
    
}
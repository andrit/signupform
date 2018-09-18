import React from 'react';
import './extrainfo.css';

export const RadioCustomInput = (props) => {
    const handleRadioOnClick = (e) => {
        e.preventDefault();
        let radioState = e.target.value;
        return props.handleRadioClick(radioState);
    }
    return(
        <div className="radio-group">
            {props.options.map((item, i) => {
                return(
                    <label 
                        className={props.radioActiveState === 'no'? "active-box radio-label" : "radio-label"} 
                        htmlFor={item + '-card'} key={i}>
                        <input 
                            className="radio-input" 
                            type="radio" 
                            value={item} 
                            id={item + '_radio'}
                            onClick={this.handleRadioOnClick} />
                        {item}
                    </label>
                )
            })}
            
        </div>
    )
}

export const CheckboxCustomInput = (props) => {
    const handleCheckboxOnClick = (e) => {
        e.preventDefault();
        let checkboxState = e.target.value;
        console.log(checkboxState)
        return props.handleCheckboxClick(checkboxState);
    }
    return(
            <div className="preference-options">
                {props.options.map((item, i) => {
                    return(
                    <div key={i} className="checkbox-group">
                        <label 
                            className={props.selectedBoxes.includes({item}) ? "active-box checkbox-label" : "checkbox-label"} 
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
import React, {Component} from 'react';
import PropTypes from "prop-types";
import './extrainfo.css';

class CheckboxCustomInput extends Component {

    handleCheckboxOnClick = (e) => {
        e.preventDefault();
        let checkboxState = e.target.childNodes[0].value;
        console.log(checkboxState);
        return this.props.handleOnClick(checkboxState);
    }
    render(){
        return(
            <div className="preference-options">
            <div className="checkbox-group">
                {this.props.options.map((item, i) => {
                    return(
                    
                        <label 
                            className={this.props.selectedBoxes.includes(item) ? "active-box checkbox-label" : "checkbox-label"} 
                            htmlFor={item}
                            key={i}
                            onClick={(e) => this.handleCheckboxOnClick(e)}>
                            <input 
                                className="checkbox-input" 
                                type="checkbox" 
                                value={item}
                                id={item + '_checkbox'}
                                 />
                            {item}
                        </label>
               
                    );
                })}
                 </div>
            </div>
    )
    }
    
}

export default CheckboxCustomInput;
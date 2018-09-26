import React, {Component} from 'react';
import './extrainfo.css';

class CheckboxCustomInput extends Component {

    handleCheckboxOnClick = (e) => {
        e.preventDefault();
        let checkboxState = e.target.childNodes[0].value;
        let hash = this.props.hash;
        return this.props.handleOnClick(checkboxState, hash);
    }
    render(){
        return(
            <div className="preference-options">
            <div className="checkbox-group">
                {this.props.options.map((item, i) => {
                    return(
                        <label 
                            className={this.props.selectedBoxes.some(e => e.value === item) ? "active-box checkbox-label" : "checkbox-label"} 
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
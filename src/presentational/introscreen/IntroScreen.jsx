import React, {Component} from 'react';
import {TransitionAnimation} from '../../utils/TransitionAnimation';

import PropTypes from "prop-types";

import './introscreen.css';


class IntroScreen extends Component{
    static propTypes = {
        activeSection: PropTypes.string,
        handleSwitchSection: PropTypes.func,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.isLoading();
        this.props.handleSwitchSection('basicinfosection');
    }
    render(){
        return( 
            <section
                id="introsection"
                className={this.props.activeSection === 'introsection' 
                                ? "isactive form-section text-center" 
                                : "notactive form-section text-center"}>
                
                    <div className="img-container">
                        <i className="fa fa-user-circle fa-5x"></i>
                    </div>
                    
                    <div className="intro-salesperson">            
                        {this.props.salesmanName 
                            ? ( <h1>Hey, It's {this.props.salesmanName }</h1> )
                            : ( <h1> Hey, It's PC Richard &amp; Son</h1> )
                        }
                    </div>
               
                <div className="purpose-statement">
                    <p>I would like to keep in touch, feel free to contact me directly with any questions.</p>
                </div>
                <div className="agreement-explanation">
                    <p>Clicking the button below means you agree to receive messages from me via my superphone. You can opt-out at anytime by just texting STOP. Your carrier may charge you normal SMS or data rates</p>
                </div>
                <div className="accept-submit">
                     <button onClick={this.handleSubmit} className="pcrbtn btn-red">Yes, send me texts</button>    
                </div>
            </section> 
        )
    }
}
const IntroScreenMotion = TransitionAnimation(IntroScreen);
export default IntroScreenMotion;
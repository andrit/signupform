import React, {Component} from 'react';
import FetchSalesPerson from '../../container/FetchSalesperson';
import {TransitionAnimation} from '../../utils/TransitionAnimation';

import axios from 'axios';

import PropTypes from "prop-types";

import './introscreen.css';

//import {AcceptText} from 'routesconfig';

class IntroScreen extends Component{
    static propTypes = {
        activeSection: PropTypes.string,
        handleSwitchSection: PropTypes.func,
    }

    state={
        textsAccepted: false
        
    }
   
    handleSubmit = (e) => {
        e.preventDefault();
        const acceptTexts= '';
        axios.post(acceptTexts)
            .then(res => {
                const response = res;
                this.props.handleSwitchSection('basicinfosection');
                
            }
            )
            .then( () => { this.setState({ textsAccepted: true}) })
            .catch((error) => {
                console.log(error);
                //remove these when we have an ajax route that works
                this.props.handleSwitchSection('basicinfosection');
                this.setState({ textsAccepted: true}) 
                
            })
    }
    render(){
        return( 
            <section
                id="introsection"
                className={this.props.activeSection === 'introsection' 
                                ? "isactive form-section text-center" 
                                : "notactive form-section text-center"}>
                
                    <div className="img-container">
                        <FetchSalesPerson>
                        {({salesperson}) => salesperson 
                            ? ( <img className="profile-image" src={salesperson.imgUrl} alt={salesperson.name} /> )
                            : ( <i className="fa fa-user-circle"></i> )
                        }</FetchSalesPerson>
                    </div>
                    
                    <div className="intro-salesperson">
                        <FetchSalesPerson>
                        {({salesperson}) => salesperson 
                            ? ( <h1>Hey, It's {salesperson.name}</h1> )
                            : ( <h1> Hey, It's PC Richard &amp; Son</h1> )
                        }</FetchSalesPerson>
                    </div>
               
                <div className="purpose-statement">
                    <p>I would like to keep in touch, feel free to contact me directly with any questions.</p>
                </div>
                <div className="agreement-explanation">
                    <p>Clicking the button below means you agree to receive messages from me via my superphone. You can opt-out at anytime by just texting STOP. Your carrier may charge you normal SMS or data rates</p>
                </div>
                <div className="accept-submit">
                        {this.state.textsAccepted == false 
                            ? ( <button onClick={this.handleSubmit} className="pcrbtn btn-red">Yes, send me texts</button> )
                            : ( <div className="text-accept-success"><i className="fa fa-check"></i> Great!</div>)}
                    
                </div>
            </section> 
        )
    }
}
const IntroScreenMotion = TransitionAnimation(IntroScreen);
export default IntroScreenMotion;
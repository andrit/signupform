import React, {Component} from 'react';
import {TransitionAnimation} from '../../utils/TransitionAnimation';

import './thankyou.css';

class ThankYou extends Component{
    render(){
        return(
            <section className="thank-you-view">
                <h1>Thank You, {this.props.firstName} {this.props.lastName} for signing up!</h1>
                <p>I will be in touch!</p>
            </section>
        )
    }
    
}
const ThankYouMotion = TransitionAnimation(ThankYou);

export default ThankYouMotion;
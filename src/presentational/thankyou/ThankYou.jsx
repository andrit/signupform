import React, {Component} from 'react';
import {TransitionAnimation} from '../../utils/TransitionAnimation';

import './thankyou.css';

class ThankYou extends Component{
    render(){
        return(
            <section className="thank-you-view">
                <h1>Thank You, {this.props.firstName} {this.props.lastName}!</h1>
                <p>See ya Later!</p>
            </section>
        )
    }
    
}
const ThankYouMotion = TransitionAnimation(ThankYou);

export default ThankYouMotion;

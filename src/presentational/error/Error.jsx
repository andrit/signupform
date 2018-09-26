import React, {Component} from 'react';
import {TransitionAnimationError} from '../../utils/TransitionAnimationError';

import './error.css';

class Error extends Component{
    handleGoBack = (e) => {
        e.preventDefault();
        this.props.handleSwitchSection("introsection");
    }
    render(){
        return(
            <section className="error-view">
                <div><h1>Whoops!</h1></div>
                <div><h2><i className="fa fa-4x fa-exclamation-triangle"></i></h2></div>
                <div><p>There was an error!</p></div>
                <div><button className="btn btn-red" onClick={this.handleGoBack}>Try Again</button></div>
            </section>
        )
    }
    
}
const ErrorMotion = TransitionAnimationError(Error);

export default ErrorMotion;
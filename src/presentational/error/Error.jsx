import React, {Component} from 'react';
import {TransitionAnimationError} from '../../utils/TransitionAnimationError';

import './error.css';

class Error extends Component{
    handleGoBack = (e) => {
        e.preventDefault();
        const fetchUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;
        window.location.href = fetchUrl;
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
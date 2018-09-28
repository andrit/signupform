import React, {Component} from 'react';
import {TransitionAnimation} from '../../utils/TransitionAnimation';
import{fetchGetData} from '../../utils/http';
import PropTypes from "prop-types";

import './introscreen.css';

class IntroScreen extends Component{
    state={
        personname:'',
        apiurl: null
    }
    static propTypes = {
        activeSection: PropTypes.string,
        handleSwitchSection: PropTypes.func,
    }

    componentDidMount() {
        const apiurl= this.state.apiurl + this.props.formHash;
        fetchGetData(apiurl)
        .then(res => {    
            return res.json();
        })
        .then(data => {
            let getData = data;
            let person = data.person;
            this.setState({
                personname: person
            })
        })
        .catch(error => {
            console.log('error GET API getting person: ', error, apiurl);
            this.props.handleSwitchSection('error');
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.isLoading();
        this.props.handleSwitchSection('basicinfosection');
    }
    render(){
        let {btn-color} = this.props;
        return( 
            <section id="introsection"
                className="form-section text-center">
                
                    <div className="img-container">
                        <i className="fa fa-user-circle fa-5x"></i>
                    </div>
                    
                    <div className="intro-person">            
                        {this.state.personname 
                            ? ( <h1>Hey, It's {this.state.personname }</h1> )
                            : ( <h1> Hey, It's Other</h1> )
                        }
                    </div>
               
                <div className="purpose-statement">
                    <p>purpose</p>
                </div>
                <div className="explanation">
                    <p>Explain Purpose</p>
                </div>
                <div className="accept-submit">
                     <button onClick={this.handleSubmit} className=`btn-${btn-color}`>Yes, send me texts</button>    
                </div>
            </section> 
        )
    }
}
const IntroScreenMotion = TransitionAnimation(IntroScreen);
export default IntroScreenMotion;

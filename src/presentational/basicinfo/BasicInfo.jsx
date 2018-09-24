import React, {Component} from 'react';
import {fetchPostData} from '../../utils/http';
import {TransitionAnimation} from '../../utils/TransitionAnimation';
import PropTypes from "prop-types";

import './basicinfo.css';

//const BasicInfo = React.forwardRef((props, ref) => (
  class BasicInfo extends Component {
    state={
        phoneInvalid: false,
        emailInvalid: false,
        // phoneIsFocused: false,
        // emailIsFocused: false
    }
    static propTypes = {
        activeSection: PropTypes.string,
        handleSwitchSection: PropTypes.func,
        fullname: PropTypes.string,
        email: PropTypes.string
    }

    dev_url = "https://apps.pcrichard.com:8082/superphone/"; 
    prod_url = "https://apps.pcrichard.com/superphone/";

    // toggleInputFocus = (e) => {
    //     let fieldName =  e.target.name;
    //     let forFocus = e.target.name + 'IsFocused';
    //     if(fieldName === 'phone'){
    //         this.setState({
    //             phoneIsFocused: true,
    //             emailIsFocused: false
    //         })
    //     } else if(fieldName === 'email'){
    //         this.setState({
    //             emailIsFocused: true,
    //             phoneIsFocused: false
    //         })
    //     } else {
    //         this.setState({
    //             emailIsFocused: false,
    //             phoneIsFocused: false
    //         })
    //     }
        
    // }

    handleUpdateFieldValue = (e) => {
        let fieldName =  e.target.name; 
        let fieldValue = e.target.value;
        let forFocus = e.target.name + 'IsFocused';
        if(fieldName === 'phone'){
            const phoneRegex = /^\(?\d{3}\D*\d{3}\D*\d{4}$/;
           if(!fieldValue.match(phoneRegex)){
               this.setState({
                   phoneInvalid: true
               })
           } else {
            this.setState({
                phoneInvalid: false
            })
           }
                
        }
        if(fieldName === 'email'){
            const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!fieldValue.match(emailRegex)){
                this.setState({
                    emailInvalid: true
                })
            } else {
                this.setState({
                    emailInvalid: false
                })
            }
        }
        this.props.updateFieldValue(fieldName, fieldValue);
    };


    // postData = (url = '', data = {}, fetchmethod = 'POST', fetchmode) => {
    //     const esc = encodeURIComponent;
    //     var query = Object.keys(data)
    //                 .map(k => esc(k)+ '=' + esc(data[k]))
    //                 .join('&');
    //     return fetch(url, {
    //         method: fetchmethod, // *GET, POST, PUT, DELETE, etc.
    //         mode: fetchmode, // no-cors, cors, *same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, same-origin, *omit
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //         body: query
    //     })
    // }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.isLoading();
        //this.setState({ loading: true }, () => {
            fetchPostData(this.dev_url, {
                action : "basic",
                hash : "NZAYCyzl",
                phone : this.props.phone,
                firstName : this.props.firstname,
                lastName : this.props.lastname,
                email : this.props.email,
                }, 'POST', 'cors'
            )
            .then(res => {
                const response = res;
                this.props.notLoading();
                this.props.handleSwitchSection('extrainfosection');
            }
            ).catch((res) => {
                if(res instanceof Error) {
                    console.log(res.message);
                  } else {
                    console.log(res.data);
                  }
                //console.log(error);
                this.props.handleSwitchSection('extrainfosection');
            })
       // });
    }

      render(){
          return(
            <section 
            //ref={ref}
            name="basicinfosection"
            id="basicinfosection"
            className={this.props.activeSection === 'basicinfosection' 
                    ? "isactive form-section text-center" 
                    : "notactive form-section text-center"}>
            <div className="purpose-statement">
                <p>Just add your full name &amp; email to create a contact in my address book</p>
            </div>

            <form>
             <React.Fragment>
                    <input name="firstname" 
                            type="text"
                            value={this.props.firstname} 
                            onChange={this.handleUpdateFieldValue}
                            placeholder='Full Name' />
                    <input name="lastname" 
                            type="text"
                            value={this.props.lastname}
                            onChange={this.handleUpdateFieldValue} 
                            placeholder='Last Name' />
                    <input name="phone" 
                            type="tel"
                            value={this.props.phone} 
                            onFocus={this.toggleInputFocus}
                            onChange={this.handleUpdateFieldValue} 
                            placeholder='Phone Number' />
                    {this.state.phoneInvalid ? <p className="error">Please Enter a Valid Phone Number.</p> : ''}
                    <input name="email" 
                            type="email"
                            value={this.props.email} 
                            onFocus={this.toggleInputFocus}
                            onChange={this.handleUpdateFieldValue} 
                            placeholder='Email' />
                    {this.state.emailInvalid ? <p className="error">Please Enter a Valid Email.</p> : ''}
                    </React.Fragment>

                <div className="accept-submit">
                    <button className="pcrbtn btn-red" onClick={this.handleSubmit}>Add My Basic Info</button>
                </div>
            </form>
        </section> 
          )
      }
  }  
           
//));
const BasicInfoMotion = TransitionAnimation(BasicInfo);
export default BasicInfoMotion;
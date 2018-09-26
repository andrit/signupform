import React, {Component} from 'react';
import {fetchPostDataEncode} from '../../utils/http';
import {TransitionAnimation} from '../../utils/TransitionAnimation';
import PropTypes from "prop-types";

import './basicinfo.css';

//const BasicInfo = React.forwardRef((props, ref) => (
  class BasicInfo extends Component {
    state={
        phoneInvalid: false,
        emailInvalid: false,
        isFormValid: false,
        FormErrors: null
    }
    static propTypes = {
        activeSection: PropTypes.string,
        handleSwitchSection: PropTypes.func,
        fullname: PropTypes.string,
        email: PropTypes.string
    }

    handleUpdateFieldValue = (e) => {
        let fieldName =  e.target.name; 
        let fieldValue = e.target.value;
        this.props.updateFieldValue(fieldName, fieldValue);
    };

    checkForm = ({firstname, lastname, phone, email}) => {
        const phoneRegex = /^\(?\d{3}\D*\d{3}\D*\d{4}$/; 
            const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let emailInvalid = false; 
            let phoneInvalid = false;
            if(!email.match(emailRegex) ){
                emailInvalid = true;
            }
    
            if(!phone.match(phoneRegex) ){
                phoneInvalid = true;
            }
        return {
            firstname:
              !firstname || firstname.trim().length === 0
                ? "First Name is required"
                : false,
            lastname:
              !lastname || lastname.trim().length === 0
                ? "Last Name is required"
                : false,
            email:
                !email || email.trim().length === 0 || emailInvalid
                  ? "Email is required"
                  : false,
            phone:
                !phone || phone.trim().length === 0 || phoneInvalid
                  ? "Phone is required"
                  : false
          };
        }

        checkWholeForm = () => {
            return new Promise((res, rej) => {
                try {
                    let errors = this.checkForm(this.props);
                    let formValid = 0;
                    
                    for(let i in errors) {
                        if(errors[i] === false){
                            ++formValid
                        } else {
                            --formValid
                        }
                    }
                    this.props.checkFormValid(formValid);
                    res();
                } catch(e){
                    rej(e)
                }
            })
           
        }

       

    
    handleSubmit = (e) => {
        e.preventDefault();
        const fetchUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;
        this.checkWholeForm()
        .then(() => {
            this.props.basicFormValid === 4
        ? fetchPostDataEncode(fetchUrl, {
                action : "basic",
                hash : this.props.formHash,
                phone : this.props.phone,
                firstName : this.props.firstname,
                lastName : this.props.lastname,
                email : this.props.email,
                }, 'POST', 'cors'
            )
            .then(res => {
                this.props.handleSwitchSection('extrainfosection');
            }
            ).catch((res) => {
                if(res instanceof Error) {
                    console.log(res.message);
                  } else {
                    console.log(res.data);
                  }
                this.props.handleSwitchSection('error');
            })
        : this.setState({ FormErrors: 'Form did not send succesfully. Please check your values.' })
        });
    }

      render(){
          let errors = this.checkForm(this.props);
          return(
            <section 
            name="basicinfosection"
            id="basicinfosection"
            className={this.props.activeSection === 'basicinfosection' 
                    ? "isactive form-section text-center" 
                    : "notactive form-section text-center"}>
            <div className="purpose-statement">
                <p>Just add your full name &amp; email to create a contact in my address book</p>
            </div>

            <form className="form-section">
             <React.Fragment>
                    <input name="firstname" 
                            type="text"
                            value={this.props.firstname} 
                            onChange={this.handleUpdateFieldValue}
                            placeholder='First Name' />
                            {errors.firstname && this.state.FormErrors ? <p className="error">Please Enter a First Name.</p> : ''}
                    <input name="lastname" 
                            type="text"
                            value={this.props.lastname}
                            onChange={this.handleUpdateFieldValue} 
                            placeholder='Last Name' />
                            {errors.lastname && this.state.FormErrors ? <p className="error">Please Enter a Last Name.</p> : ''}
                    <input name="phone" 
                            type="tel"
                            value={this.props.phone} 
                            onFocus={this.toggleInputFocus}
                            onChange={this.handleUpdateFieldValue} 
                            placeholder='Phone Number' />
                            {errors.phone && this.state.FormErrors ? <p className="error">Please Enter a Valid Phone Number.</p> : ''}
                    <input name="email" 
                            type="email"
                            value={this.props.email} 
                            onFocus={this.toggleInputFocus}
                            onChange={this.handleUpdateFieldValue} 
                            placeholder='Email' />
                            {errors.email && this.state.FormErrors ? <p className="error">Please Enter a Valid Email Number.</p> : ''}
                    </React.Fragment>

                <div className="accept-submit">
                    {this.state.FormErrors && <p className="error">{this.state.FormErrors}</p>}
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
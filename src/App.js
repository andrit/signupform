import React, { Component } from 'react';
import Layout from './Layout';
import IntroScreen from './presentational/introscreen';
import BasicInfo from './presentational/basicinfo';
import ExtraInfo from './presentational/extrainfo';
import ThankYou from './presentational/thankyou';
import Error from './presentational/error';
import Header from './presentational/header';
import LoadingSpinner from './utils/LoadingSpinner';
import {flattenObject, transformAnswerForDataTransport, transformArrayToObject, getUrlVars} from './utils';

import {fetchPostDataPreserve} from './utils/http';

// import {disableScroll, enableScroll} from './utils/handlescroll';


//const extrainfosection = React.createRef();
//const basicinfosection = React.createRef();

class App extends Component {

  state={
    activeSection: 'introsection',
    salesPersonName: '',
    formHash: '',
    firstname: '',
    lastname: '',
    phone: this.props.custPhone,
    email: '',
    radioAnswers: [],
    selectedCheckboxes:[],
    selectedCheckboxesFinal:[],
    havePcrAcct: '',
    formAnswers:[],
    loading: false
  }
  
  // static formAnswers;

 

  componentDidMount() {
    const apiurl= 'https://superphone.io/f/' + this.props.formHash;
  }

  updateFieldValue = (stateprop, value) => {
    this.setState({
      [stateprop]: value
    });
  };
  // isLoading = () => {
  //   return new Promise((res, rej){
  //     try{
  //       this.setState({
  //         loading: true
  //       })
  //       res();
  //     }
  //     catch(e){
  //       rej(e);
  //     }
  //   })
    
  // }
  isLoading = () => {
        this.setState({
          loading: true
        })
    
  }

  notLoading = () => {
    this.setState({
      loading: false
    })
  }

  handleSwitchSection = (section) => {
    const switchSectionState = () => new Promise((res, rej) => {
      try {
        console.log('in submit try');
        this.setState({
          activeSection: section
        })
        res();
      }
      catch(e) {
        rej(e);
      }
    });

    return switchSectionState().then(() => this.notLoading());

  }


  handleExtraInfoFormSubmit = () => {
   return new Promise((res, rej) => {
     try{
      let Answers = this.state.radioAnswers;
      let reversedAnswers = Answers.reverse();
      let radioAnswers= reversedAnswers.filter((answer, index, self) =>
        index === self.findIndex((t) => (
          t.fieldType === 'radio'
        ))
      );
      console.log(radioAnswers);
          // where createApiCheckboxArray() will provide new values
      let cba = this.createApiCheckboxArray(this.state.selectedCheckboxes);
      console.log('cba: ', cba);
      let checkboxAnswers = cba.map(box => {

        return ({ inputState: box.value, fieldType: "checkbox", hashKey: box.hash })
      });
      console.log(checkboxAnswers);
      
      let ExtraAnswers = radioAnswers.concat(checkboxAnswers);
     
      console.log(ExtraAnswers);


        let AnswersObject = transformArrayToObject(transformAnswerForDataTransport(ExtraAnswers));
        console.log('answers object: '. AnswersObject);
      this.setState({
        formAnswers: AnswersObject
      })
      res();
     }
     catch(e){
       rej(e);
     }
   })
    
  }

  //submit whole for
  submitform = (bday) => {
    const fetchUrl = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;
     this.handleExtraInfoFormSubmit()
     .then(() => {
       let answers = this.state.formAnswers;
       const birthday = bday; 

       let flatObj = flattenObject(answers);

       const submitObj = Object.assign({action : "advanced",
                                        hash : this.props.formHash || "NZAYCyzl",
                                        phone : this.state.phone,
                                        birthday: birthday}, flatObj);
       console.log(submitObj);
       
        fetchPostDataPreserve(fetchUrl, submitObj, 'POST', 'cors')
           .then(res => {
               const response = res;
               console.log(response);
               //show them a thank you page
               //this.notLoading();
               this.handleSwitchSection('thankyou');
           }
           ).catch((res) => {
               if(res instanceof Error) {
                   console.log(res.message);
                 } else {
                   console.log(res.data);
                 }
               
           })
     })
   
}


  createApiCheckboxArray = (arr) => {
    let temparray = [];
    let newarray = [];

    arr.map((x) => {
      var index = temparray.indexOf(x.hashKey);
      if (index === -1){
        temparray.push(x.hashKey);
        newarray.push({ hash: x.hashKey, value: [x.value] });
      } else {
        newarray[index].value.push(x.value);
      }
     
    });

    return newarray;
  }


  addCheckboxToSelectedArray = (item, hash) => {
    return new Promise((res, rej) => {
      try{
        let checkboxes = this.state.selectedCheckboxes;
        if(checkboxes.some(e => e.value === item)){
           const findIndexOf = function(arr, val){
             for(let i = 0; i < arr.length; i++) {
               if(arr[i]['value'] === val){
                 return i;
               }
             }
           };
           let indexOf = findIndexOf(checkboxes, item);
            let removedCheckboxes = checkboxes.splice(indexOf, 1);
           this.setState({
             selectedCheckboxes: checkboxes
           })
         } else {          
          this.setState({
            selectedCheckboxes: checkboxes.concat({value: item, hashKey: hash})
          })
        }
        res(item);
      }
      catch(e){
        rej(e);
      }
    })
  }

  handleRadioAnswersUpdate = (val, type, hash) => {
    let inputState = val;
    let fieldType = type;
    let hashKey = hash;
      if(Array.isArray(val)){
        val.forEach(v => {
          this.setState(prevState => ({
            radioAnswers: [...prevState.radioAnswers, {v, fieldType, hashKey}]
          }))
        })
      } else {
        this.setState(prevState => ({
          radioAnswers: [...prevState.radioAnswers, {inputState, fieldType, hashKey}]
        }))
      }
      
  }


  renderSectionOnState = () =>{
     switch(this.state.activeSection){
      case 'introsection':
        return <IntroScreen 
                  salesmanName={this.props.salesman}
                  handleSwitchSection={this.handleSwitchSection} 
                  activeSection={this.state.activeSection}
                  isLoading={this.isLoading}
                  notLoading={this.notLoading} />
      break;
      case 'basicinfosection':
        return <BasicInfo 
                  handleSwitchSection={this.handleSwitchSection} 
                  activeSection={this.state.activeSection}
                  updateFieldValue={this.updateFieldValue}
                  firstname={this.state.firstname} 
                  lastname={this.state.lastname} 
                  phone={this.state.phone} 
                  email={this.state.email} 
                  isLoading={this.isLoading}
                  notLoading={this.notLoading}
                  formHash={this.props.formHash}
                  />
      break;
      case 'extrainfosection':
        return <ExtraInfo
                  activeSection={this.state.activeSection}
                  handleRadioAnswersUpdate={this.handleRadioAnswersUpdate}
                  selectedCheckboxes={this.state.selectedCheckboxes}
                  submitform = {this.submitform} 
                  addCheckboxToSelectedArray = {this.addCheckboxToSelectedArray}
                  phone = {this.state.phone}
                  formAnswers = {this.formAnswers}
                  isLoading={this.isLoading}
                  notLoading={this.notLoading}
                  formHash={this.props.formHash} />
      break;
      case 'thankyou':
        return <ThankYou firstName={this.state.firstname} lastName={this.state.lastname} />
        break;
      case 'error':
        return <Error handleSwitchSection={this.handleSwitchSection} />
        break;
    }
  }



  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header />
          {this.state.loading ? <LoadingSpinner /> : this.renderSectionOnState()}
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Layout from './Layout';
import IntroScreen from './presentational/introscreen';
import BasicInfo from './presentational/basicinfo';
import ExtraInfo from './presentational/extrainfo';
import Header from './presentational/header';

import {fetchPostData} from './utils/http';

// import {disableScroll, enableScroll} from './utils/handlescroll';


//const extrainfosection = React.createRef();
//const basicinfosection = React.createRef();

class App extends Component {

  state={
    activeSection: 'introsection',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    radioAnswers: [],
    // selectedLikes:[],
    // selectedCategories:[],
    selectedCheckboxes:[],
    // radioButtons: [],
    havePcrAcct: '',
    // custBday:'',
    formAnswers:[]
  }
  
  static formAnswers;

  componentDidMount() {
    const urlParms = new URLSearchParams(window.location.search);
  }

  updateFieldValue = (stateprop, value) => {
    this.setState({
      [stateprop]: value
    });
};
  
  // doScrollTo = (element) => {
  //   const elRef = document.getElementById(element);
  //   window.scrollTo({
  //       left: 0, 
  //       top: elRef.offsetTop -80,
  //       behavior: "smooth"
  //   })
  // }


  handleSwitchSection = (section) => {
    let switchSectionState = new Promise((resolve, reject) => {
      try {
        console.log('in submit try');
        this.setState({
          activeSection: section
        })
      }
      catch(e) {
        reject(e)
      }
    });

    // switchSectionState.then(
    //   enableScroll()
    // )
    // .then(
    //   this.doScrollTo(section)
    // );   
    // return switchSectionState();   
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
  
      let checkboxAnswers = this.state.selectedCheckboxes.map(box => {
        return ({ inputState: box.value, fieldType: "checkbox", hashkey: box.hashKey })
      });
      console.log(checkboxAnswers);
      
      let ExtraAnswers = radioAnswers.concat(checkboxAnswers);
     
      console.log(ExtraAnswers);
        //turn extraanswers into correct format
        // let AnswersArray = this.transformAnswerForDataTransport(ExtraAnswers);
        // // let AnswersObject = this.transformArrayToObject(AnswersArray);
        // console.log('array: '. AnswersArray);

        let AnswersObject = this.transformArrayToObject(this.transformAnswerForDataTransport(ExtraAnswers));
        console.log('answers object: '. AnswersObject);
      this.setState({
        formAnswers: AnswersObject
      })
      // this.formAnswers = ExtraAnswers;
      res();
     }
     catch(e){
       rej(e);
     }
   })
    
  }

  transformAnswerForDataTransport = (answers) => {
    let n =1;
    return answers.map(answer => {
        n++;
        // return key.n : answer.key,
        //         type.n : answer.fieldType,
        //          value.n : answer.inputState
        return {
                key : answer.hashKey,
                type : answer.fieldType,
                value : answer.inputState
                }
      })
  }

  transformArrayToObject = (arr) => {
      let obj = {};
      for(let i = 0; i < arr.length; ++i){
          if(arr[i] !== undefined){
              obj[i] = arr[i];
          }
      }
      return obj;
  }

   flattenObject = (ob) => {
    let toReturn = {};
    
    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      
      if ((typeof ob[i]) == 'object') {
        let flatObject = this.flattenObject(ob[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          
          // toReturn[i + '.' + x] = flatObject[x];
          toReturn[x + i] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

  //submit whole form

  submitform = (bday) => {
     this.handleExtraInfoFormSubmit()
     .then(() => {
       let answers = this.state.formAnswers;

       let flatObj = this.flattenObject(answers);
       const submitObj = Object.assign({}, flatObj);
       console.log(submitObj);

        const birthday = bday;
        // let ExtraAnswers = this.state.formAnswers;
        // console.log('extraanswers in extrainfo: '. ExtraAnswers);
        // //turn extraanswers into correct format
        // let AnswersArray = this.transformAnswerForDataTransport(ExtraAnswers);
        // // let AnswersObject = this.transformArrayToObject(AnswersArray);
        // console.log('array: '. AnswersArray);
        // console.log('object: '. AnswersObject);
       
       fetchPostData(this.dev_url, {
           action : "advanced",
           hash : "NZAYCyzl",
           phone : this.props.phone,
           birthday: birthday,
           key1 : 'c5efbe2851797b79409ba18378ea724fa9662504',
           type1 : 'radio',
           value1 : 'NO',

           key2 : '5bdbeca67ac99d2e1389e154044585f8f8639bf5',
           type2 : 'checkbox',
           value2 : '%5B%22GE%22%2C+%22LG%22%5D',

           key3 : 'b73e88a0833a35e41f2c2d53698422dece12abf4',
           type3 : 'checkbox',
           value3 : '%5B%22TVS+AND+ELECTRONICS%22%5D'
           }, 'POST', 'cors')
           .then(res => {
               const response = res;
               //show them a thank you page
               //this.props.handleSwitchSection('extrainfosection');
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

 
  //stillneed this?
  handleAddCheckbox = () => {
    console.log('in app add checkbox hangler');
    let checkboxes = this.state.selectedCheckboxes;
       this.handleFormAnswersUpdate(checkboxes.value, 'checkbox', checkboxes.key);    
  }

  // handleAddRadios = () => {
  //   let radiobtns = this.state.radioButtons;

  // }

  // addRadioToResultsArray = (item, hash) => {
  //   let radioButtonSet = this.state.radioButtons;
  //   if(radioButtonSet.includes(hash)){
  //     this.setState({
  //       radioButtons: radioButtonSet
  //     })
  //   } else {
  //     this.setState({
  //       radioButtons: radioButtonSet.concat({value: item, key: hash})
  //     })
  //   }
  // }
  addCheckboxToSelectedArray = (item, hash) => {
    return new Promise((res, rej) => {
      try{
        let checkboxes = this.state.selectedCheckboxes;
        //checkboxes = checkboxes.filter(box => box[value] !== checkboxes[value]);
        // if(checkboxes[value] = item){
        // if(checkboxes.includes(item)){
        if(checkboxes.some(e => e.value === item)){
          //  let indexof = checkboxes.indexOf(item);
           const findIndexOf = function(arr, val){
             for(let i = 0; i < arr.length; i++) {
               if(arr[i]['value'] === val){
                 return i;
               }
              //  return 1;
             }
           };
           let indexOf = findIndexOf(checkboxes, item);
           console.log('item index: ', indexOf);
            let removedcheckboxes = checkboxes.splice(indexOf, 1);
           this.setState({
             selectedCheckboxes: checkboxes
           })
         } else {
          this.setState({
            selectedCheckboxes: checkboxes.concat({value:item, hashKey:hash})
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
    // if(this.state.formAnswers.inputState !== inputState){
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
                  handleSwitchSection={this.handleSwitchSection} 
                  activeSection={this.state.activeSection} />
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
                  />
      break;
      case 'extrainfosection':
        return <ExtraInfo
                  activeSection={this.state.activeSection}
                  handleAddCheckbox={this.handleAddCheckbox}
                  // addRadioToResultsArray={this.addRadioToResultsArray}
                  handleRadioAnswersUpdate={this.handleRadioAnswersUpdate}
                  selectedCheckboxes={this.state.selectedCheckboxes}
                  // handleExtraInfoFormSubmit={this.handleExtraInfoFormSubmit}
                  submitform = {this.submitform} 
                  addCheckboxToSelectedArray = {this.addCheckboxToSelectedArray}
                  phone = {this.state.phone}
                  formAnswers = {this.formAnswers} />
      break;
    }
  }



  render() {
    return (
      <React.Fragment>
        <Layout>
          <Header />
          {this.renderSectionOnState()}
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;

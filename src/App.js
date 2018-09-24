import React, { Component } from 'react';
import Layout from './Layout';
import IntroScreen from './presentational/introscreen';
import BasicInfo from './presentational/basicinfo';
import ExtraInfo from './presentational/extrainfo';
import Header from './presentational/header';
import LoadingSpinner from './utils/LoadingSpinner';

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
    selectedCheckboxesFinal:[],
    // radioButtons: [],
    havePcrAcct: '',
    // custBday:'',
    formAnswers:[],
    loading: false
  }
  
  // static formAnswers;

  dev_url = "https://apps.pcrichard.com:8082/superphone/"; 
  prod_url = "https://apps.pcrichard.com/superphone/";

  componentDidMount() {
    const urlParms = new URLSearchParams(window.location.search);
  }

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
          // where createApiCheckboxArray() will provide new values
      let cba = this.createApiCheckboxArray(this.state.selectedCheckboxes);
      console.log('cba: ', cba);
      let checkboxAnswers = cba.map(box => {
        //if(box.hashKey )
        return ({ inputState: box.value, fieldType: "checkbox", hashKey: box.hash })
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

  flattenObject = (object, separator = '') => {

    const isValidObject = value => {
      if (!value) {
        return false
      }
  
      const isArray  = Array.isArray(value);
      const isObject = Object.prototype.toString.call(value) === '[object Object]';
      const hasKeys  = !!Object.keys(value).length;
  
      return !isArray && isObject && hasKeys
    }
  
    const walker = (child, path = []) => {
  
      return Object.assign({}, ...Object.keys(child).map(key => isValidObject(child[key])
        ? walker(child[key], path.concat([key]).reverse())
        : { [path.concat([key]).reverse().join(separator)] : child[key] })
      )
    }
  
    return Object.assign({}, walker(object))
  };


  updateObjFromZeroIndex = (obj, fn) => {
    const objKeys = Object.keys(obj);
    let result;
    
    for (var i = 0; i < objKeys.length; i++) {
      let key = objKeys[i]; 
      let val = obj[key];
      let cb = fn(key, val);

      if (cb !== '') {
        key = cb;
      }
      result[key] = val;
    }

      return result;
    }


  //submit whole for
  submitform = (bday) => {
     this.handleExtraInfoFormSubmit()
     .then(() => {
       let answers = this.state.formAnswers;
       const birthday = bday; 

       let flatObj = this.flattenObject(answers);
       let answerObj = this.updateObjFromZeroIndex(flatObj, function(key, val){
        let numKey = key.slice(-1);  
        let sumKey = parseInt(numKey) +1;
        let wordKey = key.slice(0, -1);
        let updatedKey = wordKey + sumKey;
        console.log(updatedKey); 
        return  updatedKey;
       });

       const submitObj = Object.assign({action : "advanced",
                                        hash : "NZAYCyzl",
                                        phone : this.state.phone,
                                        birthday: birthday}, answerObj);
       console.log(submitObj);

       
        // let ExtraAnswers = this.state.formAnswers;
        // console.log('extraanswers in extrainfo: '. ExtraAnswers);
        // //turn extraanswers into correct format
        // let AnswersArray = this.transformAnswerForDataTransport(ExtraAnswers);
        // // let AnswersObject = this.transformArrayToObject(AnswersArray);
        // console.log('array: '. AnswersArray);
        // console.log('object: '. AnswersObject);
       
       fetchPostData(this.dev_url, submitObj, 'POST', 'cors')
           .then(res => {
               const response = res;
               console.log(response);
               //show them a thank you page
               //this.props.handleSwitchSection('thankyousection');
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


  //NEW! 9/23 pass in this.state.formAnswers
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



   //remove checkboxesfinal 9/23
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
      
           console.log('item index: ', indexOf);
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
                  formAnswers = {this.formAnswers}
                  isLoading={this.isLoading}
                  notLoading={this.notLoading} />
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

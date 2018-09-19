import React, { Component } from 'react';
import Layout from './Layout';
import IntroScreen from './presentational/introscreen';
import BasicInfo from './presentational/basicinfo';
import ExtraInfo from './presentational/extrainfo';
import Header from './presentational/header';

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
    formAnswers: [],
    // selectedLikes:[],
    // selectedCategories:[],
    
    havePcrAcct: '',
    custBday:''
  }
  
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
    let Answers = this.state.formAnswers;
    let reversedAnswers = Answers.reverse();
    let radioAnswers= reversedAnswers.filter((answer, index, self) =>
      index === self.findIndex((t) => (
        t.fieldType === 'radio'
      ))
    );
    console.log(radioAnswers);
    let checkboxAnswers = Answers.filter(obj => obj.fieldType !== 'radio');
    console.log(checkboxAnswers);
    
    let ExtraAnswers = radioAnswers.concat(checkboxAnswers);
    //getting strays that were shut off...clean up initial?
    ExtraAnswers = ExtraAnswers.filter((answer, index, self) =>
      index === self.findIndex((t) => (
        // if(answer.fieldType === 'radio'){
        //   //get last one
        //   t.fieldType === answer.fieldType
        // }
        t.inputState === answer.inputState
      ))
    );
    console.log(ExtraAnswers);
  }
 
  handleAddCheckbox = (items) => {
    console.log('in app add checkbox hangler', item);
    // let checkboxes = this.state.formAnswers;
    let positiveCheckboxes = this.countHowManyEntriesCheckboxes(items);
    // if(!checkboxes.includes(item)){
       this.handleFormAnswersUpdate(positiveCheckboxes, 'checkbox');
    //  } 
     
  }

  // handleRadioUpdate = (item) => {

  // }
  countHowManyEntriesCheckboxes = (arr) => {
    let current = null;
    let cnt = 0;
    let a;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] != current) {
        if(cnt % 2){
          //remove if the cnt is modulo 2
          //arr.filter(())
          
          //a = arr.reduce((p,c) => (c.name !== "tc_001" && p.push(c),p),[]);
        } else {
          cnt++;
        }
      }

      if(cnt % 2){
        //remove if the cnt is modulo 2
        //arr.filter(())
      } 
    }
    return a;
  }

  handleFormAnswersUpdate = (val, type) => {
    let inputState = val;
    let fieldType = type;
    if(this.state.formAnswers.inputState !== inputState){
      this.setState(prevState => ({
        formAnswers: [...prevState.formAnswers, {inputState, fieldType}]
      }))
    }
    
    // this.setState({
    //   ...this.state.formAnswers, 
    //   {inputState, fieldType}
    // })
  }

  // havePcrAcct

  // componentDidMount(){
  //   if(this.state.activeSection == 'introsection'){
  //       disableScroll();
  //   }
  // }

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
                  handleFormAnswersUpdate={this.handleFormAnswersUpdate}
                  selectedCheckboxes={this.state.selectedCheckboxes}
                  handleExtraInfoFormSubmit={this.handleExtraInfoFormSubmit} />
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
